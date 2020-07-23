export function makeColumns(fields) {
    return Object.keys(fields).map((key) => {
        return {
            title: fields[key]["title"],
            field: key,
        }
    });
}