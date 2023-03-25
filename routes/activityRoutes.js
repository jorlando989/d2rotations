const mongoose = require("mongoose");
const keys = require("../config/keys");
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const lostSectorRotation = require("../data/lostSectorRotation.json");
const lostSectorRewardRotation = require("../data/lostSectorRewardRotation.json");
const allLostSectorHashes = require("../data/allLostSectorHashes.json");
const altarsOfSorrowRewardHashes = require("../data/altarsOfSorrowRotation.json");
const wellspringRotationHashes = require("../data/wellspringRotation.json");
const nightfallWeaponsHashes = require("../data/nightfallWeaponsRotation.json");
const nightmareHuntsHashes = require("../data/nightmareHuntsRotation.json");
const empireHuntHashes = require('../data/empireHuntRotation.json');
const dreamingCityHashes = require('../data/dreamingCityRotations.json');
const raidRotationHashes = require('../data/raidRotationHashes.json');
const dungeonRotationHashes = require('../data/dungeonRotationHashes.json');

const LostSectorIndexes = mongoose.model("lostSectorIndex");
const AltarsOfSorrowRotation = mongoose.model("altarsOfSorrowRotation");
const WellspringRotation = mongoose.model("wellspringRotation");
const NightfallWeaponRotation = mongoose.model("nightfallWeaponRotation");
const NightmareHuntsRotation = mongoose.model("nightmareHuntsRotation");
const EmpireHuntRotation = mongoose.model('empireHuntRotation');
const DreamingCityRotations = mongoose.model('dreamingCityRotations');
const RaidAndDungeonRotations = mongoose.model('raidRotation');

