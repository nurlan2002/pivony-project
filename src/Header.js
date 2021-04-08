import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({userInsight}) {
    return (
        <header className="header">
            <div>
                <h1 className="header-primary">Insights</h1>
            </div>
            <div className="header-right">
                {
                    userInsight ? <Link to="/my-insight" className="btn btn--pink" >Edit your insight</Link> : <Link to="/account-details" className="btn btn--pink">Add your insight</Link>
                }
            </div>
        </header>
    );
}

export default Header;