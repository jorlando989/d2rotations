import React from "react";
import "../styles/component.css";
import "../styles/imagecard.css";
import Card from "react-bootstrap/Card";
import { eventType } from "../../typeDefinitions/calendarTypes";

type MyProps = {
	title: string | undefined;
	iconImg: string | undefined;
	eventInfo: eventType;
};

type MyState = {};

class CalendarCard extends React.Component<MyProps, MyState> {
	renderTimes() {
		return this.props.eventInfo.time.map(eventTime => {
			return <div key={eventTime}>{eventTime}</div>;
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
