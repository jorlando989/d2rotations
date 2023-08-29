export type terminalOverloadResponse = {
	location: string;
	weapon: string;
};

export type exoticMissionResponse = {
	featuredMission: {normal: number, legend: number},
	rotation: string[]
}