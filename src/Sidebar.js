import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "./redux/User/user.actions";
import "./Sidebar.css";

function Sidebar({tab, user, LogoutUser, userInsight}) {

    return (
        <nav className="menu" tabIndex="0">
            <div className="smartphone-menu-trigger"></div>
            <Link to="/">
                <div className="logo_wrapper">
                    <img
                        className="logo"
                        src="/assets/pivony_logo.png"
                        alt="pivony logo"
                    />
                </div>
            </Link>            

            <ul className="side-nav">
                <li className={"side-nav__item " + (tab === "" ? "side-nav__item--active" : "")}>
                    <Link to="/" className="side-nav__link">
                        <span>Insights</span>
                    </Link>
                </li>
                {
                    user 
                    ?   <>
                            <li className={"side-nav__item " + (tab === "account-details" ? "side-nav__item--active" : "")} >
                                <Link to="/account-details" className="side-nav__link">
                                    <span>Account</span>
                                </Link>
                            </li>
                            {
                                userInsight ?
                                <li className={"side-nav__item " + (tab === "my-insight" ? "side-nav__item--active" : "")} >
                                    <Link to="/my-insight" className="side-nav__link">
                                        <span>My insight</span>
                                    </Link>
                                </li> :
                                <li className={"side-nav__item " + (tab === "create-insight" ? "side-nav__item--active" : "")} >
                                    <Link to="/create-insight" className="side-nav__link">
                                        <span>Create insight</span>
                                    </Link>
                                </li>
                            }
                            <li className="side-nav__item" onClick={LogoutUser}>
                                <Link to="/" className="side-nav__link">
                                    <span>Log out</span>
                                </Link>
                            </li> 
                        </>
                    :   <li className={"side-nav__item " + (tab === "register" ? "side-nav__item--active" : "")} >
                            <Link to="/register" className="side-nav__link">
                                <span>Log In / Sign Up</span>
                            </Link>
                        </li>
                }
            </ul>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        tab: state.appReducer.tab,
        userInsight: state.insightReducer.userInsight
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        LogoutUser: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

