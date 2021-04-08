import React from "react";
import "./Popup.css";

function Popup({ insight }) {
    const formatDate = () => {
        if (insight) {
            const dateStr = insight?.date.toDate().toDateString();
            const dateSplit = dateStr.split(" ");
            return dateSplit[1] + " " + dateSplit[2] + ", " + dateSplit[3];
        }
        return "";
    };

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
                        insight?.likes > 0 ? <h3 className="heading-tertiary u-margin-bottom-small">
                            {insight?.likes > 1 ? `${insight?.likes} people` : `${insight?.likes} person`} found this helpful
                        </h3> : <span>&nbsp;</span>
                    }
                    <p className="popup__text">{insight?.text}</p>
                    <p className="popup__yesnotext">Was this insight helpful?</p>
                    <button className="btn btn--purple btn--mini">
                        Yes
                    </button>
                    <button className="btn btn--purple btn--mini btn--inverted">
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
