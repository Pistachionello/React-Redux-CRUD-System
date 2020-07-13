import React from "react";

export default function Car(props) {
    const {name, brand, mileage} = props.car;

    return (
        <div className="car_container">
            <p>{name}</p>
            <p>{brand}</p>
            <p>{mileage}</p>
        </div>
    );
}