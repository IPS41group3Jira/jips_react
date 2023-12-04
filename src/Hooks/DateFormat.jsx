export default function dateFormat(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${("0" + date.getDate()).slice(-2)}`;
}