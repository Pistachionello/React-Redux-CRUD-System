import {Form, Formik} from "formik";
import React from "react";

export default function FormikForm({initialValues, validationSchema, onSubmit, children}) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(props) => {
                return (
                    <Form>
                        {children}
                    </Form>
                );
            }}
        </Formik>
    );
}