import React from 'react';
import { useState } from "react";
import "./RestaurantMenu.css";

const RestaurantMenu = ({ closeMenu }) => {
  const [page, setPage] = useState(1);

  return (
    <div className="overlay">
      <button className="closeMenu" onClick={closeMenu}>
        ✖
      </button>

      <div className="menu">
        <div className="content">
          {pagina === 1 ? (
            <>
              <div className="column left-column">
        
              </div>
              <div className="column right-column">
                
              </div>
            </>
          ) : (
            <>
              <div className="column left-column">
                
              </div>
              <div className="column right-column">
                
              </div>
            </>
          )}
        </div>

        <button
          className="page-change"
          onClick={() => setPage(page === 1 ? 2 : 1)}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenu;
