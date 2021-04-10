import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ userInsight }) {
    return (
        <header className="header">
            <div>
                <h1 className="header-primary">Insights</h1>
            </div>
            <div className="header-right">
                {userInsight ? (
                    <Link
                        to="/my-insight"
                        className="btn btn--pink btn--header"
                    >
                        Edit your insight
                    </Link>
                ) : (
                    <Link to="/create-insight" className="btn btn--pink">
                        Add your insight
                    </Link>
                )}
            </div>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        userInsight: state.insightReducer.userInsight,
    };
};

export default connect(mapStateToProps, null)(Header);
