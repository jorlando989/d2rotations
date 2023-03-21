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
	if (calendarEvents) {
		return (
			<div className="info">
				<div className="display-in-row-title mr5">
					<h2>Season of {calendarEvents.seasonInfo.name}</h2>
					<div>{calendarEvents.seasonInfo.dates}</div>
				</div>
				<hr />
				<div className='display-in-row-wrap calendar'>
					{calendarEvents.events.map((eventInfo: eventType) => {
						return renderEvent(eventInfo);
					})}
				</div>
			</div>
		);
	} else {
		return <div>loading...</div>
	}
};

export default Calendar;
