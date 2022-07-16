import React from 'react';
import { Helmet } from 'react-helmet';

const SetTitle = ({ children }) => {
    return (
        <Helmet>
            <title>
                Take Tools :: {children}
            </title>
        </Helmet>
    );
};

export default SetTitle;