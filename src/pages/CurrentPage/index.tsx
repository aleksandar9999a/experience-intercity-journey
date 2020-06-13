import React from 'react';
import route_config from '../../config/route_config';

const CurrentPage: React.FC<{ name: string }> = ({ name }) => {
    const Component = route_config[name];
    return <Component />
}

export default CurrentPage;