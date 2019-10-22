import React from "react";
import "./Card.css";


const Card = ({ id, name, image, handlePicked }) => (
    // <div className={`mdc-layout-grid__cell--span-3--order-${Number(id)}`}>
    <div>
        <div
            className="card"
            key={id}
            data-id={id}
            name={name}
            style={{ backgroundImage: `url(${image})` }}
            onClick={handlePicked}
        >
        </div>
    </div>
)

export default Card;