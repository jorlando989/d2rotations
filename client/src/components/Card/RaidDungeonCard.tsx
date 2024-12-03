import { getActivityDef, getActivityModifierDef } from "@d2api/manifest-web";
import React from "react";
import {
	dungeonResponse,
	featuredType,
	raidResponse,
	rotatorType
} from "../../typeDefinitions/raidDungeonTypes";
import "../styles/component.css";

import {
	DestinyActivityDefinition,
	DestinyActivityModifierDefinition
} from "bungie-api-ts/destiny2";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { renderModifiers } from "../../services/descriptionRenderer";
import LargeImageCard from "./LargeImageCard";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type MyProps = {
	type: string;
};

type MyState = {
	raidApiResponse: raidResponse;
	dungeonApiResponse: dungeonResponse;
};

class RaidDungeonCard extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			raidApiResponse: {
				featuredRaid: {
					milestoneHash: -1,
					activityHash: -1,
					masterActivityHash: -1,
				},
				featuredRaid2: {
					milestoneHash: -1,
					activityHash: -1,
					masterActivityHash: -1,
				},
				raidRotation: [],
			},
			dungeonApiResponse: {
				featuredDungeon: {
					milestoneHash: -1,
					activityHash: -1,
					masterActivityHash: -1,
				},
				featuredDungeon2: {
					milestoneHash: -1,
					activityHash: -1,
					masterActivityHash: -1,
				},
				dungeonRotation: [],
			},
		};
	}

	getRaidRotation() {
		fetch(`${API_ENDPOINT}/api/raid_rotation`)
			.then(res => res.json())
			.then(res => this.setState({ raidApiResponse: res }));
	}

	getDungeonRotation() {
		fetch(`${API_ENDPOINT}/api/dungeon_rotation`)
			.then(res => res.json())
			.then(res => this.setState({ dungeonApiResponse: res }));
	}

	componentDidMount() {
		if (this.props.type === "raid") this.getRaidRotation();
		else if (this.props.type === "dungeon") this.getDungeonRotation();
	}

	getRaidInfo(featuredRaid: featuredType) {
		const raidInfo = getActivityDef(featuredRaid.activityHash);
		if (raidInfo === undefined) return;

		let masterInfo;
		let masterModifiers;
		if (featuredRaid.masterActivityHash == null) {
			masterInfo = null;
			masterModifiers = null;
		} else if (featuredRaid.masterActivityHash) {
			masterInfo = getActivityDef(featuredRaid.masterActivityHash);
			if (masterInfo === undefined) return;
			masterModifiers = masterInfo.modifiers
				.map(modifier => {
					const modInfo = getActivityModifierDef(
						modifier.activityModifierHash
					);
					return modInfo;
				})
				.filter(mod => {
					return (
						mod !== undefined && mod.displayProperties.name !== ""
					);
				});
		}

		const rotation = this.state.raidApiResponse.raidRotation.map(raid => {
			const raidData = getActivityDef(raid.activityHash);
			return raidData;
		});

		const challenges = raidInfo.modifiers
			.map(modifier => {
				const modifierInfo = getActivityModifierDef(
					modifier.activityModifierHash
				);
				return modifierInfo;
			})
			.filter(mod => {
				return (
					mod !== undefined &&
					mod.displayProperties.name !== "Contest Mode" &&
					mod.displayProperties.name !== ""
				);
			});

		return {
			rotatorInfo: raidInfo,
			masterInfo,
			rotation,
			challenges,
			masterModifiers
		};
	}

	getDungeonInfo(featuredDungeon: featuredType) {
		const dungeonInfo = getActivityDef(featuredDungeon.activityHash);
		if (dungeonInfo === undefined) return;

		let masterInfo;
		let masterModifiers;
		if (featuredDungeon.masterActivityHash == null) {
			masterInfo = null;
			masterModifiers = null;
		} else if (featuredDungeon.masterActivityHash) {
			masterInfo = getActivityDef(featuredDungeon.masterActivityHash);
			if (masterInfo === undefined) return;
			masterModifiers = masterInfo.modifiers
				.map(modifier => {
					const modInfo = getActivityModifierDef(
						modifier.activityModifierHash
					);
					return modInfo;
				})
				.filter(mod => {
					return (
						mod !== undefined && mod.displayProperties.name !== ""
					);
				});
		}

		const rotation = this.state.dungeonApiResponse.dungeonRotation.map(
			dungeon => {
				const dungeonData = getActivityDef(dungeon.activityHash);
				return dungeonData;
			}
		);

		return {
			rotatorInfo: dungeonInfo,
			masterInfo,
			challenges: null,
			rotation,
			masterModifiers,
		};
	}

	renderChallenges(
		challenges: DestinyActivityModifierDefinition[] | null | undefined
	) {
		if (challenges) {
			return (
				<div className="dark-background p5">
					<span className='subTitle'>
						<u>Challenges:</u>
					</span>
					<div className='display-in-row-wrap'>
						{challenges.map(challenge => {
							return (
								<div key={challenge.hash}>
									<OverlayTrigger
										key={challenge.hash}
										placement='top'
										overlay={
											<Tooltip id='challenge description'>
												<b>
													{
														challenge
															.displayProperties
															.name
													}
												</b>
												<hr />
												{
													challenge.displayProperties
														.description
												}
											</Tooltip>
										}
									>
										<img
											src={`https://www.bungie.net${challenge.displayProperties.icon}`}
											className='rewardIcon'
											alt='challenge icon'
										/>
									</OverlayTrigger>
								</div>
							);
						})}
					</div>
				</div>
			);
		} else if (challenges !== null) {
			return <div>error loading raid challenges</div>;
		}
	}

	renderMaster(
		masterModifiers: DestinyActivityModifierDefinition[] | null | undefined
	) {
		if (masterModifiers) {
			return (
				<div className="dark-background p5">
					<span className='subTitle'>
						<u>Master Modifiers:</u>
					</span>
					<div className='display-in-row-wrap'>
						{renderModifiers(masterModifiers)}
					</div>
				</div>
			);
		}
	}

	renderRotation(
		rotation: DestinyActivityDefinition[] | undefined,
		current: string,
		current2: string,
		type: string
	) {
		if (rotation) {
			let iconImage: string = "";
			if (type === "Dungeon") {
				iconImage =
					"/common/destiny2_content/icons/DestinyMilestoneDefinition_7b2e832d6fa3513b3c3e55f69aaeee40.png";
			}
			return rotation.map(rotator => {
				if (rotator === undefined) return null;
				let classes =
					"display-in-row center center-vertical pr5";
				if (rotator.displayProperties.name === current || rotator.displayProperties.name === current2) {
					classes = classes.concat(" highlight");
				}
				if (iconImage === "") {
					iconImage = rotator.displayProperties.icon;
				}
				return (
					<div key={rotator.hash} className={classes}>
						<img
							src={`https://www.bungie.net${iconImage}`}
							className='weaponIcon darkBgIcon'
							alt='weapon icon'
						/>
						{rotator.originalDisplayProperties.name}
					</div>
				);
			});
		}
	}

	renderRotator(rotator: rotatorType, rotator2: rotatorType, type: string) {
		if (rotator === undefined || rotator2 === undefined) return <div>error loading rotator</div>;
		return (
			<div className='ml5 mr5 raidDungeonCard'>
				<LargeImageCard
					title={
						rotator.rotatorInfo.displayProperties.name.split(":")[0]
					}
					imageSrc={rotator.rotatorInfo.pgcrImage}
					withFooter={true}
				>
					<div className='overflowAuto'>
						{this.renderChallenges(rotator.challenges)}
						{this.renderMaster(rotator.masterModifiers)}
					</div>
				</LargeImageCard>
				<LargeImageCard
					title={
						rotator2.rotatorInfo.displayProperties.name.split(":")[0]
					}
					imageSrc={rotator2.rotatorInfo.pgcrImage}
					withFooter={true}
				>
					<div className='overflowAuto'>
						{this.renderChallenges(rotator2.challenges)}
						{this.renderMaster(rotator2.masterModifiers)}
					</div>
				</LargeImageCard>
				<div className='display-in-row-wrap rotationBox'>
					{this.renderRotation(
						rotator.rotation,
						rotator.rotatorInfo.displayProperties.name,
						rotator2.rotatorInfo.displayProperties.name,
						type
					)}
				</div>
			</div>
		);
	}

	render() {
		if (this.state !== null) {
			if (
				this.props.type === "raid" &&
				this.state.raidApiResponse !== null &&
				this.state.raidApiResponse.featuredRaid.activityHash !== -1
			) {
				const raidInfo = this.getRaidInfo(this.state.raidApiResponse.featuredRaid);
				const raidInfo2 = this.getRaidInfo(this.state.raidApiResponse.featuredRaid2);
				if (raidInfo === undefined || raidInfo2 === undefined)
					return <div>error loading raid rotator </div>;
				return <div>{this.renderRotator(raidInfo, raidInfo2, "raid")}</div>;
			} else if (
				this.props.type === "dungeon" &&
				this.state.dungeonApiResponse !== null &&
				this.state.dungeonApiResponse.featuredDungeon.activityHash !==
					-1
			) {
				const dungeonInfo = this.getDungeonInfo(this.state.dungeonApiResponse.featuredDungeon);
				const dungeonInfo2 = this.getDungeonInfo(this.state.dungeonApiResponse.featuredDungeon2);
				if (dungeonInfo === undefined)
					return <div>error loading dungeon rotator </div>;
				return <div>{this.renderRotator(dungeonInfo, dungeonInfo2, "Dungeon")}</div>;
			}
		} else {
			return <div>loading...</div>;
		}
	}
}

export default RaidDungeonCard;
