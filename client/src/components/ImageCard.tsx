import React from "react";
import "./styles/component.css";
import "./styles/imagecard.css";
import Card from "react-bootstrap/Card";

type MyProps = {
	title: string | undefined;
	imageSrc: string | undefined;
};

type MyState = {};

class ImageCard extends React.Component<MyProps, MyState> {
	render() {
		console.log(this.props.imageSrc);
		if (this.props) {
			return (
				<Card className='bg-dark text-white'>
					<Card.Img
						src={`https://www.bungie.net${this.props.imageSrc}`}
						alt='Card image'
					/>
					<Card.ImgOverlay>
						<Card.Title className="cardTitle">{this.props.title}</Card.Title>
					</Card.ImgOverlay>
				</Card>
			);
		}
	}
}

export default ImageCard;
