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
    ownedCarsIds: {label: "Owned cars:",}
}