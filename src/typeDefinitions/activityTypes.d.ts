import { DestinyActivityDefinition} from "bungie-api-ts";
import { milestoneActivityType } from "./nightfall";

export type nightmareHuntResponse = {
    hunts: number[]
}

export type cruciblePlaylistResponse = {
    playlists: milestoneActivityType[]
}