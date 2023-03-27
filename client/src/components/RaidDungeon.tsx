import { FC } from "react";
import RaidDungeonCard from "./RaidDungeonCard";
import "./styles/component.css";
import "./styles/dashboard.css";

const RaidDungeon: FC = () => {
	return (
		<div className='info display-in-row'>
			{/* <h4>Raid Rotator</h4> */}
			<RaidDungeonCard type='raid' />

			{/* <h4>Dungeon Rotator</h4> */}
			<RaidDungeonCard type='dungeon' />
		</div>
	);
};

export default RaidDungeon;
