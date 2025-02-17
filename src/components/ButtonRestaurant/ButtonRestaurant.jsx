import React from "react";
import "./ButtonRestaurant.css";

const ButtonRestaurant = ({title, action}) => {
    return (
             <button type="button" className="btn btn-primary btn-lg magnolia-restaurant" onClick={action}>{title}</button>
    );
  };
  
  export default ButtonRestaurant;
  