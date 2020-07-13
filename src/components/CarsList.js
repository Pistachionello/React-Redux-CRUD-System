import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {deleteAllCars} from "../redux/actions";
import Car from "./Car";
import {CarForm} from "./CarForm";

export function CarsList() {
    const dispatch = useDispatch();
    const cars = useSelector(state => state.cars);
    const [inCreate, setInCreate] = useState(false);

    return (
        <div className={"cars_list mt-3"}>
            <div className="cars_nav_bar d-flex">
                <button className="btn btn-outline-primary" onClick={() => setInCreate(!inCreate)}>
                    Add car to list
                </button>
                <button className="btn btn-outline-danger ml-auto" onClick={() => dispatch(deleteAllCars())}>
                    Delete all cars
                </button>
            </div>
            {inCreate && <CarForm/>}
            <div className="cars_list_container">
                {cars.length ? cars.map((car, id) => {
                    return (
                        <Car key={car + id} car={car}/>
                    )
                }) : (
                    <div>
                        There is no cars. Create some mb? :)
                    </div>
                )}
            </div>
        </div>
    );
}