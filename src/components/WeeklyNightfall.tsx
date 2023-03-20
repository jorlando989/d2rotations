import {
    getActivityDef,
    getActivityModifierDef,
    getInventoryItemDef
} from "@d2api/manifest-web";
import React from "react";
import { renderModifiers, renderRewards } from "../services/descriptionRenderer";
import {
    nightfallLevelsInfoType,
    weeklyNightfallResponse,
    weaponInfoType
} from "../typeDefinitions/nightfall";
import "./styles/component.css";

import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

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
                weaponsRotation: [{itemHash: -1, adeptItemHash: -1}],
                currWeapon: ""
			},
		};
	}

	getWeeklyNightfallRewards() {
		fetch("http://localhost:5000/api/weekly_nightfall")
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
				if (activityInfo == undefined) return;

				//get modifier info
				const modifiersInfo = activity.modifierHashes.map(modifier => {
					const modifierInfo = getActivityModifierDef(modifier);
					return modifierInfo;
				});
				const filteredModifierInfo = modifiersInfo.filter(mod => {
					return (
						mod !== undefined && mod.displayProperties.name != ""
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
        const weaponsInfo = this.state.apiResponse.weaponsRotation.map(weapon => {
			const itemInfo = getInventoryItemDef(weapon.itemHash);
			const adeptItemInfo = getInventoryItemDef(weapon.adeptItemHash);
			return {
				itemInfo,
				adeptItemInfo
			}
		});
        return weaponsInfo;
    }

	renderNightfallLevelsCategories(
		nightfallLevels: nightfallLevelsInfoType[]
	) {
		return nightfallLevels.map(level => {
			if (level == undefined) return;
			return (
				<Nav.Item key={level.activityInfo.hash} className='pill'>
					<Nav.Link
						eventKey={level.activityInfo.displayProperties.name}
						className='pillLink'
					>
						{level.activityInfo.displayProperties.name}
					</Nav.Link>
				</Nav.Item>
			);
		});
	}

	renderNightfallLevelsforCategory(nightfallLevels: nightfallLevelsInfoType[]) {
		return nightfallLevels.map(level => {
			if (level == undefined || level.modifiersInfo == undefined) return;
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
        if (weaponsInfo === undefined) return <div>error loading nightfall weapons</div>;
		return weaponsInfo.map(weapon => {
            if (weapon === undefined || weapon.itemInfo === undefined || weapon.adeptItemInfo == undefined) return <div>error loading nightfall weapon</div>;
            let classes = "display-in-row center-vertical";
            let item = weapon.itemInfo;
            if (weapon.itemInfo.displayProperties.name === this.state.apiResponse.currWeapon) {
                classes = classes.concat(" highlight");
                item = weapon.adeptItemInfo;
            }
            return (
                <div key={item.hash}>
                    <div className={classes}>
                        <img src={`https://www.bungie.net${item.displayProperties.icon}`} className='weaponIcon' alt='weapon icon'/>
                        {item.displayProperties.name}
                    </div>
                </div>
            );
        });
	}

	render() {
		if (this.state !== null && this.state.apiResponse !== undefined) {
			const nightfallLevels: nightfallLevelsInfoType[] | undefined = this.getNightfallLevelsInfo();
            const weaponsInfo = this.getNightfallWeaponInfo();
			if (nightfallLevels == undefined || nightfallLevels[0] == undefined) {
				return <div>error loading nightfall rotation</div>;
            }
			return (
				<div className='display-in-row'>
					<div className='rounded-corners ml5 mr5 rotationTable2 width60'>
						<div className='ml5 bg-teal pb5'>
							<h3>
								{nightfallLevels[0].activityInfo.displayProperties.description}
							</h3>
						</div>
						<div className='tabsTable'>
							<Tab.Container
								id='left-tabs-example'
								defaultActiveKey='Nightfall: Hero'
							>
								<Row>
									<Col sm={3}>
										<Nav
											variant='pills'
											className='flex-column'
										>
											{this.renderNightfallLevelsCategories(
												nightfallLevels
											)}
										</Nav>
									</Col>
									<Col sm={9}>
										<Tab.Content>
											{this.renderNightfallLevelsforCategory(
												nightfallLevels
											)}
										</Tab.Content>
									</Col>
								</Row>
							</Tab.Container>
						</div>
					</div>
					<div className='rotationTable1'>
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