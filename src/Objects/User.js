import * as Yup from "yup";

export default function User(name, surname, age, ownedCarsIds = []) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.ownedCarsIds = ownedCarsIds;
}

export const userBinder = {
    inputFields: {
        name: {
            label: "First name:",
            inputType: "text",
            required: true
        },
        surname: {
            label: "Surname:",
            inputType: "text",
            required: true
        },
        age: {
            label: "Age:",
            inputType: "number",
            required: true
        }
    },
    ownedCarsIds: {label: "Owned cars:",}
}

export const validationSchema = Yup.object({
    name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(2, "Must be 2 characters or more")
        .required('Required'),
    surname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .min(3, "Must be 3 characters or more")
        .required('Required'),
    age: Yup.number()
        .max(200, "You are really so adult? :)")
        .positive("Your age is negative? Wow?!? Tell your secrets")
        .required('Required')
        .integer("Enter pls integer number"),
});