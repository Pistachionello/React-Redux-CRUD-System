import React from "react";

export default function PurchaseCar({car}) {
    const {name, brand, mileage} = car;
    return (
        <div>
            <div>
                Car name: {name}
            </div>
            <div>
                Car brand: {brand}
            </div>
            <div>
                Car mileage: {mileage}
            </div>
        </div>
    );
}