import { getActivityDef } from "@d2api/manifest-web";
import React from "react";
import {
	cruciblePlaylistResponse,
	nightmareHuntResponse,
} from "../../typeDefinitions/activityTypes";
import "../styles/component.css";

import ActivityCard from "./ActivityCard";
import ImageCard from "./ImageCard";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type MyProps = {
	activityType: string;
};

type MyState = {
	nightmareHuntResponse: nightmareHuntResponse;
	cruciblePlaylistResponse: cruciblePlaylistResponse;
};

class ActivityCardList extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			nightmareHuntResponse: { hunts: [] },
			cruciblePlaylistResponse: { playlists: [] },
		};
	}

	getNightmareHunts() {
		fetch(`${API_ENDPOINT}/api/nightmare_hunts`)
			.then(res => res.json())
			.then(res => this.setState({ nightmareHuntResponse: res }));
	}

	getCruciblePlaylists() {
		fetch(`${API_ENDPOINT}/api/crucible_playlist`)
			.then(res => res.json())
			.then(res => this.setState({ cruciblePlaylistResponse: res }));
	}

	componentDidMount() {
		switch (this.props.activityType) {
			case "nightmareHunts":
				this.getNightmareHunts();
				break;
			case "cruciblePlaylist":
				this.getCruciblePlaylists();
				break;
			default:
				break;
		}
	}

	getNightmareHuntsInfo() {
		if (
			this.state.nightmareHuntResponse === undefined ||
			this.state.nightmareHuntResponse.hunts === undefined
		)
			return;
		const currHuntsInfo = this.state.nightmareHuntResponse.hunts.map(
			hunt => {
				const huntInfo = getActivityDef(hunt);
				return huntInfo;
			}
		);
		return currHuntsInfo;
	}

	getCruciblePlaylistInfo() {
		const cruciblePlaylistInfo =
			this.state.cruciblePlaylistResponse.playlists.map(activity => {
				const activityInfo = getActivityDef(activity.activityHash);
				return activityInfo;
			});
		return cruciblePlaylistInfo;
	}

	renderActivities(activityInfo: string) {
		if (
			activityInfo === "nightmareHunts" &&
			this.state.nightmareHuntResponse !== null &&
			this.state.nightmareHuntResponse.hunts !== null
		) {
			const huntsInfo = this.getNightmareHuntsInfo();
			if (huntsInfo === undefined)
				return <div>error loading nightmare hunts</div>;
			return huntsInfo.map(activity => {
				if (activity === undefined)
					return <div>error loading hunt</div>;
				return (
					<ImageCard
						title={activity.displayProperties.name.split(":")[1]}
						imageSrc={activity.pgcrImage}
						key={activity.hash}
					/>
				);
			});
		} else if (
			activityInfo === "cruciblePlaylist" &&
			this.state.cruciblePlaylistResponse !== null &&
			this.state.cruciblePlaylistResponse.playlists !== null
		) {
			const cruciblePlaylistInfo = this.getCruciblePlaylistInfo();
			if (cruciblePlaylistInfo === undefined)
				return <div>error loading crucible playlists</div>;
			return cruciblePlaylistInfo.map(activity => {
				if (activity === undefined)
					return <div>error loading crucible playlist</div>;
				return <ActivityCard activity={activity} key={activity.hash} />;
			});
		}
		return <div>Activity type not found</div>;
	}

	render() {
		return (
			<div className='display-in-row-wrap row-margin'>
				{this.renderActivities(this.props.activityType)}
			</div>
		);
	}
}

export default ActivityCardList;
