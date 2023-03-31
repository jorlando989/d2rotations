import React from "react";
import "./styles/component.css";
import { getItemImage } from "../services/iconRenderer";
import { getInventoryItemDef } from "@d2api/manifest-web";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

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
		fetch(`${API_ENDPOINT}/api/altarsOfSorrow`)
			.then(res => res.json())
			.then(res => this.setState({ apiResponse: res }));
	}

	componentDidMount() {
		this.getAltarOfSorrowRewards();
	}

	getRewardInfo() {
		const rewardInfo = getInventoryItemDef(
			this.state.apiResponse.currRewardInfo.hash
		);
		return rewardInfo;
	}

	render() {
		if (this.state !== null) {
			const rewardInfo = this.getRewardInfo();
			return (
				<div className='bg-teal itemCard'>
					<div className='display-in-row center-vertical'>
						<div className="rewardContainer">
							<div
								className='rewardItem p5'
								style={{
									backgroundImage: `url(https://www.bungie.net${rewardInfo?.displayProperties.icon})`,
								}}
							></div>
							<div className='rewardWatermark p5'
								style={{
									backgroundImage: `url(https://www.bungie.net${rewardInfo?.iconWatermark})`,
								}}></div>
						</div>
						{rewardInfo?.displayProperties.name}
					</div>
				</div>
			);
		}
	}
}

export default AltarsOfSorrow;
