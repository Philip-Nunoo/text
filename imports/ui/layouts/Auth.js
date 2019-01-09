import React from 'react';

export default ({children, ...rest}) => (
    <div className="page page-login">
        <div className="main">{children}</div>
    </div>
);