import { FC } from "react";
import RaidDungeonCard from "../Card/RaidDungeonCard";
import "../styles/component.css";

const RaidDungeon: FC = () => {
	return (
		<div className='info display-in-row-wrap'>
			<RaidDungeonCard type='raid' />
			<RaidDungeonCard type='dungeon' />
		</div>
	);
};

export default RaidDungeon;
