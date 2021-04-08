import "./App.css";
import CardGrid from "./CardGrid";
import ContentWrapper from "./ContentWrapper";
import Header from "./Header";
import Popup from "./Popup";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountForm from "./AccountForm";
import { auth, db } from "./firebase";
import { connect } from "react-redux";
import { setUser } from "./redux/User/user.actions";
import AccountDetail from "./AccountDetail";
import InsightDetails from "./InsightDetails";

function App({ SetUser }) {
    const [selectedInsight, setSelectedInsight] = useState(null);
    const [activeTab, setActiveTab] = useState("");

    const [userInsight, setUserInsight] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                SetUser(authUser);
                db.collection("insights").doc(authUser.uid).get().then((doc) => {
                    setUserInsight({...doc.data(), id: doc.id});
                })
            } else {
                setUserInsight(null);
            }
        });
    }, []);

    return (
        <Router>
            <div className="App">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userInsight={userInsight}/>
                <main>
                    <ContentWrapper>
                        <Switch>
                            <Route path="/my-insight">
                                <InsightDetails userInsight={userInsight} setUserInsight={setUserInsight} setActiveTab={setActiveTab}/>
                            </Route>
                            <Route path="/account-details">
                                <AccountDetail setActiveTab={setActiveTab} userInsight={userInsight} setUserInsight={setUserInsight}/>
                            </Route>
                            <Route path="/register">
                                <AccountForm setActiveTab={setActiveTab} />
                            </Route>
                            <Route path="/">
                                <Popup insight={selectedInsight} />
                                <Header userInsight={userInsight} />
                                <CardGrid setInsight={setSelectedInsight} userInsight={userInsight}/>
                            </Route>
                        </Switch>
                    </ContentWrapper>
                </main>
            </div>
        </Router>
    );
}

// const mapStateToProps = (state) => { };

const mapDispatchToProps = (dispatch) => {
    return {
        SetUser: (user) => dispatch(setUser(user)),
    };
};

export default connect(null, mapDispatchToProps)(App);
