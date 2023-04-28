import React from "react";
import Card from "react-bootstrap/Card";
import "../styles/component.css";
import "../styles/imagecard.css";

type MyProps = {
	title: string | undefined;
	imageSrc: string | undefined;
	extraImg?: string;
	extraImgClasses?: string;
};

type MyState = {};

class ImageCard extends React.Component<MyProps, MyState> {
	renderExtra() {
		if (this.props.extraImg) {
			return (
				<span>
					<img
						src={this.props.extraImg}
						className={"rewardIcon " + this.props.extraImgClasses}
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
