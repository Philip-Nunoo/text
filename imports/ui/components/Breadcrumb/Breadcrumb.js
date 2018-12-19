import React from 'react';

const Breadcrumb = ({ title, toolbar }) => {
    return (
        <div className="app-breadcrumb">
            <div className="content_main">
                {title && <h3 className="head-title">{title}</h3>}
            </div>
            <div className="toolbar">
                {toolbar}
            </div>
        </div>
  )
}

export default Breadcrumb;
