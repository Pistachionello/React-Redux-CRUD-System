export default function User(name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
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
    }
}