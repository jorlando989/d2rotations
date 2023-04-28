import React from "react";
import "../styles/component.css";
import "../styles/imagecard.css";
import Card from "react-bootstrap/Card";
import { eventType } from "../../typeDefinitions/calendarTypes";
import {
	dstOffsetAtDate,
	isAfterDailyReset,
} from "../../services/daylightSavingsChecker";

type MyProps = {
	title: string | undefined;
	iconImg: string | undefined;
	eventInfo: eventType;
};

type MyState = {};

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

class CalendarCard extends React.Component<MyProps, MyState> {
	checkActiveWeek(time: String, now: Date) {
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

	checkActiveWeekend(time: String, now: Date) {
		const splitString = time.split(" ");
		const month = splitString[splitString.length - 2];
		const day = Number(splitString[splitString.length - 1]);

		if (
			month === monthNames[now.getMonth()] &&
			now.getDate() >= day &&
			now.getDate() <= day + 5
		) {
			//reset has already happened on next tuesday
			if (now.getDate() == day + 4 && isAfterDailyReset(now))
				return false;
			return true;
		}
		return false;
	}

	checkActiveRange(time: String, now: Date) {
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

	checkHasPassed(time: String, now: Date) {
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

	checkIfActive(time: String) {
		const now = new Date();

		if (this.props.title === "Iron Banner") {
			return this.checkActiveWeek(time, now);
		} else if (this.props.title === "Trials of Osiris") {
			return this.checkActiveWeekend(time, now);
		} else if (this.props.title === "Reputation Bonus") {
			return this.checkActiveWeek(time, now);
		} else if (time.includes(",")) {
			return this.checkActiveRange(time, now);
		} else {
			return this.checkHasPassed(time, now);
		}
	}

	renderTimes() {
		return this.props.eventInfo.time.map(eventTime => {
			let classes = "mb5 pl5 rounded-corners";
			if (this.checkIfActive(eventTime)) classes += " highlight2";
			return (
				<div key={eventTime} className={classes}>
					{eventTime}
				</div>
			);
		});
	}

	render() {
		if (this.props) {
			return (
				<Card className='bg-dark text-white calendarCard'>
					<Card.Title className='calendarTitle'>
						<span>
							<img
								src={`https://www.bungie.net${this.props.iconImg}`}
								className='md-rewardIcon'
							/>
						</span>
						{this.props.title}
					</Card.Title>
					<Card.Body className='rounded-bottom'>
						{this.renderTimes()}
					</Card.Body>
				</Card>
			);
		}
	}
}

export default CalendarCard;
