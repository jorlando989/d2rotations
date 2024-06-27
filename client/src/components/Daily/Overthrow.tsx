import { getActivityDef, getInventoryItemDef } from "@d2api/manifest-web";
import React from "react";
import "../styles/component.css";
import LargeImageCard from "../Card/LargeImageCard";
import { renderRewards, getActivityRewards } from "../../services/descriptionRenderer";
import { overthrowResponse } from "../../typeDefinitions/destinationTypes";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
type MyProps = {};

type MyState = {
	apiResponse: overthrowResponse;
};

class Overthrow extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: {
				overthrowLocation: "",
				activityHash: -1,
				destinationHash: -1,
			},
		};
	}

	getOverthrowRotation() {
		fetch(`${API_ENDPOINT}/api/overthrow`)
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getOverthrowRotation();
	}

	getInfo() {
		const activityInfo = getActivityDef(
			this.state.apiResponse.activityHash
		);
		const rewardsInfo = getActivityRewards(activityInfo);
		return {
			activityInfo,
			rewardsInfo,
			location: this.state.apiResponse.overthrowLocation,
		};
	}

	render() {
		if (
			this.state !== null &&
			this.state.apiResponse.overthrowLocation !== ""
		) {
			const activity = this.getInfo();
			if (activity === undefined || activity.activityInfo === undefined)
				return <div>error loading overthrow rotation </div>;
			
			return (
				<div
					key={activity.activityInfo.hash}
					style={{ maxWidth: "500px" }}
				>
					<LargeImageCard
						imageSrc={activity.activityInfo.pgcrImage}
						title={activity.activityInfo.displayProperties.name}
					>
						<div
							className='dark-background p5'
							style={{ width: "80%", margin: "auto" }}
						>
							Location: {activity.location}
							<hr />
							{renderRewards(activity.rewardsInfo)}
						</div>
					</LargeImageCard>
				</div>
			);
		}
	}
}

export default Overthrow;
