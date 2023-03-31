import { FC } from "react";
import "./styles/component.css";

import AltarsOfSorrow from "./AltarsOfSorrow";
import Countdown from "./CountdownTimer";
import LostSectorRotation from "./LostSectorRotation";
import Wellspring from "./Wellspring";
// import StrikeModifiers from './StrikeModifiers';

const Daily: FC = () => {
	return (
		<div className='info'>
			<div className='display-in-row-title'>
				<h2>Daily Rotations</h2>
				<Countdown type='daily' />
			</div>

			<h4>Lost Sector</h4>
			<LostSectorRotation />

			{/* <div className='display-in-row rowSpacing'>
                <div>
                    <h4>Ada-1 Mods</h4>
                    <ModsRotation vendor={'Ada-1'}/>
                </div>
                
                <div>
                    <h4>Banshee Mods</h4>
                    <ModsRotation vendor={'Banshee'}/>
                </div>
            </div> */}

			<div>
				<h4>Altars of Sorrow Reward</h4>
				<AltarsOfSorrow />
			</div>
			<div className='mt10'>
				<Wellspring />
			</div>

			<div>
				{/* <h4>Strike Modifiers</h4> */}
				{/* <StrikeModifiers /> */}
			</div>
		</div>
	);
};

export default Daily;