module.exports = app => {
	app.get("/api/lost_sector", async (req, res) => {
		//get todays lost sector name
		const currLostSector = await LostSectorIndexes.findOne({
			numLostSectors: 11,
		});

		//get info for lost sector
		const currLostSectorName =
			lostSectorRotation.rotation[currLostSector.currLostSectorIndex];
		const currLostSectorHashes = allLostSectorHashes[currLostSectorName];

		//set curr reward name
		const currReward =
			lostSectorRewardRotation.rotation[
				currLostSector.currLostSectorRewardIndex
			];

		res.send({
			currLostSectorName,
			currLostSectorHashes,
			currReward,
			lostSectorRotation: lostSectorRotation.rotation,
			rewardRotation: lostSectorRewardRotation.rotation
		});
	});

	app.get("/api/altarsOfSorrow", async (req, res) => {
		const altarsOfSorrowDB = await AltarsOfSorrowRotation.findOne({
			altarRewardIndex: { $gte: 0 },
		});

		const currReward =
			altarsOfSorrowRewardHashes.rotation[
				altarsOfSorrowDB.altarRewardIndex
			];
		const currRewardInfo = altarsOfSorrowRewardHashes[currReward];

		res.send({
			currReward,
			currRewardInfo,
		});
	});

	app.get("/api/wellspring", async (req, res) => {
		const wellspringDB = await WellspringRotation.findOne({
			currRotationIndex: { $gte: 0 },
		});

		const currRotation =
			wellspringRotationHashes.rotation[wellspringDB.currRotationIndex];

		const wellspringHashes = wellspringRotationHashes[currRotation];

		res.send({
			bossName: wellspringHashes.bossName,
			activityHash: wellspringHashes.activityHash,
			weaponHash: wellspringHashes.weaponHash,
		});
	});

	// app.get("/api/strike_modifiers", async (req, res) => {
	// 	const response = await fetch(
	// 		"https://www.bungie.net/Platform/Destiny2/Milestones/",
	// 		{
	// 			headers: {
	// 				"X-API-Key": keys.apiKey
	// 			},
	// 		}
	// 	);
	// 	if (response.status === 400 || response.status === 401) {
	// 		return res
	// 			.status(401)
	// 			.send({ error: "error retrieving milestones" });
	// 	}
	// 	const resp = await response.json();
	// 	const milestones = resp.Response;
	// 	const vanguardOpsMilestone = milestones['1437935813'];

	// 	console.log(milestones);

	// 	res.send({
	// 		milestoneHash: vanguardOpsMilestone.milestoneHash,
	// 		modifierHashes: vanguardOpsMilestone.activities[0].modifierHashes
	// 	});
	// });

	app.get("/api/weekly_nightfall", async (req, res) => {
		const response = await fetch(
			"https://www.bungie.net/Platform/Destiny2/Milestones/",
			{
				headers: {
					"X-API-Key": keys.apiKey,
				},
			}
		);
		if (response.status === 400 || response.status === 401) {
			return res
				.status(401)
				.send({ error: "error retrieving milestones" });
		}
		const resp = await response.json();
		const milestones = resp.Response;

		//1942283261 = completions, 2029743966 = score
		const nightfallMilestoneInfo = milestones["2029743966"];

		//get weapon info
		const nightfallWeaponDB = await NightfallWeaponRotation.findOne({
			nightfallWeaponIndex: { $gte: 0 },
		});

		const currWeapon =
			nightfallWeaponsHashes.rotation[
				nightfallWeaponDB.nightfallWeaponIndex
			];

		const weaponsRotation = nightfallWeaponsHashes.rotation.map(
			weaponName => {
				return nightfallWeaponsHashes[weaponName];
			}
		);

		res.send({
			nightfallActivities: nightfallMilestoneInfo.activities,
			weaponsRotation,
			currWeapon,
		});
	});

	app.get("/api/crucible_playlist", async (req, res) => {
		const response = await fetch(
			"https://www.bungie.net/Platform/Destiny2/Milestones/",
			{
				headers: {
					"X-API-Key": keys.apiKey,
				},
			}
		);
		if (response.status === 400 || response.status === 401) {
			return res
				.status(401)
				.send({ error: "error retrieving milestones" });
		}
		const resp = await response.json();
		const milestones = resp.Response;

		const cruciblePlaylistMilestoneInfo = milestones["3312774044"];
		res.send({playlists: cruciblePlaylistMilestoneInfo.activities});
	});

	app.get("/api/nightmare_hunts", async (req, res) => {
		const nightmareHuntsDB = await NightmareHuntsRotation.findOne({
			nightmareHuntsIndex: { $gte: 0 },
		});

		const currHunts =
			nightmareHuntsHashes.rotation[nightmareHuntsDB.nightmareHuntsIndex];

		const currHuntsHashes = currHunts.map(huntName => {
			return nightmareHuntsHashes[huntName].activityHash;
		});

		res.send({ hunts: currHuntsHashes });
	});

	app.get("/api/empire_hunt", async (req, res) => {
		const empireHuntDB = await EmpireHuntRotation.findOne({empireHuntIndex: {$gte: 0}});

		const currHunt = empireHuntHashes.rotation[empireHuntDB.empireHuntIndex];

		res.send({currHunt: empireHuntHashes[currHunt]});
	});

	app.get("/api/ascendant_challenge", async (req, res) => {
		const dreamingCityRotationsDB = await DreamingCityRotations.findOne({curseRotationIndex: {$gte: 0}});

		const curseWeek = dreamingCityHashes.curseRotation[dreamingCityRotationsDB.curseRotationIndex];
		const currAscendantChallenge = dreamingCityHashes.ascendantChallengeRotation[dreamingCityRotationsDB.ascendantChallengeIndex];

		const currAscendantChallengeInfo = dreamingCityHashes[currAscendantChallenge];

		res.send({
			curseWeek,
			ascendantChallenge: {
				currAscendantChallengeInfo,
				currAscendantChallenge
			}
		});
	});

	app.get("/api/raid_rotation", async (req, res) => {
		const raidRotationDB = await RaidAndDungeonRotations.findOne({featuredRaidIndex: {$gte: 0}});

		const featuredRaid = raidRotationHashes.rotation[raidRotationDB.featuredRaidIndex];

		const rotationHashes = raidRotationHashes.rotation.map(raidName => {
			return raidRotationHashes[raidName];
		})

		res.send({
			featuredRaid: raidRotationHashes[featuredRaid],
			raidRotation: rotationHashes
		})
	});

	app.get("/api/dungeon_rotation", async (req, res) => {
		const raidRotationDB = await RaidAndDungeonRotations.findOne({featuredDungeonIndex: {$gte: 0}});

		const featuredDungeon = dungeonRotationHashes.rotation[raidRotationDB.featuredDungeonIndex];

		const rotationHashes = dungeonRotationHashes.rotation.map(dungeonName => {
			return dungeonRotationHashes[dungeonName];
		});

		res.send({
			featuredDungeon: dungeonRotationHashes[featuredDungeon],
			dungeonRotation: rotationHashes
		});
	});
};
