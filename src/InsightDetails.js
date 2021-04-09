import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { db, getTimeStamp } from './firebase';
import { setLoading, setTab } from './redux/App/app.actions';
import { setUserInsight } from './redux/Insight/insight.actions';

function InsightDetails({userInsight, user, SetUserInsight, SetTab, SetLoading}) {

    const history = useHistory();

    const insight = useRef();
    const rating = useRef();

    useEffect(() => {
        SetTab("my-insight");
        if (!user) {
            history.push("/register");
        }
        console.log(userInsight);
        if (!userInsight) {
            history.push("/account-details");
        }
    }, [user]);

    const handleSubmitInsight = async (e) => {
        e.preventDefault();
        SetLoading(true);

        if(insight.current.value !== "") {
            const newIns = {
                text: insight.current.value,
                rating: rating.current.value,
                date: getTimeStamp()
            };
            await db.collection("insights").doc(user?.uid).update(newIns);
            SetUserInsight({...newIns, id: user.uid});
            SetLoading(false);
        }
    }

    const setTwoNumberDecimal = (event) => {
        event.target.value = parseFloat(event.target.value).toFixed(1);
    }

    const deleteInsight = async () => {
        SetLoading(true);
        await db.collection("insights").doc(user?.uid).delete();
        SetLoading(false);
        SetUserInsight(null);
        history.push("/");
    }

    return (
        <>
            <h1 className="header-primary">Edit your insight</h1>
            <form className="my-form" onSubmit={e => handleSubmitInsight(e)}>
                <ul>
                    <li>
                        <h4 style={{marginBottom: "1.5rem"}}>Rating</h4>
                        <input type="number" onChange={e=> setTwoNumberDecimal(e)} min="0" max="10" step="0.1" defaultValue={userInsight?.rating} ref={rating} />
                    </li>
                    <li>
                        <textarea placeholder="Your Insight" defaultValue={userInsight?.text} ref={insight} required></textarea>
                    </li>
                    <li>
                        <button type="submit" className="btn btn--pink" style={{marginRight: "2rem", marginBottom: "2rem"}}>Update your insight</button>
                        <button className="btn btn--purple" onClick={deleteInsight}>Delete your insight</button>
                    </li>
                </ul>
            </form>
        </>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(InsightDetails);
