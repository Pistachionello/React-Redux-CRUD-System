import React from "react";

export default function FormikInputs({formik, binder}) {
    return (
        <>
            {Object.keys(formik.initialValues).map((key, i) => {
                return (
                    <div className={"formik_input_container mb-2"} key={key + i}>
                        <div className="label_container">
                            {binder[key]["label"]}
                        </div>
                        <div className="input_container">
                            <input id={key} type={binder[key]["inputType"]}{...formik.getFieldProps(key)}/>
                        </div>
                        <div className="errors_container">
                            {formik.touched[key] && formik.errors[key] ? <div>{formik.errors[key]}</div> : null}
                        </div>
                    </div>
                );
            })}
        </>
    );
}