import React, { FC } from "react";
import "./styles/component.css";
import "./styles/lostSector.css";
import { lostSectorType } from "../typeDefinitions/lostSectors";
import {
	getActivityDef,
	getActivityModifierDef,
	getInventoryItemDef,
} from "@d2api/manifest-web";
import { renderModifiers } from "../services/descriptionRenderer";

import Card from "react-bootstrap/Card";
import {
	DestinyActivityModifierDefinition,
	DestinyInventoryItemDefinition,
} from "bungie-api-ts/destiny2";

type MyProps = {};

type MyState = {
	apiResponse: lostSectorType;
};

class LostSectorRotation extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: {
				currLostSectorName: "",
				currLostSectorHashes: { master: -1, legend: -1 },
				currReward: "",
				lostSectorRotation: [],
			},
		};
	}

	getLostSectors() {
		fetch("http://localhost:5000/api/lost_sector")
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getLostSectors();
	}

	renderLostSectorRotation() {
		return this.state.apiResponse.lostSectorRotation.map(lostSectorName => {
			let classes = "display-in-row center-vertical";
			if (lostSectorName === this.state.apiResponse.currLostSectorName) {
				classes = classes.concat(" highlight");
			}
			return (
				<div key={lostSectorName}>
					<div className={classes}>{lostSectorName}</div>
				</div>
			);
		});
	}

	getRewards() {
		const masterInfo = getActivityDef(
			this.state.apiResponse.currLostSectorHashes.master
		);
		const legendInfo = getActivityDef(
			this.state.apiResponse.currLostSectorHashes.legend
		);

		//get master info
		let filteredMasterModifiers, masterRewards;
		if (masterInfo) {
			const masterModifiers = masterInfo.modifiers.map(
				({ activityModifierHash }) => {
					const modifierInfo =
						getActivityModifierDef(activityModifierHash);
					return modifierInfo;
				}
			);
			//filter hidden modifiers
			filteredMasterModifiers = masterModifiers.filter(mod => {
				if (mod === undefined) return;
				return (
					mod.displayInNavMode && mod.displayProperties.name !== ""
				);
			});

			//get reward info
			masterRewards = masterInfo.rewards.map(({ rewardItems }) => {
				const rewardInfo = getInventoryItemDef(rewardItems[0].itemHash);
				return rewardInfo;
			});
		} else {
			console.log("master lost sector not found");
		}

		//get legend info
		let legendRewards, filteredLegendModifiers;
		if (legendInfo) {
			const legendModifiers = legendInfo.modifiers.map(
				({ activityModifierHash }) => {
					const modifierInfo =
						getActivityModifierDef(activityModifierHash);
					return modifierInfo;
				}
			);

			if (legendModifiers) {
				filteredLegendModifiers = legendModifiers.filter(mod => {
					if (mod === undefined) return;
					return (
						mod.displayInNavMode &&
						mod.displayProperties.name !== ""
					);
				});

				//get reward info
				legendRewards = legendInfo.rewards.map(({ rewardItems }) => {
					const rewardInfo = getInventoryItemDef(
						rewardItems[0].itemHash
					);
					return rewardInfo;
				});
			}
		} else {
			console.log("legend lost sector not found");
		}
		return {
			masterInfo,
			legendInfo,
			legendRewards,
			legendModifiers: filteredLegendModifiers,
			masterRewards,
			masterModifiers: filteredMasterModifiers,
		};
	}

	renderRewards(
		rewards: DestinyInventoryItemDefinition[],
		currReward: string
	) {
		if (rewards === undefined) return;
		return rewards.map(reward => {
			if (
				reward.displayProperties.name.includes("Exotic") &&
				!reward.displayProperties.name.includes(currReward)
			) {
				return "";
			}
			return (
				<div key={reward.hash}>
					<img
						src={`https://www.bungie.net${reward.displayProperties.icon}`}
						className='rewardIcon'
						alt='reward icon'
					/>
					{reward.displayProperties.name}
				</div>
			);
		});
	}

	renderLostSectors() {
		const lostSectorsInfo = this.getRewards();
		const lostSectorName = this.state.apiResponse.currLostSectorName;
		const currReward = this.state.apiResponse.currReward;
		return (
			<div className='display-in-row'>
				<Card style={{ width: "25rem" }}>
					<Card.Img
						variant='top'
						src={`https://www.bungie.net${lostSectorsInfo.legendInfo?.pgcrImage}`}
					/>
					<Card.Body>
						<Card.Title>{lostSectorName} - Legend</Card.Title>
						<div className='display-in-row-wrap'>
							{renderModifiers(
								lostSectorsInfo.legendModifiers as DestinyActivityModifierDefinition[]
							)}
						</div>
						<hr />
						<div>
							<b>Rewards:</b>
							{this.renderRewards(
								lostSectorsInfo.legendRewards as DestinyInventoryItemDefinition[],
								currReward
							)}
						</div>
					</Card.Body>
				</Card>
				<Card style={{ width: "25rem" }}>
					<Card.Img
						variant='top'
						src={`https://www.bungie.net${lostSectorsInfo.masterInfo?.pgcrImage}`}
					/>
					<Card.Body>
						<Card.Title>{lostSectorName} - Master</Card.Title>
						<div className='display-in-row-wrap'>
							{renderModifiers(
								lostSectorsInfo.masterModifiers as DestinyActivityModifierDefinition[]
							)}
						</div>
						<hr />
						<div>
							<b>Rewards:</b>
							{this.renderRewards(
								lostSectorsInfo.masterRewards as DestinyInventoryItemDefinition[],
								currReward
							)}
						</div>
					</Card.Body>
				</Card>
			</div>
		);
	}

	render() {
		if (this.state !== null) {
			return (
				<div className='display-in-row'>
					<div className='rotationTable2'>
						{this.renderLostSectors()}
					</div>
					<div className='rotationTable1'>
						<h4>Lost Sector Rotation</h4>
						<hr />
						<div className='ml5'>
							{this.renderLostSectorRotation()}
						</div>
					</div>
				</div>
			);
		}
	}
}

export default LostSectorRotation;