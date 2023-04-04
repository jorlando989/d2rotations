import React from "react";
import "../styles/component.css";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { DestinyActivityDefinition } from "bungie-api-ts/destiny2";

type MyProps = {
	activity: DestinyActivityDefinition;
};

type MyState = {};

class ActivityCard extends React.Component<MyProps, MyState> {

	render() {
        const activity = this.props.activity;
        return (
            <div
                key={activity.hash}
                className='bg-teal itemCard min-width rounded-corners mr5'
            >
                <OverlayTrigger
                    key={activity.hash}
                    placement='bottom'
                    overlay={
                        <Tooltip id='activity description'>
                            <b>
                                {activity.displayProperties.description}
                            </b>
                        </Tooltip>
                    }
                >
                    <div>{activity.displayProperties.name}</div>
                </OverlayTrigger>
            </div>
        );
	}
}

export default ActivityCard;
