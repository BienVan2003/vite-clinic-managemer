export function formatyyyyMMdd(input) {
    let parts = input.split("-"); 
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

export function formatddMMyyyy(input) {
    let parts = input.split("-"); 
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}