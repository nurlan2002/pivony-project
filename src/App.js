import "./App.css";
import CardGrid from "./CardGrid";
import ContentWrapper from "./ContentWrapper";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import React, { Suspense, useEffect } from "react";
import { auth, db } from "./firebase";
import { connect } from "react-redux";
import { setUser } from "./redux/User/user.actions";
import Loader from "./Loader";
import { setUserInsight } from "./redux/Insight/insight.actions";

const AccountForm = React.lazy(() => import("./AccountForm"));
const AccountDetail = React.lazy(() => import("./AccountDetail"));
const InsightDetails = React.lazy(() => import("./InsightDetails"));
const CreateInsight = React.lazy(() => import("./CreateInsight"));

function App({ SetUser, SetUserInsight }) {

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                SetUser(authUser);
                db.collection("insights").doc(authUser.uid).get().then((doc) => {
                    if(doc.exists) {
                        SetUserInsight({...doc.data(), id: doc.id});
                    } else {
                        SetUserInsight(null);
                    }                    
                })
            } else {
                SetUserInsight(null);
            }
        });
    }, []);

    return (
        <Router>
            <div className="App">
                <Loader />
                <Sidebar />
                <main>
                    <ContentWrapper>
                        <Switch>
                            <Suspense fallback={<Loader />}>
                                <Route path="/create-insight">
                                    <CreateInsight />
                                </Route>
                                <Route path="/my-insight">
                                    <InsightDetails />
                                </Route>
                                <Route path="/account-details">
                                    <AccountDetail />
                                </Route>
                                <Route path="/register">
                                    <AccountForm />
                                </Route>
                                <Route exact path="/">
                                    <Header />
                                    <CardGrid />
                                </Route>
                            </Suspense>
                        </Switch>
                    </ContentWrapper>
                </main>
            </div>
        </Router>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        SetUser: (user) => dispatch(setUser(user)),
        SetUserInsight: (ins) => dispatch((setUserInsight(ins)))
    };
};

export default connect(null, mapDispatchToProps)(App);
