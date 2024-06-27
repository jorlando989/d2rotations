import { FC } from "react";
import "../styles/component.css";

import ActivityCardList from "../Card/ActivityCardList";
import Countdown from "../CountdownTimer";
import DreamingCity from "./DreamingCity";
import EmpireHunt from "./EmpireHunt";
import VexIncursionZone from "./VexIncursionZone";
import EuropaEclipsedZone from "./EuropaEclipsedZone";
import ExoticMission from "./ExoticMission";

const Weekly: FC = () => {
	return (
		<div className='info'>
			<div className='display-in-row-title'>
				<h2>Weekly Rotations</h2>
				<Countdown type='weekly' />
			</div>

			{/* <div>
				<h4>Crucible Playlist</h4>
				<ActivityCardList activityType='cruciblePlaylist' />
			</div> */}
			<div>
				<h4>Exotic Mission</h4>
				<div className="mt10 display-in-row-wrap row-margin exoticMission">
					<ExoticMission name=""/>
					<ExoticMission name="Zero Hour"/>
					<ExoticMission name="The Whisper"/>
				</div>
			</div>
			<div>
				<h4>Nightmare Hunts</h4>
				<ActivityCardList activityType='nightmareHunts' />
			</div>
			<div className="mt10 display-in-row-wrap row-margin">
				<EmpireHunt />
				<DreamingCity />
				<VexIncursionZone />
				<EuropaEclipsedZone />
			</div>
		</div>
	);
};

export default Weekly;
