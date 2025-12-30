import React from 'react';

const Card = ({ title, Icon, quantity, className }) => {
  return (
    <div className={`p-4 rounded-lg flex items-center ${className}`}>
        <div className="mr-3">
            <Icon className="text-2xl" />
        </div>
        <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm">{quantity}</p>
        </div>
    </div>
  );
};

export default Card;
