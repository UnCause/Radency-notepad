export default function getDates (content) {
    let exp = /\d{1,2}\/\d{1,2}\/\d{4}/g;
    let dates = content.match(exp);
    let output = [];
    try {
        dates.forEach(rawdate => {
            let dateParts = rawdate.split("/");
            let day = dateParts[0];
            let month = dateParts[1];
            let year = dateParts[2];
    
            day = parseInt(day, 10);
            month = parseInt(month, 10) - 1; // Monthes in JS start from 0
            year = parseInt(year, 10);
    
            const date = new Date(year, month, day);

            if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
                output.push(rawdate);
            };
        });
    } catch (error) {
        console.log("There is no dates in content input!");
    }

    return output.join(", ");
}