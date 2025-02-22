import {
	DestinyActivityDefinition,
	DestinyActivityModifierDefinition,
	DestinyCollectibleDefinition,
	DestinyInventoryItemDefinition,
} from "bungie-api-ts/destiny2";

type weaponHashType = {
	itemHash: number,
	adeptItemHash: number,
	collectibleHash: number,
	adeptCollectibleHash: number
}

export type weeklyNightfallResponse = {
	nightfallActivities: milestoneActivityType[] | undefined;
	weaponsRotation: weaponHashType[];
	currWeapon: string;
};

export type milestoneActivityType = {
	activityHash: number;
	challengeObjectiveHashes: number[];
	modifierHashes: number[];
	booleanActivityOptions: {};
};

export type nightfallLevelsInfoType =
	| {
			activityInfo: DestinyActivityDefinition;
			modifiersInfo: (DestinyActivityModifierDefinition | undefined)[];
			rewardsInfo: (DestinyInventoryItemDefinition | undefined)[];
	  }
	| undefined;

export type weaponInfoType = {
	itemInfo: DestinyCollectibleDefinition | undefined,
	adeptItemInfo: DestinyCollectibleDefinition | undefined
} | undefined;