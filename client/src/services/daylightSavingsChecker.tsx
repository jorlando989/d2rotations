/* https://stackoverflow.com/questions/11887934/how-to-check-if-dst-daylight-saving-time-is-in-effect-and-if-so-the-offset */
export function dstOffsetAtDate(dateInput: Date) {
    var fullYear = dateInput.getFullYear()|0;
    // "Leap Years are any year that can be exactly divided by 4 (2012, 2016, etc)
    //   except if it can be exactly divided by 100, then it isn't (2100,2200,etc)
    //    except if it can be exactly divided by 400, then it is (2000, 2400)"
    // (https://www.mathsisfun.com/leap-years.html).
    var isLeapYear = ((fullYear & 3) | (fullYear/100 & 3)) === 0 ? 1 : 0;
    // (fullYear & 3) = (fullYear % 4), but faster
    //Alternative:var isLeapYear=(new Date(currentYear,1,29,12)).getDate()===29?1:0
    var fullMonth = dateInput.getMonth()|0;
    return (
        // 1. We know what the time since the Epoch really is
        (+dateInput) // same as the dateInput.getTime() method
        // 2. We know what the time since the Epoch at the start of the year is
        - (+new Date(fullYear, 0)) // day defaults to 1 if not explicitly zeroed
        // 3. Now, subtract what we would expect the time to be if daylight savings
        //      did not exist. This yields the time-offset due to daylight savings.
        - ((
            ((
                // Calculate the day of the year in the Gregorian calendar
                // The code below works based upon the facts of signed right shifts
                //    • (x) >> n: shifts n and fills in the n highest bits with 0s 
                //    • (-x) >> n: shifts n and fills in the n highest bits with 1s
                // (This assumes that x is a positive integer)
                -1 + // first day in the year is day 1
                (31 & ((-fullMonth) >> 4)) + // January // (-11)>>4 = -1
                ((28 + isLeapYear) & ((1-fullMonth) >> 4)) + // February
                (31 & ((2-fullMonth) >> 4)) + // March
                (30 & ((3-fullMonth) >> 4)) + // April
                (31 & ((4-fullMonth) >> 4)) + // May
                (30 & ((5-fullMonth) >> 4)) + // June
                (31 & ((6-fullMonth) >> 4)) + // July
                (31 & ((7-fullMonth) >> 4)) + // August
                (30 & ((8-fullMonth) >> 4)) + // September
                (31 & ((9-fullMonth) >> 4)) + // October
                (30 & ((10-fullMonth) >> 4)) + // November
                // There are no months past December: the year rolls into the next.
                // Thus, fullMonth is 0-based, so it will never be 12 in Javascript
                
                (dateInput.getDate()|0) // get day of the month
                
            )&0xffff) * 24 * 60 // 24 hours in a day, 60 minutes in an hour
            + (dateInput.getHours()&0xff) * 60 // 60 minutes in an hour
            + (dateInput.getMinutes()&0xff)
        )|0) * 60 * 1000 // 60 seconds in a minute * 1000 milliseconds in a second
        - (dateInput.getSeconds()&0xff) * 1000 // 1000 milliseconds in a second
        - dateInput.getMilliseconds()
    );
}