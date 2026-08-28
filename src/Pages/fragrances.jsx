import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/fragrances.css"

export function Fragrances() {
  return (
    <div className="fragrances-page">
      <div className="fragrances-section">
        <div className="fragrances-Hero">
          <div className="fragrances-Content">
            <h1 id="fragrances-h1">LEAVE YOUR TRACE</h1>
            <p>Unforgettable fragrances for unforgettable moments.</p>
                <button className="fragrances-Collection">
                    Explore Collection
                </button>
          </div>
        </div>
      </div>
    </div>
  )
}