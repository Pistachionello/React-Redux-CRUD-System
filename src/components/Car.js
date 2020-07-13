import React from "react";

export default function Car(props) {
    const {name, brand, mileage} = props.car;

    return (
        <div className="car_container border-secondary border-bottom">
            <p>{name}</p>
            <p>{brand}</p>
            <p>{mileage}</p>
        </div>
    );
}