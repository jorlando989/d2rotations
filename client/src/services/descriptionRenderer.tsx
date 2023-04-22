import {
	DestinyActivityModifierDefinition,
	DestinyInventoryItemDefinition,
} from "bungie-api-ts/destiny2";
import {
	renderBreakerIcons,
	renderDamageIcons,
	renderIconWithWatermark,
} from "./iconRenderer";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function renderVar(description: string) {
	const varString = description
		.split(/[{|}]+/g)
		.filter(e => e.includes("var:"));
	console.log(varString);

	let value = "";
	switch (varString[0]) {
		case "var:608648777": //hero
			value = "1765";
			break;
		case "var:1693239810": //legend
			value = "1815";
			break;
		case "var:3875023991": //master
			value = "1820";
			break;
		case "var:1607961440": //grandmaster
			value = "1815";
			break;
		default:
			value = "25";
	}
	const renderedDesc = description.replace(/{var:(?:\d{1,10})}/g, value);
	return renderedDesc;
}

export function renderModifiers(
	modifiers: (DestinyActivityModifierDefinition | undefined)[] | undefined
) {
	if (modifiers === undefined) return;
	return modifiers.map(mod => {
		if (mod === undefined) return null;
		let renderedDescription;
		if (mod.displayProperties.description.includes("{")) {
			renderedDescription = renderVar(mod.displayProperties.description);
		} else {
			renderedDescription = mod.displayProperties.description;
		}

		if (mod.displayProperties.name === "Champion Foes") {
			renderedDescription = renderBreakerIcons(renderedDescription);
		} else if (
			mod.displayProperties.name.includes("Threat") ||
			mod.displayProperties.name.includes("Surge")
		) {
			renderedDescription = renderDamageIcons(renderedDescription);
		} else if (mod.displayProperties.name === "Shielded Foes") {
			renderedDescription = renderDamageIcons(renderedDescription);
		}
		return (
			<div key={mod.hash} className='icon-m5'>
				<OverlayTrigger
					key={mod.hash}
					placement='top'
					overlay={
						<Tooltip id='modifier description'>
							<b>{mod.displayProperties.name}</b>
							<hr />
							{renderedDescription}
						</Tooltip>
					}
				>
					<img
						src={`https://www.bungie.net${mod.displayProperties.icon}`}
						className='rewardIcon'
						alt='mod icon'
					/>
				</OverlayTrigger>
			</div>
		);
	});
}

export function renderRewards(
	rewardsInfo: (DestinyInventoryItemDefinition | undefined)[]
) {
	return rewardsInfo.map(reward => {
		if (reward === undefined) return null;
		if (reward.iconWatermark) {
			return (
				<div className='display-in-row' key={reward.hash}>
					{renderIconWithWatermark(
						reward.displayProperties.icon,
						reward.iconWatermark,
						30
					)}
					{reward.displayProperties.name}
				</div>
			);
		}
		return (
			<div className='display-in-row' key={reward.hash}>
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
