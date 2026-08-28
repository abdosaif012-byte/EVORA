import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/women.css"

export function Women() {
  return (
    <div className="women-page">
      <div className="women-section">
        <div className="women-Hero">
          <div className="women-Content">
            <h1 id="women-h1">Made for Her</h1>
            <p>A collection of graceful silhouettes crafted with effortless elegance.</p>
                <button className="women-Collection">
                    Explore Collection
                </button>
          </div>
        </div>
      </div>
    </div>
  )
}