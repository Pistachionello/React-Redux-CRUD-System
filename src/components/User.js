import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {removeUserById} from "../redux/actions";
import EditableUser from "./EditableUser";

export default function User(props) {
    const dispatch = useDispatch();
    const {name, surname} = props.user;
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
                {name} {surname}
                <div className={"buttons_container position-absolute right_center " + handleButtonsDisplay()}>
                    <button className="crud_button_sm crud_view image" onClick={() => setInEdit(true)}/>
                    <button className="crud_button_sm crud_remove image ml-3" onClick={handleDelete}/>
                </div>
            </div> : <EditableUser user={props.user} id={props.id} onEditCancel={handleEditCancel}/>
    );
}