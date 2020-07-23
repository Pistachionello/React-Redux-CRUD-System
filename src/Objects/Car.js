import * as Yup from "yup";

export default function Car(name, brand, mileage, userOwnerId, idNumber) {
    this.name = name;
    this.brand = brand;
    this.mileage = mileage;
    this.userOwnerId = userOwnerId;
    this.idNumber = idNumber || makeId(8);
}

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
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
    materialTableFields: {
        name: {
            title: "Name",
        },
        brand: {
            title: "Brand",
        },
        mileage: {
            title: "Mileage",
        }
    },
    userOwnerId: {label: "Owner:"}
}

export const validationSchema = Yup.object({
    name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(2, "Must be 2 characters or more")
        .required('Required'),
    brand: Yup.string()
        .max(20, "Must be 20 characters or less")
        .min(3, "Must be 3 characters or more")
        .required('Required'),
    mileage: Yup.number()
        .positive("Your mileage is negative? Wow?!? Tell your secrets")
        .required('Required'),
});