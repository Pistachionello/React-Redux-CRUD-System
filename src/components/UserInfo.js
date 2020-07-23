import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCarAndOwner, removeCarAndOwner} from "../redux/actions";
import {userBinder} from "../Objects/User";
import UserEditingForm from "./UserEditingForm";
import PurchaseCar from "./PurchaseCar";

export default function UserInfo({user, id, handleUserEdit}) {
    const dispatch = useDispatch();

    const {ownedCarsIds} = user;
    const [inEdit, setInEdit] = useState(false);
    const [inBuyingCars, setBuyingCars] = useState(false);
    const cars = useSelector(state => state.cars);
    const buyAvailableCars = cars.filter((car) => {
        return typeof car.userOwnerId === "undefined";
    })
    const ownedCars = cars.filter((car) => {
        return ownedCarsIds.includes(car.idNumber);
    })

    function handleEditCancel() {
        setInEdit(false);
    }

    function handleBuyCar(carId) {
        dispatch(addCarAndOwner(id, carId));
    }

    function handleSellCar(carId) {
        dispatch(removeCarAndOwner(id, carId));
    }

    return (
        <div className="user_info_container p-2">
            {!inEdit ?
                <>
                    <div className="user_info d-flex">
                        {Object.keys(user).map((key, i) => {
                            if (!userBinder.inputFields[key]) {
                                return null;
                            }
                            return (
                                <div className="user_info_container mb-2 col-4" key={key + i}>
                                    <div className="label_container">
                                        {userBinder.inputFields[key]["label"]}
                                    </div>
                                    <div className="value_container mt-2">
                                        {user[key]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="user_info_buttons_container d-flex justify-content-end">
                        <button className="btn btn-outline-primary mr-3" onClick={() => setInEdit(true)}>
                            Edit user
                        </button>
                    </div>
                </> :
                <UserEditingForm user={user} id={id} onEditCancel={handleEditCancel}
                                 onEditConfirm={handleUserEdit}/>
            }
            {!inEdit ?
                <div className={"user_cars_info col-12"}>
                    <div className="cars_container">
                        <ul className="list-group">
                            Owned cars:
                            {ownedCars.length ? ownedCars.map((car, id) => {
                                    return (
                                        <li className="list-group-item" key={car + id}>
                                            <div>
                                                Car name:
                                                <div>
                                                    {car.name}
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                Car brand:
                                                <div>
                                                    {car.brand}
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                Car id number:
                                                <div>
                                                    {car.idNumber}
                                                </div>
                                            </div>
                                            <button className="btn btn-outline-primary mt-1"
                                                    onClick={() => handleSellCar(car.idNumber)}
                                            >
                                                Sell car
                                            </button>
                                        </li>
                                    );
                                }) :
                                <> This user hasn't a car.</>
                            }
                        </ul>
                    </div>
                    <div className="user_car_buttons d-flex">
                        {!inBuyingCars ?
                            <button className="btn btn-outline-success m-2" onClick={() => setBuyingCars(true)}>
                                Buy car
                            </button>
                            :
                            <div className="col-12 w-100">
                                <ul className="buying_cars_list mt-3 list-group">
                                    {buyAvailableCars.length ? buyAvailableCars.map((car, id) => {
                                        return (
                                            <li className="list-group-item car_item" key={car + id}>
                                                <PurchaseCar car={car}/>
                                                <button className="btn btn btn-outline-success mt-2"
                                                        onClick={() => handleBuyCar(car.idNumber)}>
                                                    Buy car
                                                </button>
                                            </li>
                                        )
                                    }) : (
                                        <li className="list-group-item">
                                            There is no cars or they are all bought. Create some mb? :)
                                        </li>
                                    )}
                                </ul>
                                <button className="btn btn-outline-danger m-2"
                                        onClick={() => setBuyingCars(false)}>Leave
                                </button>
                            </div>
                        }
                    </div>
                </div> : null
            }
        </div>
    );
}