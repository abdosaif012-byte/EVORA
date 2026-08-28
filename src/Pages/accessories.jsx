import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/accessories.css"

export function Accessories() {
  return (
    <div className="accessories-page">
      <div className="accessories-section">
        <div className="accessories-Hero">
          <div className="accessories-Content">
            <h1 id="accessories-h1">Where Style Begins</h1>
            <br />
            <p>Refined accessories crafted to complement every expression.</p>
            <br />
                <button className="accessories-Collection">
                    Explore Collection
                </button>
          </div>
        </div>
      </div>
    </div>
  )
}