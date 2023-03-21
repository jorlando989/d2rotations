import React from "react";
import "./styles/component.css";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

type dreamingCityResponse = {
	curseWeek: {
		strength: string;
		petraLocation: string;
	};
	ascendantChallenge: {
		currAscendantChallengeInfo: { challengeName: string };
		currAscendantChallenge: string;
	};
};

type MyProps = {};

type MyState = {
	apiResponse: dreamingCityResponse;
};

class DreamingCity extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: {
				curseWeek: { strength: "", petraLocation: "" },
				ascendantChallenge: {
					currAscendantChallengeInfo: { challengeName: "" },
					currAscendantChallenge: "",
				},
			},
		};
	}

	getDreamingCityRotation() {
		fetch(`${API_ENDPOINT}/api/ascendant_challenge`)
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getDreamingCityRotation();
	}

	render() {
		if (
			this.state.apiResponse !== undefined &&
			this.state.apiResponse.curseWeek.strength !== null
		) {
			const curseWeek = this.state.apiResponse.curseWeek;
			const ascendantChallenge =
				this.state.apiResponse.ascendantChallenge;
			return (
				<div className='display-in-row'>
					<div className='bg-teal itemCard min-width rounded-corners whiteText mr5'>
						<h4>{curseWeek.strength} Curse</h4>
						<div>
							<i>
								Petra can be found in {curseWeek.petraLocation}
							</i>
						</div>
					</div>
					<div className='bg-teal itemCard min-width rounded-corners whiteText'>
						<h4>
							Ascendant Challenge:{" "}
							{
								ascendantChallenge.currAscendantChallengeInfo
									.challengeName
							}
						</h4>
						<div>
							<i>
								Found in{" "}
								{ascendantChallenge.currAscendantChallenge}
							</i>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default DreamingCity;
