export default function User(name, surname) {
    this.name = name;
    this.surname = surname;
}

export const userDependencies = {
    name: "First name:",
    surname: "Surname:",
}