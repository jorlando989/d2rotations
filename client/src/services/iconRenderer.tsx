import {
	getBreakerTypeDef,
	getDamageTypeDef,
	getInventoryItemDef,
} from "@d2api/manifest-web";

export function renderDamageIcons(description: string) {
	const splitDesc = description.split(" ");

	const voidType = getDamageTypeDef(3454344768);
	const solarType = getDamageTypeDef(1847026933);
	const arcType = getDamageTypeDef(2303181850);
	const kineticType = getDamageTypeDef(3373582085);
	const stasisType = getDamageTypeDef(151347233);
	const strandType = getDamageTypeDef(3949783978);

	const renderedDesc = splitDesc.map(part => {
		switch (part) {
			case "[Solar]":
				return (
					<img
						key='solarIcon'
						className='smallIcon'
						src={`https://www.bungie.net${solarType?.displayProperties.icon}`}
						alt='solar element icon'
					/>
				);
			case "[Void]":
				return (
					<img
						key='voidIcon'
						className='smallIcon'
						src={`https://www.bungie.net${voidType?.displayProperties.icon}`}
						alt='void element icon'
					/>
				);
			case "[Arc]":
				return (
					<img
						key='arcIcon'
						className='smallIcon'
						src={`https://www.bungie.net${arcType?.displayProperties.icon}`}
						alt='arc element icon'
					/>
				);
			case "[Stasis]":
				return (
					<img
						key='stasisIcon'
						className='smallIcon'
						src={`https://www.bungie.net${stasisType?.displayProperties.icon}`}
						alt='stasis element icon'
					/>
				);
			case "[Strand]":
				return (
					<img
						key='strandIcon'
						className='smallIcon'
						src={`https://www.bungie.net${strandType?.displayProperties.icon}`}
						alt='strand element icon'
					/>
				);
			case "[Kinetic]":
				return (
					<img
						key='kineticIcon'
						className='smallIcon'
						src={`https://www.bungie.net${kineticType?.displayProperties.icon}`}
						alt='kinetic element icon'
					/>
				);
			default:
				return " " + part + " ";
		}
	});
	return renderedDesc;
}

export function renderBreakerIcons(description: string) {
	const splitDesc = description.split(" ");

	const shieldPiercing = getBreakerTypeDef(485622768);
	const disruption = getBreakerTypeDef(2611060930);
	const stagger = getBreakerTypeDef(3178805705);

	const renderedDesc = splitDesc.map(part => {
		switch (part) {
			case "[Shield-Piercing]":
				return (
					<img
						key='shieldPiercingIcon'
						className='smallIcon'
						src={`https://www.bungie.net${shieldPiercing?.displayProperties.icon}`}
						alt='anti-barrier icon'
					/>
				);
			case "[Disruption]":
				return (
					<img
						key='disruptionIcon'
						className='smallIcon'
						src={`https://www.bungie.net${disruption?.displayProperties.icon}`}
						alt='overload icon'
					/>
				);
			case "[Stagger]":
				return (
					<img
						key='staggerIcon'
						className='smallIcon'
						src={`https://www.bungie.net${stagger?.displayProperties.icon}`}
						alt='unstoppable icon'
					/>
				);
			default:
				return " " + part + " ";
		}
	});
	return renderedDesc;
}

export function getItemImage(itemHash: number) {
	const itemInfo = getInventoryItemDef(itemHash);
	return itemInfo?.displayProperties.icon;
}

export function getArmorImage(name: string) {
	switch (name) {
		case "Legs":
			return "./icons/boots.svg";
		case "Head":
			return "./icons/helmet.svg";
		case "Chest":
			return "./icons/chest.svg";
		case "Arms":
			return "./icons/gloves.svg";
	}
}

export function getNightfallLevelIcon(name: string) {
	switch (name) {
		case "Nightfall: Hero":
			return "/common/destiny2_content/icons/e8848ef24b4bf60370c71eac4d5cd94d.png";
		case "Nightfall: Legend":
			return "/common/destiny2_content/icons/45f40693f3014d50ea78d5f3f8fe2e04.png";
		case "Nightfall: Master":
			return "/common/destiny2_content/icons/05546f508343b402f6499fee3b29ed5c.png";
		case "Nightfall: Grandmaster":
			return "/common/destiny2_content/icons/11d1851959f173b417cccb8be23719d2.png";
	}
}

export function getCalendarIcon(name: string) {
	switch (name) {
		case "Iron Banner":
			return "/common/destiny2_content/icons/DestinyActivityModeDefinition_fe57052d7cf971f7502daa75a2ca2437.png";
		case "Trials of Osiris":
			return "/common/destiny2_content/icons/DestinyActivityModeDefinition_e35792b49b249ca5dcdb1e7657ca42b6.png"
		case "Grandmaster Nightfalls":
			return "/common/destiny2_content/icons/11d1851959f173b417cccb8be23719d2.png";
		case "Guardian Games":
			return "/common/destiny2_content/icons/3ced9acee3e24b777f57c95c07efa0f2.png";
		case "Root of Nightmares Raid":
			return "/common/destiny2_content/icons/9694158ef08d416ab091062629b6b7ec.png";
	}
}
