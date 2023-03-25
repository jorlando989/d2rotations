import {
	loadDefs,
	allManifest,
	setApiKey,
	includeTables,
	verbose,
} from "@d2api/manifest-web";
import React from "react";

const keys = require("../config/keys");
const neededManifestDefs = require("../data/neededManifestDefs.json");

verbose();
setApiKey(keys.apiKey);
includeTables(neededManifestDefs.tablesNeeded);

const manifestLoadPromise = loadDefs();
function ensureManifest() {
	if (allManifest) return;
	throw manifestLoadPromise;
}

export function DefsProvider({ children }: React.PropsWithChildren<{}>) {
	// console.log(children);
	return (
		<React.Suspense fallback={<div>loading manifest...</div>}>
			{children}
		</React.Suspense>
	);
}

function LoadDefsFirst({ children }: React.PropsWithChildren<{}>) {
	ensureManifest();
	return <>{children}</>;
}

export function BlockingDefsProvider({children}: React.PropsWithChildren<{}>) {
	return (
		<React.Suspense fallback={<div className="info">loading manifest...</div>}>
			<LoadDefsFirst>{children}</LoadDefsFirst>
		</React.Suspense>
	);
}


