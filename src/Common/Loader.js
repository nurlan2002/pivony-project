import React from "react";
import { connect } from "react-redux";
import "./Loader.css";

function Loader({ loading }) {

    return (
        <div className="loader-wrapper" style={{ display: !loading && "none" }}>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.appReducer.loading,
    };
};

export default connect(mapStateToProps, null)(Loader);
