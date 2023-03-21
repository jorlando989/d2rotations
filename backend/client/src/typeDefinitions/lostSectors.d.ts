import {DestinyRewardDefinition, DestinyActivityDefinition, DestinyActivityModifierDefinition, DestinyInventoryItemDefinition, DestinyBreakerTypeDefinition} from 'bungie-api-ts';

type lostSectorHashesType = {
    master: number,
    legend: number
}

export type lostSectorType = {
    currLostSectorName: string,
    currLostSectorHashes: lostSectorHashesType,
    currReward: DestinyRewardDefinition,
    lostSectorRotation: string[]
}