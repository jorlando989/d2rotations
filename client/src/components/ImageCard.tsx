import React from "react";
import "./styles/component.css";
import "./styles/imagecard.css";
import Card from "react-bootstrap/Card";

type MyProps = {
	title: string | undefined;
	imageSrc: string | undefined;
	extraImg?: string;
};

type MyState = {};

class ImageCard extends React.Component<MyProps, MyState> {
	renderExtra() {
		if (this.props.extraImg) {
			return (
				<span>
					<img
						src={this.props.extraImg}
						className='rewardIcon armorIcon'
					/>
				</span>
			);
		}
	}

	render() {
		if (this.props) {
			return (
				<Card className='bg-dark text-white smallCard'>
					<Card.Img
						src={`https://www.bungie.net${this.props.imageSrc}`}
						alt='Card image'
					/>
					<Card.ImgOverlay>
						<Card.Title className='cardTitle'>
							{this.props.title} {this.renderExtra()}
						</Card.Title>
					</Card.ImgOverlay>
				</Card>
			);
		}
	}
}

export default ImageCard;
