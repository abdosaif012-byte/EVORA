import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/men.css"

export function Men() {
  return (
    <div className="men-page">
      <div className="men-section">
        <div className="men-Hero">
          <div className="men-Content">
            <h1 id="men-h1">COMMAND THE ROOM</h1>
            <p>Tailored for the modern man.</p>
                <button className="men-Collection">
                    Explore Collection
                </button>
          </div>
        </div>
      </div>
    </div>
  )
}