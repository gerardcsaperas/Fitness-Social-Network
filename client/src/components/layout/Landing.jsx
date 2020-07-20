import React from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../custom/MyButton';
import Button from '@material-ui/core/Button';
import '../style/Landing.scss';

const Landing = () => {
	return (
		<section id="landing">
			<div id="landingText">
				<h1>Fitty</h1>
				<h2>Entrena de forma más eficiente.</h2>
				<Link to="/login">
					<MyButton color="blue">Entrar</MyButton>
				</Link>
				<Link to="/knowmore">
					<Button variant="outlined" color="primary">
						Saber Más
					</Button>
				</Link>
				<h3>...¡y de gratis!</h3>
			</div>
		</section>
	);
};

export default Landing;
