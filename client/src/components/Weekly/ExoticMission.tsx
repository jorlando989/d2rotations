import React from "react";
import LargeImageCard from "../Card/LargeImageCard";
import "../styles/component.css";
import { renderRewards } from "../../services/descriptionRenderer";
import { getActivityDef, getInventoryItemDef } from "@d2api/manifest-web";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type MyProps = {};

type MyState = {
	apiResponse: {
        featuredMission: {normal: number, legend: number},
        rotation: string[]
    };
};

class ExoticMission extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: {
				featuredMission: {normal: -1, legend: -1},
                rotation: []
			},
		};
	}

	getExoticMissionRotation() {
		fetch(`${API_ENDPOINT}/api/exotic_mission`)
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getExoticMissionRotation();
	}

    getInfo() {
		const missionInfo = getActivityDef(
			this.state.apiResponse.featuredMission.normal
		);
        console.log(missionInfo, this.state.apiResponse.featuredMission);
		if (missionInfo === undefined) {
			return;
		}
		const activityRewards = missionInfo.rewards.flatMap(
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
		return { missionInfo, activityRewards };
	}

	render() {
		if (
			this.state.apiResponse !== undefined &&
			this.state.apiResponse.featuredMission.normal !== -1
		) {
            const rotationInfo = this.getInfo();
			if (
				rotationInfo === undefined ||
				rotationInfo.missionInfo === undefined
			)
				return <div>error loading rotation </div>;
			return (
				<div style={{ maxWidth: "500px" }}>
					<LargeImageCard
						imageSrc={rotationInfo.missionInfo?.pgcrImage}
						title={rotationInfo.missionInfo.displayProperties.name}
					>
						<div
							className='dark-background p5'
							style={{ width: "80%", margin: "auto" }}
						>
							{renderRewards(rotationInfo.activityRewards)}
						</div>
					</LargeImageCard>
				</div>
			);
		}
	}
}

export default ExoticMission;
