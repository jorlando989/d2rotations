import React from "react";
import Card from "react-bootstrap/Card";
import { checkIfActive } from "../../services/activeChecker";
import { renderReputationIcon } from "../../services/iconRenderer";
import { eventType } from "../../typeDefinitions/calendarTypes";
import "../styles/component.css";
import "../styles/imagecard.css";

type MyProps = {
	title: string | undefined;
	iconImg: string | undefined;
	eventInfo: eventType;
};

type MyState = {};

class CalendarCard extends React.Component<MyProps, MyState> {
	renderTimes() {
		return this.props.eventInfo.time.map(eventTime => {
			let classes = "mb5 pl5 rounded-corners";
			if (
				this.props.title !== undefined &&
				checkIfActive(this.props.title, eventTime)
			)
				classes += " highlight2";
			if (this.props.title === "Reputation Bonus") {
				classes += " display-in-row";
				return (
					<div key={eventTime} className={classes}>
						{renderReputationIcon(eventTime)}
						{eventTime}
					</div>
				);
			}
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
