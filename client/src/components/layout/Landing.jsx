import React, { Fragment } from 'react';
import MyButton from '../custom/MyButton';
import Button from '@material-ui/core/Button';
import './Landing.scss';

const Landing = () => {
	return (
		<Fragment>
			<h1>Fitty</h1>
			<h2>Una app que te ayuda a entrenar de forma más eficiente.</h2>
			<h3>...¡y de gratis!</h3>
			<MyButton color="blue">Regístrate</MyButton>
			<Button variant="outlined" color="primary">
				Saber Más
			</Button>
		</Fragment>
	);
};

export default Landing;
