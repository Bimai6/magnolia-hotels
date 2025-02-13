import React from "react";
import "./ButtonRestaurant.css";

const ButtonRestaurant = ({title, action}) => {
    return (
        <body>
            <div id="pageButtons">
             <button type="button" className="btn btn-primary btn-lg magnolia-restaurant" onClick={action}>{title}</button>
            </div>
        </body>
    );
  };
  
  export default ButtonRestaurant;
  