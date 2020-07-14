export default function Car(name, brand, mileage) {
    this.name = name;
    this.brand = brand;
    this.mileage = mileage;
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
    }
}