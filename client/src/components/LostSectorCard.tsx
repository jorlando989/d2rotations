import React from "react";
import { renderModifiers } from "../services/descriptionRenderer";
import "./styles/component.css";
import "./styles/lostSector.css";

import {
	DestinyActivityDefinition,
	DestinyActivityModifierDefinition,
	DestinyInventoryItemDefinition,
} from "bungie-api-ts/destiny2";
import Card from "react-bootstrap/Card";

type MyProps = {
	type: string;
	lostSectorInfo: DestinyActivityDefinition | undefined;
	lostSectorModifiers:
		| (DestinyActivityModifierDefinition | undefined)[]
		| undefined;
	lostSectorRewards:
		| (DestinyInventoryItemDefinition | undefined)[]
		| undefined;
	lostSectorName: string;
	currReward: string;
};

type MyState = {};

class LostSectorCard extends React.Component<MyProps, MyState> {
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

	render() {
		if (this.props !== null) {
			return (
				<div className='display-in-row'>
					<Card style={{ width: "25rem" }}>
						<Card.Img
							variant='top'
							src={`https://www.bungie.net${this.props.lostSectorInfo?.pgcrImage}`}
						/>
						<Card.Body>
							<Card.Title>
								{this.props.lostSectorName} - {this.props.type}
							</Card.Title>
							<div className='display-in-row-wrap'>
								{renderModifiers(
									this.props
										.lostSectorModifiers as DestinyActivityModifierDefinition[]
								)}
							</div>
							<hr />
							<div>
								<b>Rewards:</b>
								{this.renderRewards(
									this.props
										.lostSectorRewards as DestinyInventoryItemDefinition[],
									this.props.currReward
								)}
							</div>
						</Card.Body>
					</Card>
				</div>
			);
		}
	}
}

export default LostSectorCard;
