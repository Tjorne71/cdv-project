import {format as dateFormat} from "date-fns";

export function monthToTextLong(month) {
    return dateFormat(new Date(2000, month - 1, 1), "MMMM")
}

export function monthToTextShort(month) {
    return dateFormat(new Date(2000, month - 1, 1), "MMM")
}