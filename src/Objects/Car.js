export default function Car(name, brand, mileage, userOwnerId = undefined) {
    this.name = name;
    this.brand = brand;
    this.mileage = mileage;
    this.userOwnerId = userOwnerId;
    this.idNumber = makeId(8);
}

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const carBinder = {
    inputFields: {
        name: {
            label: "Name:",
            inputType: "text",
            required: true
        },
        brand: {
            label: "Brand:",
            inputType: "text",
            required: true
        },
        mileage: {
            label: "Mileage:",
            inputType: "number",
            required: true
        }
    },
    userOwnerId: {label: "Owner:"}
}