import React from "react";
import "./styles/component.css";
import { getActivityModifierDef, getMilestoneDef } from "@d2api/manifest-web";
import { DestinyMilestoneDefinition, DestinyActivityModifierDefinition } from "bungie-api-ts/destiny2";

type strikeModifiersResponse = {
    milestoneHash: number,
    modifierHashes: DestinyActivityModifierDefinition[]
}

type MyProps = {};

type MyState = {
	apiResponse: strikeModifiersResponse;
};

class StrikeModifiers extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: {milestoneHash: -1, modifierHashes: []},
		};
	}

	getWellspringRotation() {
		fetch("http://localhost:5000/api/strike_modifiers")
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getWellspringRotation();
	}

    // getInfo() {
    //     const milestoneInfo = getMilestoneDef(this.state.apiResponse.milestoneHash);

    //     const modifiers = this.state.apiResponse.modifierHashes.map(modifierHash => {
    //     	const modifierInfo = getActivityModifierDef(modifierHash);
    //     	return modifierInfo;
    //     });

    //     return {
    //         milestoneInfo,
    //         modifiers
    //     };

    // }

    renderRewards() {
        return (
            <div >
                
            </div>
        );
    }

	render() {
		if (this.state !== null) {
			return (
				<div className='bg-teal itemCard'>
					<div>
                        <h3>
                            {/* {wellspringInfo.activityInfo.displayProperties.name} */}
                        </h3>
                        <div>
                            {/* {wellspringInfo.activityInfo.displayProperties.description} */}
                        </div>
                    </div>
                    <hr />
                    {this.renderRewards()}
				</div>
			);
		}
	}
}

export default StrikeModifiers;
