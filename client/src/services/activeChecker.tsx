import { dstOffsetAtDate, isAfterDailyReset } from "./daylightSavingsChecker";

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function checkActiveWeek(time: String, now: Date) {
	const splitString = time.split(" ");
	const month = splitString[splitString.length - 2];
	const day = Number(splitString[splitString.length - 1]);

	if (
		month === monthNames[now.getMonth()] &&
		now.getDate() >= day &&
		now.getDate() <= day + 7
	) {
		if (now.getDate() === day && !isAfterDailyReset(now)) {
			//reset has not happened on tuesday
			return false;
		} else if (now.getDate() == day + 7 && isAfterDailyReset(now)) {
			//reset has already happened on next tuesday
			return false;
		}
		return true;
	}
	return false;
}

function checkActiveWeekend(time: String, now: Date) {
	const splitString = time.split(" ");
	const month = splitString[splitString.length - 2];
	const day = Number(splitString[splitString.length - 1]);

	if (
		month === monthNames[now.getMonth()] &&
		now.getDate() >= day &&
		now.getDate() <= day + 5
	) {
		//reset has already happened on next tuesday
		if (now.getDate() == day + 4 && isAfterDailyReset(now)) return false;
		return true;
	}
	return false;
}

function checkActiveRange(time: String, now: Date) {
	//date range
	const splitString = time.split("–");

	const daylight_savings = dstOffsetAtDate(now) !== 0;
	let startDate, endDate;
	if (daylight_savings) {
		startDate = new Date(splitString[0] + " 13:00:00");
		endDate = new Date(splitString[1] + " 13:00:00");
	} else {
		startDate = new Date(splitString[0] + " 12:00:00");
		endDate = new Date(splitString[1] + " 12:00:00");
	}

	return now >= startDate && now < endDate;
}

function checkHasPassed(time: String, now: Date) {
	const splitString = time.split(" ");
	const month = splitString[splitString.length - 2];
	const day = Number(splitString[splitString.length - 1]);

	const eventDate = new Date(
		now.getFullYear(),
		monthNames.indexOf(month),
		day
	);

	if (now.getDate() === eventDate.getDate() && !isAfterDailyReset(now)) {
		return false;
	}
	return now >= eventDate;
}

export function checkIfActive(title: String, time: String) {
	const now = new Date();

	if (title === "Iron Banner") {
		return checkActiveWeek(time, now);
	} else if (title === "Trials of Osiris") {
		return checkActiveWeekend(time, now);
	} else if (title === "Reputation Bonus") {
		return checkActiveWeek(time, now);
	} else if (time.includes(",")) {
		return checkActiveRange(time, now);
	} else {
		return checkHasPassed(time, now);
	}
}
