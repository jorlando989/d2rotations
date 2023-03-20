import React, { FC } from 'react';
import Countdown from 'react-countdown';
import './styles/countdown.css';

type CountdownProps = {
    type: string;
};

function renderWeeklyCountdown() {
    const now = new Date();
    //reset time is tuesday (2) at 1pm EST
    const weekDaysToReset = [2,1,0,6,5,4,3];
    let resetTime = null;
    const daylight_savings = false;

    if (daylight_savings) {
        //DAYLIGHT SAVINGS
        if (now.getDay() === 2 && now.getHours() >= 13) {
            //reset is today at 1pm
            resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 1);
        } else {
            //reset is x days away at 1pm EST
            resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + weekDaysToReset[now.getDay()], 13);
        }
    } else {
        //REGULAR
        if (now.getDay() === 2 && now.getHours() >= 13) {
            //reset is today at 12pm
            resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 12);
        } else {
            //reset is x days away at 12pm EST
            resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + weekDaysToReset[now.getDay()], 12);
        }
    }

    return <Countdown date={resetTime} />;
}

function renderDailyCountdown() {
    const now = new Date();
    //reset time is either next day at 1pm or same day at 1 pm
    let resetTime = null;
    const daylight_savings = false;

    if (daylight_savings) {
        //DAYLIGHT SAVINGS
        if (now.getHours() >= 13) {
            //reset is tomorrow at 1pm
            resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 13);
        } else {
            //reset is today at 1pm
            resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13);
        }
    } else {
        //REGULAR
        if (now.getHours() >= 12) {
            //reset is tomorrow at 12pm
            resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12);
        } else {
            //reset is today at 12pm
            resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
        }
    }
    
    return (
        <Countdown date={resetTime} />
    );
}

function renderCountdown(type: string) {
    if(type === "daily") return renderDailyCountdown();
    else return renderWeeklyCountdown();
}

const CountdownTimer: FC<CountdownProps> = ({type}) => {
    return (
        <div className='countdown'>
            <>
                Time until Reset: {renderCountdown(type)}
            </>
        </div>
    );
};

export default CountdownTimer;