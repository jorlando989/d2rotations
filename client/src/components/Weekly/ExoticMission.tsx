import React from "react";
import LargeImageCard from "../Card/LargeImageCard";
import "../styles/component.css";
import { renderRewards } from "../../services/descriptionRenderer";
import { getActivityDef, getInventoryItemDef } from "@d2api/manifest-web";
import { exoticMissionResponse } from "../../typeDefinitions/destinationTypes";
import { DestinyActivityDefinition } from "bungie-api-ts/destiny2";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type exoticMissionType = {
    normal: number,
    legend: number
}

type MyProps = {};

type MyState = {
	apiResponse: exoticMissionResponse;
};

class ExoticMission extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: {
				featuredMission: { normal: -1, legend: -1 },
				rotation: [],
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

	renderRotation(
		rotation: string[] | undefined,
		current: string
	) {
		if (rotation) {
			let iconImage: string = "/common/destiny2_content/icons/DestinyMilestoneDefinition_7b2e832d6fa3513b3c3e55f69aaeee40.png";
			console.log(rotation);
            return rotation.map(rotator => {
				if (rotator === undefined) return null;
				let classes = "display-in-row center center-vertical pr5";
				if (rotator + ": Normal" === current) {
					classes = classes.concat(" highlight");
				}
				return (
					<div key={rotator} className={classes}>
						<img
							src={`https://www.bungie.net${iconImage}`}
							className='weaponIcon darkBgIcon'
							alt='weapon icon'
						/>
						{rotator}
					</div>
				);
			});
		}
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
                    <div className='display-in-row-wrap rotationBox'>
					{this.renderRotation(
						this.state.apiResponse.rotation,
						rotationInfo.missionInfo.displayProperties.name
					)}
				</div>
				</div>
			);
		}
	}
}

export default ExoticMission;
