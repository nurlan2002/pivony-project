import React from 'react';
import "./ContentWrapper.css";

function ContentWrapper(props) {
    return (
        <div className="content">
            {props.children}
        </div>
    )
}

export default ContentWrapper
