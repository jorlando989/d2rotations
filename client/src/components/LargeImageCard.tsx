import React from "react";
import "./styles/component.css";
import "./styles/imagecard.css";
import Card from "react-bootstrap/Card";

type MyProps = {
	title?: string | undefined;
	imageSrc: string | undefined;
	extraImg?: string;
	children: JSX.Element;
	withFooter?: boolean;
};

type MyState = {};

class ImageCard extends React.Component<MyProps, MyState> {
	renderTitle() {
		if (this.props.title)
			return <h3 className='cardTitle'>{this.props.title}</h3>;
	}

	render() {
		if (this.props) {
			let classes = "bg-dark text-white largeCard";
			if (this.props.withFooter) classes += " with-footer";
			return (
				<Card className={classes}>
					<Card.Img
						src={`https://www.bungie.net${this.props.imageSrc}`}
						alt='Card image'
						className='largeCardImg'
					/>
					<Card.ImgOverlay>
						{this.renderTitle()}
						{this.props.children}
					</Card.ImgOverlay>
				</Card>
			);
		}
	}
}

export default ImageCard;
