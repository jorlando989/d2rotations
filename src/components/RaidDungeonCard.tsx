import { getActivityDef, getActivityModifierDef } from "@d2api/manifest-web";
import React from "react";
import {
	dungeonResponse,
	raidResponse,
	rotatorType
} from "../typeDefinitions/raidDungeonTypes";
import "./styles/component.css";

import {
	DestinyActivityDefinition,
	DestinyActivityModifierDefinition
} from "bungie-api-ts/destiny2";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { renderModifiers } from "../services/descriptionRenderer";

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
				raidRotation: [],
			},
			dungeonApiResponse: {
				featuredDungeon: {
					milestoneHash: -1,
					activityHash: -1,
					masterActivityHash: -1,
				},
				dungeonRotation: [],
			},
		};
	}

	getRaidRotation() {
		fetch("http://localhost:5000/api/raid_rotation")
			.then(res => res.json())
			.then(res => this.setState({ raidApiResponse: res }));
	}

	getDungeonRotation() {
		fetch("http://localhost:5000/api/dungeon_rotation")
			.then(res => res.json())
			.then(res => this.setState({ dungeonApiResponse: res }));
	}

	componentDidMount() {
		if (this.props.type === "raid") this.getRaidRotation();
		else if (this.props.type === "dungeon") this.getDungeonRotation();
	}

	getRaidInfo() {
		const featuredRaid = this.state.raidApiResponse.featuredRaid;
		const raidInfo = getActivityDef(featuredRaid.activityHash);
		if (raidInfo === undefined) return;

		let masterInfo;
		let masterModifiers;
		if (featuredRaid.masterActivityHash) {
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
			masterModifiers,
		};
	}

	getDungeonInfo() {
		const featuredDungeon = this.state.dungeonApiResponse.featuredDungeon;
		const dungeonInfo = getActivityDef(featuredDungeon.activityHash);
		if (dungeonInfo === undefined) return;

		let masterInfo;
		let masterModifiers;
		if (featuredDungeon.masterActivityHash) {
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
				<div>
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
		masterInfo: DestinyActivityDefinition,
		masterModifiers: DestinyActivityModifierDefinition[] | undefined
	) {
		if (masterInfo && masterModifiers) {
			return (
				<Card style={{ width: "25rem" }}>
					<Card.Img
						variant='top'
						src={`https://www.bungie.net${masterInfo.pgcrImage}`}
					/>
					<Card.Body>
						<Card.Title>
							{masterInfo.displayProperties.name}
						</Card.Title>
						<div className='display-in-row'>
							{renderModifiers(masterModifiers)}
						</div>
					</Card.Body>
				</Card>
			);
		} else {
			return <div>error loading modifiers</div>;
		}
	}

	renderRotation(
		rotation: DestinyActivityDefinition[] | undefined,
		current: string,
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
				let classes = "display-in-row center-vertical";
				if (rotator.displayProperties.name === current) {
					classes = classes.concat(" highlight");
				}
				if (iconImage === "") {
					iconImage = rotator.displayProperties.icon;
				}
				return (
					<div key={rotator.hash}>
						<div className={classes}>
							<img
								src={`https://www.bungie.net${iconImage}`}
								className='weaponIcon darkBgIcon'
								alt='weapon icon'
							/>
							{rotator.originalDisplayProperties.name}
						</div>
					</div>
				);
			});
		}
	}

	renderRotator(rotator: rotatorType, type: string) {
		if (rotator === undefined) return <div>error loading rotator</div>;
		return (
			<div className='display-in-row'>
				<div className='ml5 mr5 rotationTable2'>
					<div className='display-in-row'>
						<div key={rotator.rotatorInfo.hash}>
							<Card style={{ width: "25rem" }}>
								<Card.Img
									variant='top'
									src={`https://www.bungie.net${rotator.rotatorInfo.pgcrImage}`}
								/>
								<Card.Body>
									<Card.Title>
										{
											rotator.rotatorInfo
												.displayProperties.name
										}
									</Card.Title>
									{this.renderChallenges(rotator.challenges)}
								</Card.Body>
							</Card>
						</div>
						<div>
							{this.renderMaster(
								rotator.masterInfo,
								rotator.masterModifiers
							)}
						</div>
					</div>
				</div>
				<div className='rotationTable1'>
					<h4>
						Featured {type.charAt(0).toUpperCase() + type.slice(1)} Rotation
					</h4>
					<hr />
					<div>
						{this.renderRotation(
							rotator.rotation,
							rotator.rotatorInfo.displayProperties.name,
							type
						)}
					</div>
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
				const raidInfo = this.getRaidInfo();
				if (raidInfo === undefined)
					return <div>error loading raid rotator </div>;
				return <div>{this.renderRotator(raidInfo, "raid")}</div>;
			} else if (
				this.props.type === "dungeon" &&
				this.state.dungeonApiResponse !== null &&
				this.state.dungeonApiResponse.featuredDungeon.activityHash !== -1
			) {
				const dungeonInfo = this.getDungeonInfo();
				if (dungeonInfo === undefined)
					return <div>error loading dungeon rotator </div>;
				return <div>{this.renderRotator(dungeonInfo, "Dungeon")}</div>;
			}
		} else {
			return <div>loading...</div>;
		}
	}
}

export default RaidDungeonCard;
