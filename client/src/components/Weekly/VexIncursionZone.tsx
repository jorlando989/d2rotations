import { getActivityDef, getInventoryItemDef } from "@d2api/manifest-web";
import React from "react";
import "../styles/component.css";

import LargeImageCard from "../Card/LargeImageCard";
import { renderRewards } from "../../services/descriptionRenderer";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type VIZResponse = {
	featuredLocation: string;
	activityHash: number;
	destinationHash: number;
};

type MyProps = {};

type MyState = {
	apiResponse: VIZResponse;
};

class VexIncursionZone extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: {
				featuredLocation: "",
				activityHash: -1,
				destinationHash: -1,
			},
		};
	}

	getVIZRotation() {
		fetch(`${API_ENDPOINT}/api/vex_incursion_zone`)
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getVIZRotation();
	}

	getInfo() {
		const destinationInfo = getActivityDef(
			this.state.apiResponse.destinationHash
		);

		const activityInfo = getActivityDef(
			this.state.apiResponse.activityHash
		);
		if (activityInfo === undefined) {
			return;
		}
		const activityRewards = activityInfo.rewards.flatMap(
			({ rewardItems }) => {
				const rewards = rewardItems
					.filter(reward => {
						return reward !== undefined;
					})
					.map(reward => {
						const rewardData = getInventoryItemDef(
							reward.itemHash
						)!;
						return rewardData;
					});
				return rewards;
			}
		);
		return { destinationInfo, activityInfo, activityRewards };
	}

	render() {
		if (
			this.state !== null &&
			this.state.apiResponse.featuredLocation !== ""
		) {
			const rotationInfo = this.getInfo();
			if (
				rotationInfo === undefined ||
				rotationInfo.activityInfo === undefined ||
				rotationInfo.destinationInfo === undefined
			)
				return <div>error loading rotation </div>;
			return (
				<div
					key={rotationInfo.activityInfo?.hash}
					style={{ maxWidth: "500px" }}
				>
					<LargeImageCard
						imageSrc={rotationInfo.destinationInfo?.pgcrImage}
						title='Vex Incursion Zone'
					>
						<div
							className='dark-background p5'
							style={{ width: "80%", margin: "auto" }}
						>
							<h5>
								Location:{" "}
								{this.state.apiResponse.featuredLocation}
							</h5>
							<hr />
							{renderRewards(rotationInfo.activityRewards)}
						</div>
					</LargeImageCard>
				</div>
			);
		}
	}
}

export default VexIncursionZone;
