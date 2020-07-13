import React, {useState} from "react";

export default function User(props) {
    const {name, surname} = props.user;
    const [mouseInElement, setMouseInElement] = useState(false);

    function handleButtonsDisplay() {
        return mouseInElement ? "visible" : "invisible";
    }

    return (
        <div className="user_container border-secondary border-bottom position-relative"
             onMouseEnter={() => setMouseInElement(true)}
             onMouseLeave={() => setMouseInElement(false)}
        >
            {name} {surname}
            <div className={"buttons_container position-absolute right_center " + handleButtonsDisplay()}>
                <button className="crud_button_sm crud_edit image"/>
                <button className="crud_button_sm crud_remove image ml-2"/>
            </div>
        </div>
    );
}