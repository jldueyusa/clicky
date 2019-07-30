import React from "react";
import "./FriendCard.css";

function FriendCard(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img
          alt={props.name}
          src={props.image}
          onClick={() => props.handleClick(props.id)}
          className="click"
        />
      </div>
    </div>
  );
}

export default FriendCard;