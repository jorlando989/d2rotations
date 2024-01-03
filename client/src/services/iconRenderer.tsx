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
			return "/common/destiny2_content/icons/DestinyActivityModeDefinition_e35792b49b249ca5dcdb1e7657ca42b6.png";
		case "Grandmaster Nightfalls":
			return "/common/destiny2_content/icons/87271a86b4542822aad73d8f0f56d4cb.png";
		case "Guardian Games":
			return "/common/destiny2_content/icons/3ced9acee3e24b777f57c95c07efa0f2.png";
		case "Reputation Bonus":
			return "/common/destiny2_content/icons/406c1a5917cb2eb5c59ca0b8e43de411.png";
		case "Solstice": 
			return "/common/destiny2_content/icons/39300324430f597dc9356fa5e10b6837.png";
		case "Festival of the Lost":
			return "/common/destiny2_content/icons/DestinyEventCardDefinition_1a1e3f8074c98241af80f4bee77084c3.png";
		case "The Dawning":
			return "/common/destiny2_content/icons/03c5f9c90c1295c9233a92d8ea8689db.png";
		case "Warlord's Ruin":
			return "/common/destiny2_content/icons/DestinyMilestoneDefinition_7b2e832d6fa3513b3c3e55f69aaeee40.png";
		case "Crucible Labs":
			return "/common/destiny2_content/icons/DestinyMilestoneDefinition_6e3e2457fd1f7a9df5c491213bcaf133.png";
	}
}

export function renderIconWithWatermark(
	iconImg: string,
	watermarkImg: string,
	size: number
) {
	return (
		<div
			className='rewardContainer mr5'
			style={{ height: `${size}px`, width: `${size}px` }}
		>
			<div
				className='rewardItem p5'
				style={{
					backgroundImage: `url(https://www.bungie.net${iconImg})`,
				}}
			></div>
			<div
				className='rewardWatermark p5'
				style={{
					backgroundImage: `url(https://www.bungie.net${watermarkImg})`,
				}}
			></div>
		</div>
	);
}

export function getActivityIcon(name: String) {
	let imgSrc = "";
	switch (name) {
		case "Double Nightfall Rewards":
			imgSrc =
				"/common/destiny2_content/icons/3642cf9e2acd174dcab5b5f9e3a3a45d.png";
			break;
		case "Crucible":
			imgSrc =
				"/common/destiny2_content/icons/DestinyActivityModeDefinition_fb3e9149c43f7a2e8f8b66cbea7845fe.png";
			break;
		case "Gambit":
			imgSrc =
				"/common/destiny2_content/icons/DestinyActivityModeDefinition_96f7e9009d4f26e30cfd60564021925e.png";
			break;
		case "Vanguard":
			imgSrc =
				"/common/destiny2_content/icons/3642cf9e2acd174dcab5b5f9e3a3a45d.png";
			break;
		case "Trials":
			imgSrc =
				"/common/destiny2_content/icons/DestinyActivityModeDefinition_e35792b49b249ca5dcdb1e7657ca42b6.png";
			break;
		default:
			imgSrc =
				"/common/destiny2_content/icons/406c1a5917cb2eb5c59ca0b8e43de411.png";
	}
	return imgSrc;
}

export function getActivityImage(name: String) {
	let imgSrc = "";
	switch (name) {
		case "Double Nightfall Rewards":
			imgSrc =
				"/common/destiny2_content/icons/0a599ca6fad56a014f14475b73a6a1d8.jpg";
			break;
		case "Crucible":
			imgSrc =
				"/common/destiny2_content/icons/5f75861207ce50620ecd9b71e46611ca.jpg";
			break;
		case "Gambit":
			imgSrc =
				"/common/destiny2_content/icons/15019dda029a1e4a7d6399eb7486854c.jpg";
			break;
		case "Vanguard":
			imgSrc =
				"/common/destiny2_content/icons/0a599ca6fad56a014f14475b73a6a1d8.jpg";
			break;
		case "Trials":
			imgSrc =
				"/common/destiny2_content/icons/d1b03d37c680a09753ceb9f49a37891c.jpg";
			break;
		default:
			imgSrc =
				"/img/destiny_content/pgcr/social_traveler.jpg";
	}
	return imgSrc;
}

export function renderReputationIcon(eventTime: String) {
	const eventTitle = eventTime.split(":")[0];
	let imgSrc = getActivityIcon(eventTitle);
	console.log(eventTitle + " " + imgSrc);
	return <img src={`https://bungie.net${imgSrc}`} className='rewardIcon' />;
}
