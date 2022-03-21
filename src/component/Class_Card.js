import React from "react";
import { Link } from "react-router-dom"

const Class_Card = ({ data, id }) => {
  let path = `/class/${id}`
  return (
    <Link to={path}>
    <div className="class-card m-auto" >
      <div className="card-head">
        <div className="class-name">{data.class_name}</div>
        <div className="class-creator">{data.creator}</div>
      </div>
      <div className="card-profile">
        <img src={data.creatorPhoto} alt="" />
      </div>
      <div className="card-body"></div>
    </div>
    </Link>
  );
};

export default Class_Card;
