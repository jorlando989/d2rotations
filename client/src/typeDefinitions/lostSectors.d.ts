import { DestinyInventoryItemDefinition } from 'bungie-api-ts';

type lostSectorHashesType = {
    master: number,
    legend: number
}

export type lostSectorType = {
    currLostSectorName: string,
    currLostSectorHashes: lostSectorHashesType,
    currReward: string,
    lostSectorRotation: string[]
}

export type lostSectorInfoType = {

}