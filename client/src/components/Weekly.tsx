import { FC } from "react";
import "./styles/component.css";

import ActivityCardList from "./ActivityCardList";
import Countdown from "./CountdownTimer";
import DreamingCity from "./DreamingCity";
import EmpireHunt from "./EmpireHunt";

const Weekly: FC = () => {
	return (
		<div className='info'>
			<div className='display-in-row-title'>
				<h2>Weekly Rotations</h2>
				<Countdown type='weekly' />
			</div>

			<div>
				<h4>Crucible Playlist</h4>
				<ActivityCardList activityType='cruciblePlaylist' />
			</div>
			<div>
				<h4>Nightmare Hunts</h4>
				<ActivityCardList activityType='nightmareHunts' />
			</div>
			<div className="mt10">
				<EmpireHunt />
			</div>

			<div>
				<h4>Dreaming City - Curse Week and Ascendant Challenge</h4>
				<DreamingCity />
			</div>
		</div>
	);
};

export default Weekly;
