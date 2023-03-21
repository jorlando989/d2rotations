import { FC } from "react";
import "./styles/component.css";

import Card from "react-bootstrap/Card";

type eventType = {
	title: string;
	time: string[];
};

const calendarEvents = require("../data/calendarEvents.json");

function renderTimes(eventTimes: string[]) {
    return eventTimes.map(eventTime => {
        return <div>{eventTime}</div>
    })
}

function renderEvent(eventInfo: eventType) {
	return (
		<Card style={{ width: "18rem" }} key={eventInfo.title}>
			<Card.Body>
				<Card.Title>{eventInfo.title}</Card.Title>
				{renderTimes(eventInfo.time)}
			</Card.Body>
		</Card>
	);
}

const Calendar: FC = () => {
	return (
		<div className='info display-in-row-wrap calendar'>
			{calendarEvents.events.map((eventInfo: eventType) => {
				return renderEvent(eventInfo);
			})}
		</div>
	);
};

export default Calendar;
