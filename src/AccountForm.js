import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";

import { loginUser, signUpUser } from "./redux/User/user.actions";

function AccountForm({LoginUser, SignUpUser, user, setActiveTab}) {
    const history = useHistory();

    useEffect(() => {
        setActiveTab("register");
        if(user) {
            history.push("/account-details");
        }
    }, [user]);

    useEffect(() => {
        import("./AccountForm.css");
        const switchers = [...document.querySelectorAll(".switcher")];

        switchers.forEach((item) => {
            item.addEventListener("click", function () {
                switchers.forEach((item) =>
                    item.parentElement.classList.remove("is-active")
                );
                this.parentElement.classList.add("is-active");
            });
        });
    }, []);

    const createAccount = async (e) => {
        e.preventDefault();
        SignUpUser(e.target[1].value, e.target[2].value);
    };

    const loginUser = async (e) => {
        e.preventDefault();
        LoginUser(e.target[1].value, e.target[2].value);
    };

    return (
        <>
            <header className="header">
                <div>
                    <h1 className="header-primary">
                        Create or sign in to an account
                    </h1>
                </div>
            </header>
            <section className="forms-section">
                <div className="forms">
                    <div className="form-wrapper is-active">
                        <button
                            type="button"
                            className="switcher switcher-login"
                        >
                            Login
                            <span className="underline"></span>
                        </button>
                        <form
                            className="form form-login"
                            onSubmit={(e) => loginUser(e)}
                        >
                            <fieldset>
                                <legend>
                                    Please, enter your email and password for
                                    login.
                                </legend>
                                <div className="input-block">
                                    <label htmlFor="login-email">E-mail</label>
                                    <input
                                        id="login-email"
                                        type="email"
                                        required
                                        autoComplete="true"
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="login-password">
                                        Password
                                    </label>
                                    <input
                                        id="login-password"
                                        type="password"
                                        required
                                        autoComplete="true"
                                    />
                                </div>
                            </fieldset>
                            <button type="submit" className="btn btn--pink">
                                Login
                            </button>
                        </form>
                    </div>
                    <div className="form-wrapper">
                        <button
                            type="button"
                            className="switcher switcher-signup"
                        >
                            Sign Up
                            <span className="underline"></span>
                        </button>
                        <form
                            className="form form-signup"
                            onSubmit={(e) => createAccount(e)}
                        >
                            <fieldset>
                                <legend>
                                    Please, enter your email, password and
                                    password confirmation for sign up.
                                </legend>
                                <div className="input-block">
                                    <label htmlFor="signup-email">E-mail</label>
                                    <input
                                        id="signup-email"
                                        type="email"
                                        required
                                        autoComplete="true"
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-password">
                                        Password
                                    </label>
                                    <input
                                        id="signup-password"
                                        type="password"
                                        required
                                        autoComplete="true"
                                    />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-password-confirm">
                                        Confirm password
                                    </label>
                                    <input
                                        id="signup-password-confirm"
                                        type="password"
                                        required
                                        autoComplete="true"
                                    />
                                </div>
                            </fieldset>
                            <button type="submit" className="btn btn--purple">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </section>
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
        SignUpUser: (email, password) => dispatch(signUpUser(email, password)),
        LoginUser: (email, password) => dispatch(loginUser(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
