import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {removeUserById} from "../redux/actions";
import UserEditingForm from "./UserEditingForm";

export default function User(props) {
    const dispatch = useDispatch();
    const {name, surname, age} = props.user;
    const [mouseInElement, setMouseInElement] = useState(false);
    const [inEdit, setInEdit] = useState(false);

    function handleButtonsDisplay() {
        return mouseInElement ? "visible" : "invisible";
    }

    function handleDelete() {
        dispatch(removeUserById(props.id));
    }
    
    function handleEditCancel() {
        setInEdit(false);
    }

    return (!inEdit ?
            <div className="user_container border-secondary border-bottom position-relative mb-2"
                 onMouseEnter={() => setMouseInElement(true)}
                 onMouseLeave={() => setMouseInElement(false)}
            >
                <p>{name}</p>
                <p>{surname}</p>
                <p>{age}</p>
                <div className={"buttons_container position-absolute right_center " + handleButtonsDisplay()}>
                    <button className="crud_button crud_view image" onClick={() => setInEdit(true)}/>
                    <button className="crud_button crud_remove image ml-3" onClick={handleDelete}/>
                </div>
            </div> : <UserEditingForm user={props.user} id={props.id} onEditCancel={handleEditCancel}/>
    );
}