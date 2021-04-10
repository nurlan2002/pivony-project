import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import "./AccountDetail.css";
import { db } from "./firebase";
import PhotoUploadWidget from "./PhotoUploadWidget";
import { setLoading, setTab } from "./redux/App/app.actions";
import { setUserInsight } from "./redux/Insight/insight.actions";

function AccountDetail({ user, SetLoading, SetTab }) {
    const history = useHistory();
    
    const [files, setFiles] = useState([]);

    const fullName = useRef();

    useEffect(() => {
        SetTab("account-details");
        if (!user) {
            history.push("/register");
        }
    }, [user]);

    const handleSubmitProfile = async (e) => {
        e.preventDefault();
        SetLoading(true);
        const newDisplayName = fullName.current.value;

        if(user.displayName !== newDisplayName) {
            await user.updateProfile({displayName: newDisplayName});
            const doc = await db.collection("insights").doc(user?.uid).get();

            if(doc.exists) {
                await db.collection("insights").doc(user?.uid).update({ name: newDisplayName});
            }            
            SetLoading(false);
        }
    }

    return (
        <>
            <h1 className="header-primary">Welcome {user?.displayName}!</h1>
            <form className="my-form" onSubmit={e => handleSubmitProfile(e)}>
                <ul>
                    <li>
                        <input type="text" placeholder="Full name" required ref={fullName} defaultValue={user?.displayName} maxLength="40"/>
                    </li>
                    <li>
                        <PhotoUploadWidget files={files} setFiles={setFiles} />
                    </li>
                    <li>
                        <button className="btn btn--pink">Save</button>
                    </li>
                </ul>
            </form>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        SetLoading: (l) => dispatch(setLoading(l)),
        SetTab: (tab) => dispatch(setTab(tab))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
