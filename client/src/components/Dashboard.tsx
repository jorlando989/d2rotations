import { getActivityDef } from "@d2api/manifest-web";
import React from "react";
import { checkIfActive } from "../services/activeChecker";
import {
	getActivityIcon,
	getActivityImage,
	getArmorImage,
} from "../services/iconRenderer";
import { eventType } from "../typeDefinitions/calendarTypes";
import { terminalOverloadResponse } from "../typeDefinitions/destinationTypes";
import { lostSectorType } from "../typeDefinitions/lostSectors";
import { weeklyNightfallResponse } from "../typeDefinitions/nightfall";
import {
	dungeonResponse,
	raidResponse,
} from "../typeDefinitions/raidDungeonTypes";
import ImageCard from "./Card/ImageCard";
import SeasonCard from "./Card/SeasonCard";
import CountdownTimer from "./CountdownTimer";
import "./styles/component.css";
import "./styles/dashboard.css";

const calendarEvents = require("../data/calendarEvents.json");
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type MyProps = {};

type MyState = {
	lostSectorResponse: lostSectorType;
	nightfallResponse: weeklyNightfallResponse;
	raidResponse: raidResponse;
	dungeonResponse: dungeonResponse;
	terminalOverloadResponse: terminalOverloadResponse;
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
			terminalOverloadResponse: {
				location: "",
				weapon: "",
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

	getTerminalOverloadRotation() {
		fetch(`${API_ENDPOINT}/api/terminal_overload`)
			.then(res => res.json())
			.then(res => this.setState({ terminalOverloadResponse: res }));
	}

	componentDidMount() {
		this.getLostSectors();
		this.getWeeklyNightfallRewards();
		this.getDungeonRotation();
		this.getRaidRotation();
		this.getTerminalOverloadRotation();
	}

	getInfo(hash: number) {
		const activityInfo = getActivityDef(hash);
		return {
			image: activityInfo?.pgcrImage,
			description: activityInfo?.displayProperties.description,
			name: activityInfo?.displayProperties.name,
		};
	}

	parseTerminalOverloadLocation(name: string | undefined) {
		if (name === undefined) return "";

		const location = name.split(": ")[1];
		switch (location) {
			case "ZC":
				return "Zephyr Concourse";
			case "LH":
				return "Liming Harbor";
			case "AP":
				return "Ahimsa Park";
		}
		return name;
	}

	getReputationBonus() {
		const reputationEvent = calendarEvents.events.filter(
			(event: eventType) => {
				return event.title === "Reputation Bonus";
			}
		)[0];

		const activeEvent = reputationEvent.time.filter((time: String) => {
			return checkIfActive(reputationEvent.title, time);
		})[0];

		const activeTitle = activeEvent.split(":")[0];

		return {
			title: activeTitle,
			iconImg: "https://bungie.net" + getActivityIcon(activeTitle),
			activityImg: getActivityImage(activeTitle),
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
		const terminalOverloadInfo = this.getInfo(
			Number(this.state.terminalOverloadResponse.location)
		);
		const reputationBonusInfo = this.getReputationBonus();
		console.log(reputationBonusInfo);
		return (
			<div className='info'>
				<SeasonCard />
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
								extraImgClasses='armorIcon'
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
								title={raidInfo.name?.split(":")[0]}
								imageSrc={raidInfo.image}
							/>
						</a>
					</div>
					<div>
						Dungeon Rotator:
						<a href='/raiddungeon'>
							<ImageCard
								title={dungeonInfo.name?.split(":")[0]}
								imageSrc={dungeonInfo.image}
							/>
						</a>
					</div>
					<div>
						Terminal Overload:
						<a href='/daily'>
							<ImageCard
								title={this.parseTerminalOverloadLocation(
									terminalOverloadInfo.name
								)}
								imageSrc={terminalOverloadInfo.image}
							/>
						</a>
					</div>
					<div>
						Reputation Bonus:
						<a href='/calendar'>
							<ImageCard
								title={reputationBonusInfo.title}
								imageSrc={reputationBonusInfo.activityImg}
								extraImg={reputationBonusInfo.iconImg}
							/>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
