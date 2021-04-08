import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { logoutUser } from "./redux/User/user.actions";
import "./Sidebar.css";

function Sidebar({activeTab, setActiveTab, user, LogoutUser, userInsight}) {
    const history = useHistory();

    return (
        <nav className="menu" tabIndex="0">
            <div className="smartphone-menu-trigger"></div>
            <div className="logo_wrapper">
                <img
                    className="logo"
                    src="/assets/pivony_logo.png"
                    alt="pivony logo"
                />
            </div>

            <ul className="side-nav">
                <li 
                    className={"side-nav__item " + (activeTab === "" ? "side-nav__item--active" : "")} 
                    onClick={() => {setActiveTab(""); history.push("/")}}>
                    <a href="#" className="side-nav__link">
                        <span>Insights</span>
                    </a>
                </li>
                {
                    user 
                        ?   <>
                                <li 
                                    className={"side-nav__item " + (activeTab === "account-details" ? "side-nav__item--active" : "")} 
                                    onClick={() => {setActiveTab("account-details"); history.push("/account-details")}}>
                                    <a href="#" className="side-nav__link">
                                        <span>Account</span>
                                    </a>
                                </li>
                                {
                                    userInsight && <li 
                                                        className={"side-nav__item " + (activeTab === "my-insight" ? "side-nav__item--active" : "")} 
                                                        onClick={() => {setActiveTab("my-insight"); history.push("/my-insight")}}>
                                                        <a href="#" className="side-nav__link">
                                                            <span>My insight</span>
                                                        </a>
                                                    </li>
                                }
                                <li 
                                    className={"side-nav__item"} 
                                    onClick={() => {setActiveTab(""); history.push("/"); LogoutUser()}}>
                                    <a href="#" className="side-nav__link">
                                        <span>Log Out</span>
                                    </a>
                                </li> 
                            </>
                        :   <li 
                                className={"side-nav__item " + (activeTab === "register" ? "side-nav__item--active" : "")} 
                                onClick={() => {setActiveTab("register"); history.push("/register")}}>
                                <a href="#" className="side-nav__link">
                                    <span>Log In / Sign Up</span>
                                </a>
                            </li>
                }
            </ul>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        LogoutUser: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

