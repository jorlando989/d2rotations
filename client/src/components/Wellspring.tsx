import React from "react";
import "./styles/component.css";
import { getInventoryItemDef, getActivityDef } from "@d2api/manifest-web";
import {
	DestinyActivityDefinition,
	DestinyInventoryItemDefinition,
} from "bungie-api-ts/destiny2";
import { renderRewards } from "../services/descriptionRenderer";
import LargeImageCard from "./LargeImageCard";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type wellspringResponse = {
	bossName: string;
	activityHash: number;
	weaponHash: number;
};

type wellspringInfoType = {
	activityInfo: DestinyActivityDefinition;
	rewardInfo: DestinyInventoryItemDefinition;
	activityRewards: DestinyInventoryItemDefinition[];
};

type MyProps = {};

type MyState = {
	apiResponse: wellspringResponse;
};

class Wellspring extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: {
				bossName: "",
				activityHash: -1,
				weaponHash: -1,
			},
		};
	}

	getWellspringRotation() {
		fetch(`${API_ENDPOINT}/api/wellspring`)
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getWellspringRotation();
	}

	getInfo(wellspringInfo: wellspringResponse) {
		const activityInfo = getActivityDef(wellspringInfo.activityHash);
		if (activityInfo === undefined) {
			return;
		}
		const rewardInfo = getInventoryItemDef(wellspringInfo.weaponHash);
		if (rewardInfo === undefined) {
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
		return {
			activityInfo,
			rewardInfo,
			activityRewards,
		};
	}

	render() {
		if (this.state !== null && this.state.apiResponse.bossName !== "") {
			const wellspringInfo: wellspringInfoType | undefined = this.getInfo(
				this.state.apiResponse
			);
			if (wellspringInfo === undefined)
				return <div>error loading Wellspring reward</div>;
			return (
				<div style={{width: '50%'}}>
					<LargeImageCard
						imageSrc={wellspringInfo.activityInfo.pgcrImage}
						title={
							wellspringInfo.activityInfo.displayProperties.name
						}
					>
						<div className='dark-background p5 overflowAuto'>
							<div className='p5'>
								{
									wellspringInfo.activityInfo
										.displayProperties.description
								}
							</div>
							<hr />
							{renderRewards(wellspringInfo.activityRewards)}
						</div>
					</LargeImageCard>
				</div>
			);
		}
	}
}

export default Wellspring;
