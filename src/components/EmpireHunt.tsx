import { getActivityDef } from "@d2api/manifest-web";
import React from "react";
import "./styles/component.css";

import Card from "react-bootstrap/Card";

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
			apiResponse: {currHunt: ""}
		};
	}

	getEmpireHuntRotation() {
		fetch("http://localhost:5000/api/empire_hunt")
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
			return (
				<div key={activity.hash}>
					<Card style={{ width: "25rem" }}>
						<Card.Img
							variant='top'
							src={`https://www.bungie.net${activity.pgcrImage}`}
						/>
						<Card.Body>
							<Card.Title>
								{activity.displayProperties.name}
							</Card.Title>
						</Card.Body>
					</Card>
				</div>
			);
		}
	}
}

export default EmpireHunt;
