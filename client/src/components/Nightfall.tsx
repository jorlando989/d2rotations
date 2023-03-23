import { FC } from 'react';
import Countdown from './CountdownTimer';
import './styles/component.css';
import './styles/dashboard.css';
import WeeklyNightfall from './WeeklyNightfall';

const Nightfall: FC = () => {
    return (
        <div className='info'>
            <div className='display-in-row'>
                <h2>Nightfall</h2>
                <Countdown type="weekly"/>
            </div>
            
            <WeeklyNightfall />
        </div>
    );
};

export default Nightfall;