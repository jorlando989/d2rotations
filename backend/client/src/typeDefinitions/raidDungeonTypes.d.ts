import { DestinyActivityDefinition, DestinyActivityModifierDefinition } from 'bungie-api-ts';

export type rotatorType = {
    rotatorInfo: DestinyActivityDefinition,
    masterInfo: DestinyActivityDefinition,
    rotation: DestinyActivityDefinition[] | undefined,
    challenges: DestinyActivityModifierDefinition[] | null | undefined,
    masterModifiers: DestinyActivityModifierDefinition[] | undefined
} | undefined;

type featuredType = {
	milestoneHash: number;
	activityHash: number;
	masterActivityHash: number;
};

export type raidResponse = {
	featuredRaid: featuredType;
	raidRotation: DestinyActivityDefinition[];
};

export type dungeonResponse  = {
    featuredDungeon: featuredType;
	dungeonRotation: DestinyActivityDefinition[];
}