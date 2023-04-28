import { getActivityDef, getInventoryItemDef } from "@d2api/manifest-web";
import React from "react";
import "../styles/component.css";

import { renderRewards } from "../../services/descriptionRenderer";
import LargeImageCard from "../Card/LargeImageCard";
import { terminalOverloadResponse } from "../../typeDefinitions/destinationTypes";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type MyProps = {};

type MyState = {
	apiResponse: terminalOverloadResponse;
};

class TerminalOverload extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: { location: "", weapon: "" },
		};
	}

	getTerminalOverloadRotation() {
		fetch(`${API_ENDPOINT}/api/terminal_overload`)
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getTerminalOverloadRotation();
	}

	getInfo() {
		const locationInfo = getActivityDef(this.state.apiResponse.location);
		const weaponInfo = getInventoryItemDef(this.state.apiResponse.weapon);
		return { locationInfo, weaponInfo };
	}

	render() {
		if (this.state !== null && this.state.apiResponse.location !== "") {
			const activity = this.getInfo();
			if (
				activity === undefined ||
				activity.locationInfo === undefined ||
				activity.weaponInfo === undefined
			)
				return <div>error loading terminal overload rotation </div>;

			return (
				<div
					key={activity.locationInfo.hash}
					style={{ maxWidth: "500px" }}
				>
					<LargeImageCard
						imageSrc={activity.locationInfo.pgcrImage}
						title={activity.locationInfo.displayProperties.name}
					>
						<div
							className='dark-background p5'
							style={{ width: "80%", margin: "auto" }}
						>
							{
								activity.locationInfo.displayProperties
									.description
							}
							<hr />
							{renderRewards([activity.weaponInfo])}
						</div>
					</LargeImageCard>
				</div>
			);
		}
	}
}

export default TerminalOverload;
