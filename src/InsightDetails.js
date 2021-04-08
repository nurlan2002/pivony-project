import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { db, getTimeStamp } from './firebase';

function InsightDetails({userInsight, user, setUserInsight, setActiveTab}) {

    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const insight = useRef();
    const rating = useRef();

    useEffect(() => {
        setActiveTab("my-insight");
        if (!user) {
            history.push("/register");
        }
    }, [user]);

    const handleSubmitInsight = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(insight.current.value !== "") {
            const newIns = {
                text: insight.current.value,
                rating: rating.current.value,
                date: getTimeStamp()
            };
            await db.collection("insights").doc(user?.uid).update(newIns);
            setUserInsight({...newIns, id: user.uid});
            setLoading(false);
        }
    }

    const setTwoNumberDecimal = (event) => {
        event.target.value = parseFloat(event.target.value).toFixed(1);
    }

    const deleteInsight = async () => {
        setLoading(true);
        await db.collection("insights").doc(user?.uid).delete();
        setLoading(false);
        setUserInsight(null);
        setActiveTab("");
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
                        <button className="btn btn--pink" style={{marginRight: "2rem"}}>Update your insight</button>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(InsightDetails);
