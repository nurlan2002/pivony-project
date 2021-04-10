import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { db, getTimeStamp } from "./firebase";
import { setLoading, setTab } from "./redux/App/app.actions";
import { setUserInsight } from "./redux/Insight/insight.actions";

function CreateInsight({user, userInsight, SetUserInsight, SetTab, SetLoading}) {

    const history = useHistory();
    const insight = useRef();
    const rating = useRef();

    useEffect(() => {
        SetTab("create-insight");
        if(userInsight) {
            history.push("my-insight");
        }
    }, []);

    const handleSubmitInsight = async (e) => {
        e.preventDefault();
        SetLoading(true);
        if(insight.current.value !== "") {
            const ins = {
                text: insight.current.value,
                rating: rating.current.value,
                date:  getTimeStamp(),
                photo: user.photoURL,
                name: user.displayName,
                likes: [],
                dislikes: []
            };
            await db.collection("insights").doc(user?.uid).set(ins);
            SetUserInsight({...ins, id: user?.uid});
            history.push("/my-insight");
            SetLoading(false);
        }
    }

    const setTwoNumberDecimal = (event) => {
        event.target.value = parseFloat(event.target.value).toFixed(1);
    }

    return (
        <>
            <h1 className="header-primary">Create your insight</h1>
            <form className="my-form" onSubmit={(e) => handleSubmitInsight(e)}>
                <ul>
                    <li>
                        <h4 style={{ marginBottom: "1.5rem" }}>Rating</h4>
                        <input
                            type="number"
                            onChange={(e) => setTwoNumberDecimal(e)}
                            min="0"
                            max="5"
                            step="0.1"
                            defaultValue="5.0"
                            ref={rating}
                        />
                    </li>
                    <li>
                        <textarea
                            placeholder="Your Insight"
                            ref={insight}
                            required
                            minLength="5"
                        ></textarea>
                    </li>
                    <li>
                        <button className="btn btn--pink">
                            Share your insight
                        </button>
                    </li>
                </ul>
            </form>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        userInsight: state.insightReducer.userInsight
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        SetLoading: (l) => dispatch(setLoading(l)),
        SetTab: (tab) => dispatch(setTab(tab)),
        SetUserInsight: (ins) => dispatch((setUserInsight(ins)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateInsight);
