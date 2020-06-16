import React from 'react';
import { useParams } from 'react-router';

const Details: React.FC = () => {
    let {  id } = useParams<{ id: string }>();
    console.log(id);
    
  return (
    <div>
        details
    </div>
  );
};

export default Details;
