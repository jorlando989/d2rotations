import React from "react";
import LargeImageCard from "../Card/LargeImageCard";
import "../styles/component.css";
import { getActivityDef, getInventoryItemDef } from "@d2api/manifest-web";
import { exoticMissionResponse } from "../../typeDefinitions/destinationTypes";
import {
	renderRewards,
	getActivityRewards,
} from "../../services/descriptionRenderer";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type exoticMissionType = {
	normal: number;
	legend: number;
};

type MyProps = {
	name: string | undefined;
};

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
		return {
			missionInfo,
			activityRewards: getActivityRewards(missionInfo),
		};
	}

	getMissionInfo(hash: number) {
		const missionInfo = getActivityDef(hash);
		const activityRewards = getActivityRewards(missionInfo);
		return { missionInfo, activityRewards };
	}

	renderRotation(rotation: string[] | undefined, current: string) {
		if (current === "The Whisper: Standard" || current === "Zero Hour: Standard") return;
		if (rotation) {
			let iconImage: string =
				"/common/destiny2_content/icons/9e6c42c7427efa14f50279d761744e38.png";
			return rotation.map(rotator => {
				if (rotator === undefined) return null;
				let classes = "display-in-row center center-vertical pr5";
				if (
					rotator === current ||
					rotator + ": Standard" === current ||
					rotator + ": Normal" === current
				) {
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
			var rotationInfo = null;
			if (this.props.name === "") {
				rotationInfo = this.getInfo();
			} else if (this.props.name === "The Whisper") {
				rotationInfo = this.getMissionInfo(3743446313);
			} else if (this.props.name === "Zero Hour") {
				rotationInfo = this.getMissionInfo(3361746271);
				
			} 
			if (rotationInfo === null || rotationInfo === undefined || rotationInfo.missionInfo === undefined) return <div>error loading exotic mission info</div>;
			return (
				<div style={{ maxWidth: "500px" }}>
					<LargeImageCard
						imageSrc={rotationInfo.missionInfo?.pgcrImage}
						title={
							rotationInfo.missionInfo.displayProperties.name
						}
					>
						<div
							className='dark-background p5 overflowAuto80'
							style={{ width: "80%", margin: "auto" }}
						>
							<div>
								{
									rotationInfo.missionInfo
										?.displayProperties.description
								}
							</div> 
							<hr />
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
