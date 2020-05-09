import React from "react";

const Card = props => {
  return (
    <div className="card-container">
      <h4>{props.title}</h4>
      <h1>{props.count}</h1>
    </div>
  );
};

export default Card;
