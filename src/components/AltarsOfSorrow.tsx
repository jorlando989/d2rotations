import React from "react";
import "./styles/component.css";
import { getItemImage } from "../services/iconRenderer";

type currRewardType = {
	hash: number;
	name: string;
};

type altarOfSorrowsResponse = {
	currReward: string;
	currRewardInfo: currRewardType;
};

type MyProps = {};

type MyState = {
	apiResponse: altarOfSorrowsResponse;
};

class AltarsOfSorrow extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);
		this.state = {
			apiResponse: {
				currReward: "",
				currRewardInfo: { name: "", hash: -1 },
			},
		};
	}

	getAltarOfSorrowRewards() {
		fetch("http://localhost:5000/api/altarsOfSorrow")
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getAltarOfSorrowRewards();
	}

	render() {
		if (this.state !== null) {
			const itemImageSrc = getItemImage(this.state.apiResponse.currRewardInfo.hash);
			return (
				<div className='bg-teal itemCard'>
					<div className='display-in-row center-vertical'>
						<img
							src={`https://www.bungie.net${itemImageSrc}`}
							className='p5'
							alt='altars of sorrow reward'
						/>
						{this.state.apiResponse.currReward}
					</div>
				</div>
			);
		}
	}
}

export default AltarsOfSorrow;
