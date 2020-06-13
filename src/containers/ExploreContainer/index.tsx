import React from 'react';
import './style.css';
import IContainerProps from '../../interfaces/IContainerProps';

const ExploreContainer: React.FC<IContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
