import React, { useEffect, useState } from "react";
import "./CardGrid.css";
import SmallCard from "./SmallCard";
import { db } from "./firebase";
import { connect } from "react-redux";
import { setLoading, setTab } from "./redux/App/app.actions";
import Popup from "./Popup";

function CardGrid({ userInsight, SetLoading, SetTab }) {
    const [insights, setInsights] = useState([]);

    useEffect(() => {
        SetTab("");
        SetLoading(true);

        db.collection("insights")
            .orderBy("date", "desc")
            .onSnapshot((allDocs) => {
                const ins = allDocs.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });

                setInsights(ins);
                setTimeout(() => {
                    SetLoading(false);
                }, 400);
            });
    }, []);

    return (
        <>
            <Popup />
            <div className="grid">
                {insights.map((ins) => {
                    return (
                        <SmallCard
                            key={ins.id}
                            insight={ins}
                            mine={userInsight?.id === ins.id}
                        />
                    );
                })}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        userInsight: state.insightReducer.userInsight
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        SetLoading: (l) => dispatch(setLoading(l)),
        SetTab: (tab) => dispatch(setTab(tab)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardGrid);
