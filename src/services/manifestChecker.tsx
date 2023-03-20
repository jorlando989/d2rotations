import {
	includeTables, loadDefs, setApiKey, verbose
} from "@d2api/manifest-web";

const keys = require("../config/keys.json");
const neededManifestDefs = require("../data/neededManifestDefs.json");

verbose(); // make the client chatty. if you want.
setApiKey(keys.apiKey);
includeTables(neededManifestDefs.tablesNeeded);

export async function manifestLoader() {
	// checks the API for the current version.
	// loads our cached copy if it's up to date, or downloads a new one from bungie
	await loadDefs();
}
