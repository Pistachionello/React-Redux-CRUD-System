import React, {useState} from "react";
import {useSelector} from "react-redux";
import CarEditingForm from "./CarEditingForm";
import {carBinder} from "../Objects/Car";

export default function CarInfo({car, handleCarEdit}) {
    const {userOwnerId} = car;
    const [inEdit, setInEdit] = useState(false);
    const userOwner = useSelector(state => state.users).find((user, id) => (id === userOwnerId))

    function handleEditCancel() {
        setInEdit(false);
    }

    return (
        <div className="car_info_container p-2">
            {!inEdit ?
                <>
                    <div className="car_container position-relative">
                        <div className="car_info d-flex">
                            {Object.keys(car).map((key, i) => {
                                if (!carBinder.inputFields[key]) {
                                    return null;
                                }
                                return (
                                    <div className="car_info_container mb-2 col-4" key={key + i}>
                                        <div className="label_container">
                                            {carBinder.inputFields[key]["label"]}
                                        </div>
                                        <div className="value_container mt-2">
                                            {car[key]}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="car_info_buttons_container d-flex justify-content-end">
                            <button className="btn btn-outline-primary mr-3" onClick={() => setInEdit(true)}>
                                Edit car
                            </button>
                        </div>
                        <div className="car_owner col-12">
                            {userOwner ?
                                <div>Owner: {userOwner.name} {userOwner.surname}</div>
                                :
                                <div>This car has no owner</div>
                            }
                            Car idNumber: {car.idNumber}
                        </div>
                    </div>
                </> : <CarEditingForm car={car} onEditCancel={handleEditCancel} onEditConfirm={handleCarEdit}/>
            }
        </div>
    );
}