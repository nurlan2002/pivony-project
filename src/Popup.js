import React from "react";
import { connect } from "react-redux";
import { db } from "./firebase";
import { setLoading } from "./redux/App/app.actions";
import firebase from "firebase";
import "./Popup.css";
import { setSelectedInsight } from "./redux/Insight/insight.actions";

function Popup({ selectedInsight : insight, user, SetLoading, SetSelectedInsight }) {

    const formatDate = () => {
        if (insight) {
            const dateStr = insight?.date.toDate().toDateString();
            const dateSplit = dateStr.split(" ");
            return dateSplit[1] + " " + dateSplit[2] + ", " + dateSplit[3];
        }
        return "";
    };

    const newInsight = async () => {
        const newIns = await db.collection("insights").doc(insight.id).get();
        SetSelectedInsight({...newIns.data(), id: newIns.id});
    }

    const noButton = async () => {
        SetLoading(true);
        await db.collection("insights").doc(insight.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
            dislikes: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
        newInsight();        
    }

    const yesButton = async () => {
        SetLoading(true);
        await db.collection("insights").doc(insight.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
            dislikes: firebase.firestore.FieldValue.arrayRemove(user.uid)
        });
        newInsight();         
    }

    const resetButton = async () => {
        SetLoading(true);
        await db.collection("insights").doc(insight.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
            dislikes: firebase.firestore.FieldValue.arrayRemove(user.uid)
        });
        newInsight();
    }

    return (
        <div className="popup" id="popup">
            <div className="popup__content">
                <div className="popup__left">
                    <img
                        src={insight?.photo}
                        alt="User"
                        className="popup__img"
                    />
                    <div className="popup__user-box">
                        <p className="popup__user-name">{insight?.name}</p>
                        <p className="popup__user-date">{formatDate()}</p>
                    </div>
                </div>
                <div className="popup__right">
                    <a href="/#insights" className="popup__close">
                        ×
                    </a>
                    <div className="popup__rating">
                        {
                            <span className="score">
                                <div className="score-wrap">
                                    <span
                                        className="stars-active"
                                        style={{width: `${insight?.rating / 5 * 100}%` }}
                                    >
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                    </span>
                                    <span className="stars-inactive">
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </span>                                
                        }
                    </div>
                    {
                        insight?.likes.length > 0 ? <h3 className="heading-tertiary u-margin-bottom-small">
                            {insight?.likes.length > 1 ? `${insight?.likes.length} people` : `${insight?.likes.length} person`} found this helpful
                        </h3> : <span>&nbsp;</span>
                    }
                    <p className="popup__text">{insight?.text}</p>
                    {
                        user && insight?.id !== user.uid && 
                        <>
                            <p className="popup__yesnotext">Was this insight helpful?</p>
                            <button className="btn btn--purple btn--mini" disabled={insight?.likes.includes(user?.uid)} onClick={yesButton}>
                            <i className="fa fa-thumbs-up"></i>
                            </button>
                            <button className="btn btn--purple btn--mini" disabled={insight?.dislikes.includes(user?.uid)} onClick={noButton}>
                            <i className="fa fa-thumbs-down"></i>
                            </button>
                            {
                                (insight?.likes.includes(user?.uid) || insight?.dislikes.includes(user?.uid)) && 
                                <button className="btn btn--purple btn--mini btn--inverted" onClick={resetButton}>
                                    Reset
                                </button>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        loading: state.appReducer.loading,
        selectedInsight: state.insightReducer.selectedInsight
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        SetLoading: (l) => dispatch(setLoading(l)),
        SetSelectedInsight: (ins) => dispatch(setSelectedInsight(ins))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);

