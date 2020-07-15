export default function User(name, surname, age, ownedCars = []) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.ownedCars = ownedCars;
}

export const userBinder = {
    inputFields: {
        name: {
            label: "First name:",
            inputType: "text",
            required: true
        },
        surname: {
            label: "Surname",
            inputType: "text",
            required: true
        },
        age: {
            label: "Age:",
            inputType: "number",
            required: true
        }
    },
    ownedCars: {label: "Owned cars:",}
}