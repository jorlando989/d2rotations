import { getActivityDef } from "@d2api/manifest-web";
import React from "react";
import { getArmorImage } from "../services/iconRenderer";
import { lostSectorType } from "../typeDefinitions/lostSectors";
import { weeklyNightfallResponse } from "../typeDefinitions/nightfall";
import {
	dungeonResponse,
	raidResponse,
} from "../typeDefinitions/raidDungeonTypes";
import CountdownTimer from "./CountdownTimer";
import ImageCard from "./ImageCard";

import "./styles/component.css";
import "./styles/dashboard.css";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type MyProps = {};

type MyState = {
	lostSectorResponse: lostSectorType;
	nightfallResponse: weeklyNightfallResponse;
	raidResponse: raidResponse;
	dungeonResponse: dungeonResponse;
};

class Dashboard extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			lostSectorResponse: {
				currLostSectorName: "",
				currLostSectorHashes: { master: -1, legend: -1 },
				currReward: "",
				lostSectorRotation: [],
				rewardRotation: [],
			},
			nightfallResponse: {
				nightfallActivities: undefined,
				weaponsRotation: [{ itemHash: -1, adeptItemHash: -1 }],
				currWeapon: "",
			},
			raidResponse: {
				featuredRaid: {
					milestoneHash: -1,
					activityHash: -1,
					masterActivityHash: -1,
				},
				raidRotation: [],
			},
			dungeonResponse: {
				featuredDungeon: {
					milestoneHash: -1,
					activityHash: -1,
					masterActivityHash: -1,
				},
				dungeonRotation: [],
			},
		};
	}

	getLostSectors() {
		fetch(`${API_ENDPOINT}/api/lost_sector`)
			.then(res => res.json())
			.then(res => this.setState({ lostSectorResponse: res }));
	}

	getWeeklyNightfallRewards() {
		fetch(`${API_ENDPOINT}/api/weekly_nightfall`)
			.then(res => res.json())
			.then(res => this.setState({ nightfallResponse: res }));
	}

	getRaidRotation() {
		fetch(`${API_ENDPOINT}/api/raid_rotation`)
			.then(res => res.json())
			.then(res => this.setState({ raidResponse: res }));
	}

	getDungeonRotation() {
		fetch(`${API_ENDPOINT}/api/dungeon_rotation`)
			.then(res => res.json())
			.then(res => this.setState({ dungeonResponse: res }));
	}

	componentDidMount() {
		this.getLostSectors();
		this.getWeeklyNightfallRewards();
		this.getDungeonRotation();
		this.getRaidRotation();
	}

	getInfo(hash: number) {
		const activityInfo = getActivityDef(hash);
		return {
			image: activityInfo?.pgcrImage,
			description: activityInfo?.displayProperties.description,
			name: activityInfo?.displayProperties.name,
		};
	}

	render() {
		if (this.state.nightfallResponse.nightfallActivities === undefined) {
			return;
		}
		const nightfallInfo = this.getInfo(
			this.state.nightfallResponse.nightfallActivities[0].activityHash
		);

		const lostSectorInfo = this.getInfo(
			this.state.lostSectorResponse.currLostSectorHashes.legend
		);
		const raidInfo = this.getInfo(
			this.state.raidResponse.featuredRaid.activityHash
		);
		const dungeonInfo = this.getInfo(
			this.state.dungeonResponse.featuredDungeon.activityHash
		);
		return (
			<div className='info'>
				<div className='display-in-row row-right row-margin'>
					<CountdownTimer type='weekly' />
					<CountdownTimer type='daily' />
				</div>
				<div className='display-in-row-wrap dashboard'>
					<div>
						Daily Lost Sector:
						<a href='/daily'>
							<ImageCard
								title={
									this.state.lostSectorResponse
										.currLostSectorName
								}
								imageSrc={lostSectorInfo.image}
								extraImg={getArmorImage(
									this.state.lostSectorResponse.currReward
								)}
							/>
						</a>
					</div>
					<div>
						Weekly Nightfall:
						<a href='/nightfall'>
							<ImageCard
								title={nightfallInfo?.description}
								imageSrc={nightfallInfo?.image}
							/>
						</a>
					</div>
					<div>
						Raid Rotator:
						<a href='/raiddungeon'>
							<ImageCard
								title={raidInfo.name}
								imageSrc={raidInfo.image}
							/>
						</a>
					</div>
					<div>
						Dungeon Rotator:
						<a href='/raiddungeon'>
							<ImageCard
								title={dungeonInfo.name}
								imageSrc={dungeonInfo.image}
							/>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
