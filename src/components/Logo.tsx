import React from 'react';

// Assets
import assets from '../config/assets';

export const Logo: React.FC<{ height: string }> = ({ height }) => {
    return (
        <div className="logo-wrapper" style={{ height }}>
            <img src={assets.kindOfTransport} className="logo-img" alt="logo" />

            <div className="logo-text-wrapper">
                <h1 className="logo-text">InterCity Journey</h1>
            </div>
        </div>
    );
};
