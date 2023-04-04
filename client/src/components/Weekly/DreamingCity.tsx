import React from "react";
import LargeImageCard from "../Card/LargeImageCard";
import "../styles/component.css";

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
				<div style={{ maxWidth: "500px" }}>
					<LargeImageCard
						title='Dreaming City'
						imageSrc='/img/destiny_content/pgcr/free_roam_dreaming_city.jpg'
					>
						<div className="overflowAuto">
							<div className='dark-background mb5'>
								<h4>{curseWeek.strength} Curse</h4>
								<div>
									<i>
										Petra can be found in{" "}
										{curseWeek.petraLocation}
									</i>
								</div>
							</div>

							<div className='dark-background'>
								<h4>
									Ascendant Challenge:{" "}
									{
										ascendantChallenge
											.currAscendantChallengeInfo
											.challengeName
									}
								</h4>
								<div>
									<i>
										Found in{" "}
										{
											ascendantChallenge.currAscendantChallenge
										}
									</i>
								</div>
							</div>
						</div>
					</LargeImageCard>
				</div>
			);
		}
	}
}

export default DreamingCity;
