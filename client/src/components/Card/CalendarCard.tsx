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
	checkIfActive(time: String) {
		const now = new Date();

		if (time.includes(",")) {
			//date range
			const splitString = time.split("–");
			const startDate = splitString[0];
			const endDate = splitString[1];
			// console.log(startDate, endDate);
		} else if (this.props.title === "Iron Banner") {
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
		} else if (this.props.title === "Trials of Osiris") {
			const splitString = time.split(" ");
			const month = splitString[splitString.length - 2];
			const day = Number(splitString[splitString.length - 1]);

			if (
				month === monthNames[now.getMonth()] &&
				now.getDate() >= day &&
				now.getDate() <= day + 5
			) {
				if (now.getDate() == day + 4 && isAfterDailyReset(now)) {
					//reset has already happened on next tuesday
					return false;
				}
				return true;
			}
		}
		return false;
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
