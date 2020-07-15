import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeUserById, addCarAndOwner} from "../redux/actions";
import UserEditingForm from "./UserEditingForm";
import Car from "./Car";

export default function User(props) {
    const dispatch = useDispatch();
    const {name, surname, age, ownedCars} = props.user;
    const [mouseInElement, setMouseInElement] = useState(false);
    const [inEdit, setInEdit] = useState(false);
    const [inBuyingCars, setBuyingCars] = useState(false);
    const cars = useSelector(state => state.cars);
    const availableCars = cars.filter((car) => !car.owner)

    function handleButtonsDisplay() {
        return mouseInElement ? "visible" : "invisible";
    }

    function handleDelete() {
        dispatch(removeUserById(props.id));
    }

    function handleEditCancel() {
        setInEdit(false);
    }
    
    function handleBuyCar(car) {
        dispatch(addCarAndOwner(props.user, car, props.id));
    }

    return (!inEdit ?
            <div className="user_container border-secondary border-bottom position-relative mb-2"
                 onMouseEnter={() => setMouseInElement(true)}
                 onMouseLeave={() => setMouseInElement(false)}
            >
                <div className="user_info">
                    <p>Name: {name}</p>
                    <p>Surname: {surname}</p>
                    <p>Age: {age}</p>
                    <div className={"user_cars_info"}>
                        Owned cars:
                        <div className="cars_container ml-5">
                            {ownedCars.length ? ownedCars.map((car, id) => {
                                return (
                                    <div key={car + id}>
                                        {car.name}
                                    </div>
                                );
                            }) :
                                <div>There is no cars. If you can, buy some.</div>
                            }
                        </div>
                        <div className="user_car_buttons d-flex">
                            {!inBuyingCars ?
                                <button className="btn btn-outline-success m-2" onClick={() => setBuyingCars(true)}>Buy car</button>
                                :
                                <div>
                                    <div className="buying_cars_list border p-3 mt-3">
                                        {availableCars.length ? availableCars.map((car, id) => {
                                            return (
                                                <div className="car_item" key={car + id}>
                                                    <Car car={car} id={id}/>
                                                    <button className="btn btn btn-outline-success mt-2" onClick={() => handleBuyCar(car)}>Buy</button>
                                                </div>

                                            )
                                        }) : (
                                            <div>
                                                There is no cars or they are all bought. Create some mb? :)
                                            </div>
                                        )}
                                    </div>
                                    <button className="btn btn-outline-danger m-2" onClick={() => setBuyingCars(false)}>Leave</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={"buttons_container position-absolute right_center " + handleButtonsDisplay()}>
                    <button className="crud_button crud_view image" onClick={() => setInEdit(true)}/>
                    <button className="crud_button crud_remove image ml-3" onClick={handleDelete}/>
                </div>
            </div> : <UserEditingForm user={props.user} id={props.id} onEditCancel={handleEditCancel}/>
    );
}