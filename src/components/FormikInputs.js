import React from "react";
import {Field, ErrorMessage, useFormikContext} from "formik";

export default function FormikInputs({binder}) {
    const {initialValues} = useFormikContext();
    return (
        <>
            {Object.keys(initialValues).map((key, i) => {
                return (
                    <div className={"formik_input_container mb-2"} key={key + i}>
                        <div className="label_container">
                            <label htmlFor={key}>{binder[key]["label"]}</label>
                        </div>
                        <div className="input_container">
                            <Field id={key} name={key} type={binder[key]["inputType"]}/>
                        </div>
                        <div className="errors_container">
                            <ErrorMessage name={key}/>
                        </div>
                    </div>
                );
            })}
        </>
    );
}