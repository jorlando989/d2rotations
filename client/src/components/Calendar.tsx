import { getSeasonDef } from "@d2api/manifest-web";
import { DestinySeasonDefinition } from "bungie-api-ts/destiny2";
import React from "react";
import { getCalendarIcon } from "../services/iconRenderer";
import { eventType } from "../typeDefinitions/calendarTypes";
import CalendarCard from "./Card/CalendarCard";
import "./styles/component.css";

type MyProps = {};

type MyState = {
	apiResponse: { seasonHash: number };
};

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const calendarEvents = require("../data/calendarEvents.json");

class Calendar extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: { seasonHash: -1 },
		};
	}

	getSeasonHash() {
		fetch(`${API_ENDPOINT}/api/season`)
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getSeasonHash();
	}

	getSeasonInfo() {
		const seasonInfo = getSeasonDef(this.state.apiResponse.seasonHash);
		return seasonInfo;
	}

	render() {
		if (calendarEvents) {
			let seasonInfo: DestinySeasonDefinition | null | undefined = null;
			if (this.state.apiResponse.seasonHash !== -1) {
				seasonInfo = this.getSeasonInfo();
			}
			return (
				<div className='info'>
					<div className='display-in-row-title mr5'>
						<div className='display-in-row'>
							<img
								src={`https://www.bungie.net${seasonInfo?.displayProperties.icon}`}
								className='seasonIcon'
							/>
							<h2 className='center-vertical display-flex'>
								{seasonInfo?.displayProperties.name}
							</h2>
						</div>

						<div className='center-vertical display-flex'>
							{calendarEvents.seasonInfo.dates}
						</div>
					</div>
					<hr />
					<div className='display-in-row-wrap calendar'>
						{calendarEvents.events.map((eventInfo: eventType) => {
							return (
								<CalendarCard
									title={eventInfo.title}
									iconImg={getCalendarIcon(eventInfo.title)}
									eventInfo={eventInfo}
								/>
							);
						})}
					</div>
				</div>
			);
		} else {
			return <div>loading...</div>;
		}
	}
}

export default Calendar;
