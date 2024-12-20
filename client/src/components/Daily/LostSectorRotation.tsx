import {
	getActivityDef,
	getActivityModifierDef,
	getInventoryItemDef,
} from "@d2api/manifest-web";
import React from "react";
import { lostSectorType } from "../../typeDefinitions/lostSectors";
import "../styles/component.css";
import "../styles/lostSector.css";

import LostSectorCard from "../Card/LostSectorCard";
import { getArmorImage } from "../../services/iconRenderer";
import LargeImageCard from "../Card/LargeImageCard";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

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
				rewardRotation: [],
			},
		};
	}

	getLostSectors() {
		fetch(`${API_ENDPOINT}/api/lost_sector`)
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

	renderRewardRotation() {
		if (this.state.apiResponse.rewardRotation) {
			return this.state.apiResponse.rewardRotation.map(reward => {
				let icon = getArmorImage(reward);
				let rewardClasses = "reward";
				if (reward === this.state.apiResponse.currReward) {
					rewardClasses += " highlight";
				}
				return (
					<div className={rewardClasses}>
						<img
							className='rewardIcon armorIcon'
							src={icon}
							alt='reward icon'
						/>
					</div>
				);
			});
		} else {
			return <div></div>;
		}
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
				if (mod === undefined) return null;
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
					if (mod === undefined) return null;
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

	renderLostSectors() {
		const lostSectorsInfo = this.getRewards();
		const currReward = this.state.apiResponse.currReward;
		return (
			<div className='rounded-corners ml5 mr5 lostSector pb5'>
				<LargeImageCard
					imageSrc={lostSectorsInfo.legendInfo?.pgcrImage}
					title={this.state.apiResponse.currLostSectorName}
				>
					<div className='display-in-row-wrap row-space overflowAuto80'>
						<LostSectorCard
							type='Legend'
							lostSectorInfo={lostSectorsInfo.legendInfo}
							lostSectorModifiers={
								lostSectorsInfo.legendModifiers
							}
							lostSectorRewards={lostSectorsInfo.legendRewards}
							lostSectorName={
								this.state.apiResponse.currLostSectorName
							}
							currReward={currReward}
						/>
						<LostSectorCard
							type='Master'
							lostSectorInfo={lostSectorsInfo.masterInfo}
							lostSectorModifiers={
								lostSectorsInfo.masterModifiers
							}
							lostSectorRewards={lostSectorsInfo.masterRewards}
							lostSectorName={
								this.state.apiResponse.currLostSectorName
							}
							currReward={currReward}
						/>
					</div>
				</LargeImageCard>
			</div>
		);
	}

	render() {
		if (this.state !== null) {
			return (
				<div className='display-in-row'>
					{this.renderLostSectors()}
					<div className=''>
						<h4>Lost Sector Rotation</h4>
						<hr />
						<div className='ml5'>
							{this.renderLostSectorRotation()}
						</div>
						{/* <div className='display-in-row rewardRotation'>
							{this.renderRewardRotation()}
						</div> */}
					</div>
				</div>
			);
		}
	}
}

export default LostSectorRotation;
