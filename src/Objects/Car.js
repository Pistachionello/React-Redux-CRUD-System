export default function Car(name, brand, mileage) {
    this.name = name;
    this.brand = brand;
    this.mileage = mileage;
}

export const carDependencies = {
    name: "Name:",
    brand: "Brand:",
    mileage: "Mileage:"
}