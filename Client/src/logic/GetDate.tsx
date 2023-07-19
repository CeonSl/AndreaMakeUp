import { DateSell } from "../types/Sells";

export const GetDate = (ms: DateSell[], id: number) => {
    let dateData: string = ""
    for (let i = 0; i < ms.length; i++) {
        if (ms[i].id == id) {
            dateData = ms[i].created_at
        }
    }
    const date = new Date(dateData)
    // console.log(date);
    return (formatDate(date))
}

function formatDate(date: Date) {
    let hours = date.getHours();
    let minutes: string = date.getMinutes().toString();
    let seconds: string = date.getSeconds().toString();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = parseInt(minutes) <= 9 ? ('0' + minutes) : minutes;
    seconds = parseInt(seconds) <= 9 ? ('0' + seconds) : seconds;
    let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "  " + strTime;
}