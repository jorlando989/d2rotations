import {
	getActivityDef,
	getActivityModifierDef,
	getInventoryItemDef,
} from "@d2api/manifest-web";
import React from "react";
import {
	renderModifiers,
	renderRewards,
} from "../../services/descriptionRenderer";
import {
	nightfallLevelsInfoType,
	weaponInfoType,
	weeklyNightfallResponse,
} from "../../typeDefinitions/nightfall";
import "../styles/component.css";
import "../styles/imagecard.css";
import "../styles/nightfall.css";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LargeImageCard from "../Card/LargeImageCard";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type MyProps = {};

type MyState = {
	apiResponse: weeklyNightfallResponse;
};

class WeeklyNightfall extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: {
				nightfallActivities: undefined,
				weaponsRotation: [{ itemHash: -1, adeptItemHash: -1 }],
				currWeapon: "",
			},
		};
	}

	getWeeklyNightfallRewards() {
		fetch(`${API_ENDPOINT}/api/weekly_nightfall`)
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getWeeklyNightfallRewards();
	}

	getNightfallLevelsInfo() {
		if (this.state.apiResponse.nightfallActivities === undefined) return;
		const nightfallLevels = this.state.apiResponse.nightfallActivities.map(
			activity => {
				const activityInfo = getActivityDef(activity.activityHash);
				if (activityInfo === undefined) return undefined;

				//get modifier info
				const modifiersInfo = activity.modifierHashes.map(modifier => {
					const modifierInfo = getActivityModifierDef(modifier);
					return modifierInfo;
				});
				const filteredModifierInfo = modifiersInfo.filter(mod => {
					return (
						mod !== undefined && mod.displayProperties.name !== ""
					);
				});

				//get rewards info
				const rewardsInfo = activityInfo.rewards[0].rewardItems
					.filter(item => {
						return item !== undefined;
					})
					.map(reward => {
						const rewardInfo = getInventoryItemDef(reward.itemHash);
						return rewardInfo;
					});

				return {
					activityInfo,
					modifiersInfo: filteredModifierInfo,
					rewardsInfo,
				};
			}
		);
		return nightfallLevels;
	}

	getNightfallWeaponInfo() {
		if (this.state.apiResponse.weaponsRotation === undefined) return;
		const weaponsInfo = this.state.apiResponse.weaponsRotation.map(
			weapon => {
				const itemInfo = getInventoryItemDef(weapon.itemHash);
				const adeptItemInfo = getInventoryItemDef(weapon.adeptItemHash);
				return {
					itemInfo,
					adeptItemInfo,
				};
			}
		);
		return weaponsInfo;
	}

	renderNightfallLevelsCategories(
		nightfallLevels: nightfallLevelsInfoType[]
	) {
		return nightfallLevels.map(level => {
			if (level === undefined) return undefined;
			return (
				<Tab
					eventKey={level.activityInfo.displayProperties.name}
					title={level.activityInfo.displayProperties.name.replace(
						"Nightfall: ",
						""
					)}
				></Tab>
			);
		});
	}

	renderNightfallLevelsforCategory(
		nightfallLevels: nightfallLevelsInfoType[]
	) {
		return nightfallLevels.map(level => {
			if (level === undefined || level.modifiersInfo === undefined)
				return undefined;
			return (
				<Tab.Pane
					eventKey={level.activityInfo.displayProperties.name}
					key={level.activityInfo.displayProperties.name}
				>
					<div className='description'>
						<i>
							{
								level.activityInfo
									.selectionScreenDisplayProperties
									.description
							}
						</i>
						<div>
							Modifiers:
							<div className='display-in-row-wrap'>
								{renderModifiers(level.modifiersInfo)}
							</div>
						</div>
						<div>
							Rewards:
							<div>{renderRewards(level.rewardsInfo)}</div>
						</div>
					</div>
				</Tab.Pane>
			);
		});
	}

	renderWeaponRotation(weaponsInfo: weaponInfoType[] | undefined) {
		if (weaponsInfo === undefined)
			return <div>error loading nightfall weapons</div>;
		return weaponsInfo.map(weapon => {
			if (
				weapon === undefined ||
				weapon.itemInfo === undefined ||
				weapon.adeptItemInfo === undefined
			)
				return <div>error loading nightfall weapon</div>;
			let classes = "display-in-row center-vertical";
			let item = weapon.itemInfo;
			if (
				weapon.itemInfo.displayProperties.name ===
				this.state.apiResponse.currWeapon
			) {
				classes = classes.concat(" highlight");
				item = weapon.adeptItemInfo;
			}
			return (
				<div key={item.hash}>
					<div className={classes}>
						<img
							src={`https://www.bungie.net${item.displayProperties.icon}`}
							className='weaponIcon'
							alt='weapon icon'
						/>
						{item.displayProperties.name}
					</div>
				</div>
			);
		});
	}

	renderTable(nightfallLevels: nightfallLevelsInfoType[]) {
		return (
			<Tabs
				defaultActiveKey='Nightfall: Advanced'
				id='nightfall-tabs'
				className='mb-3'
			>
				{this.renderNightfallLevelsCategories(nightfallLevels)}
				{this.renderNightfallLevelsforCategory(nightfallLevels)}
			</Tabs>
		);
	}

	renderNightfallInfo(
		nightfallInfo: nightfallLevelsInfoType,
		nightfallLevels: nightfallLevelsInfoType[]
	) {
		return (
			<LargeImageCard imageSrc={nightfallInfo?.activityInfo.pgcrImage}>
				<div className="overflowAuto">
					<div className='cardTitle largeCardTitle'>
						{
							nightfallInfo?.activityInfo.displayProperties
								.description
						}
					</div>
					<div className='tabsTable'>
						{this.renderTable(nightfallLevels)}
					</div>
				</div>
			</LargeImageCard>
		);
	}

	render() {
		if (this.state !== null && this.state.apiResponse !== undefined) {
			const nightfallLevels: nightfallLevelsInfoType[] | undefined =
				this.getNightfallLevelsInfo();
			const weaponsInfo = this.getNightfallWeaponInfo();
			if (
				nightfallLevels === undefined ||
				nightfallLevels[0] === undefined
			) {
				return <div>error loading nightfall rotation</div>;
			}
			return (
				<div className='display-in-row-wrap'>
					<div className='rounded-corners ml5 mr5 width60 pb5'>
						{this.renderNightfallInfo(
							nightfallLevels[0],
							nightfallLevels
						)}
					</div>
					<div>
						<h4>Nightfall Weapon Rotation</h4>
						<hr />
						<div>{this.renderWeaponRotation(weaponsInfo)}</div>
					</div>
				</div>
			);
		}
	}
}

export default WeeklyNightfall;
