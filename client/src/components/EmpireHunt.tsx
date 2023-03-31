import { getActivityDef } from "@d2api/manifest-web";
import React from "react";
import "./styles/component.css";

import Card from "react-bootstrap/Card";
import LargeImageCard from "./LargeImageCard";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type empireHuntResponse = {
	currHunt: string;
};

type MyProps = {};

type MyState = {
	apiResponse: empireHuntResponse;
};

class EmpireHunt extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: { currHunt: "" },
		};
	}

	getEmpireHuntRotation() {
		fetch(`${API_ENDPOINT}/api/empire_hunt`)
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getEmpireHuntRotation();
	}

	getInfo() {
		const currHuntInfo = getActivityDef(this.state.apiResponse.currHunt);
		return currHuntInfo;
	}

	render() {
		if (this.state !== null && this.state.apiResponse.currHunt !== "") {
			const activity = this.getInfo();
			if (activity === undefined)
				return <div>error loading empire hunt </div>;
			const title = activity.displayProperties.name.split(":");
			return (
				<div key={activity.hash} style={{ width: "40%" }}>
					<LargeImageCard
						imageSrc={activity.pgcrImage}
						title={title[0] + ": " + title[1]}
					>
						<div className='dark-background' style={{ width: "80%", margin: "auto" }}>
							{activity.displayProperties.description}
						</div>
					</LargeImageCard>
				</div>
			);
		}
	}
}

export default EmpireHunt;
