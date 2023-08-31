export type terminalOverloadResponse = {
	location: string;
	weapon: string;
};

export type exoticMissionResponse = {
	featuredMission: {normal: number, legend: number},
	rotation: string[]
}

export type dreamingCityResponse = {
	curseWeek: {
		strength: string;
		petraLocation: string;
	};
	ascendantChallenge: {
		currAscendantChallengeInfo: { challengeName: string };
		currAscendantChallenge: string;
	};
};