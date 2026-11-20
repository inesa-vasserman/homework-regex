export function checkDateFormatEU(date) {
    let regex = /^([0-2][1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.[0-9]{4}$/;
    return regex.test(date);
}

export function checkDateFormatUS(date) {
    const regex = /^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][1-9]|[12][0-9]|3[01])$/;
    return regex.test(date);
}

export function checkPhoneNumber(phone) {
    const regex = /^\+\d{2}\(\d{2}\)\d{4}-\d{4}$/;
    return regex.test(phone);
}

export function checkLessEquals255(value) {
    const regex = /^(\d|\d{2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return regex.test(value);
}