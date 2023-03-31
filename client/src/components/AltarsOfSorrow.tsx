import React from "react";
import "./styles/component.css";
import {
	getItemImage,
	renderIconWithWatermark,
} from "../services/iconRenderer";
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
			if (!rewardInfo) return <div></div>;
			return (
				<div className='bg-teal itemCard'>
					<div className='display-in-row center-vertical'>
						<div className="mr5">
							{renderIconWithWatermark(
								rewardInfo.displayProperties.icon,
								rewardInfo.iconWatermark,
								100
							)}
						</div>

						{rewardInfo?.displayProperties.name}
					</div>
				</div>
			);
		}
	}
}

export default AltarsOfSorrow;
