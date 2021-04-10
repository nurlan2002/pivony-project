import CardGrid from "./Insights/Showcase/CardGrid";
import ContentWrapper from "./Common/ContentWrapper";
import Header from "./Insights/Showcase/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import React, { Suspense, useEffect } from "react";
import { auth, db } from "./firebase";
import { connect } from "react-redux";
import { setUser } from "./redux/User/user.actions";
import Loader from "./Common/Loader";
import { setUserInsight } from "./redux/Insight/insight.actions";

import "./App.css";
import "./Account/Details/AccountDetail.css";
import Sidebar from "./Common/Sidebar";

const AccountForm = React.lazy(() => import("./Account/AccountForm"));
const AccountDetail = React.lazy(() => import("./Account/Details/AccountDetail"));
const InsightDetails = React.lazy(() => import("./Insights/Handler/InsightDetails"));
const CreateInsight = React.lazy(() => import("./Insights/Handler/CreateInsight"));

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
