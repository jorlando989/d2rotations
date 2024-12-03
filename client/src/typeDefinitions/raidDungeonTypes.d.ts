import { DestinyActivityDefinition, DestinyActivityModifierDefinition } from 'bungie-api-ts';

export type rotatorType = {
    rotatorInfo: DestinyActivityDefinition,
    masterInfo: DestinyActivityDefinition | null,
    rotation: DestinyActivityDefinition[] | undefined,
    challenges: DestinyActivityModifierDefinition[] | null | undefined,
    masterModifiers: DestinyActivityModifierDefinition[] | null | undefined
} | undefined;

type featuredType = {
	milestoneHash: number;
	activityHash: number;
	masterActivityHash: number;
};

export type raidResponse = {
	featuredRaid: featuredType;
    featuredRaid2: featuredType;
	raidRotation: DestinyActivityDefinition[];
};

export type dungeonResponse  = {
    featuredDungeon: featuredType;
    featuredDungeon2: featuredType;
	dungeonRotation: DestinyActivityDefinition[];
}