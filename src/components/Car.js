import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {removeCarById} from "../redux/actions";

export default function Car(props) {
    const dispatch = useDispatch();

    const {name, brand, mileage} = props.car;
    const [mouseInElement, setMouseInElement] = useState(false);

    function handleButtonsDisplay() {
        return mouseInElement ? "visible" : "invisible";
    }

    function handleDelete() {
        dispatch(removeCarById(props.id));
    }

    return (
        <div className="car_container border-secondary border-bottom position-relative"
             onMouseEnter={() => setMouseInElement(true)}
             onMouseLeave={() => setMouseInElement(false)}
        >
            <p>{name}</p>
            <p>{brand}</p>
            <p>{mileage}</p>
            <div className={"buttons_container position-absolute right_center " + handleButtonsDisplay()}>
                <button className="crud_button crud_view image"/>
                <button className="crud_button crud_remove image ml-1" onClick={handleDelete}/>
            </div>
        </div>
    );
}