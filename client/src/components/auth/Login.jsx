import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../custom/MyButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../style/Login.scss';

const Login = () => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<section id="Login">
			<div id="LoginBox">
				<h1>Entrar</h1>
				<form>
					<TextField
						required
						name="email"
						label="Correo Electrónico"
						type="email"
						variant="outlined"
						value={email}
						onChange={(e) => onChange(e)}
					/>
					<TextField
						required
						name="password"
						label="Contraseña"
						type="password"
						variant="outlined"
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</form>
				<MyButton color="blue">Entra</MyButton>
				<p>¿Aún no tienes una cuenta?</p>
				<Link to="/register">
					<MyButton color="blue">Regístrate</MyButton>
				</Link>
				<Link to="/">
					<Button variant="outlined" color="primary">
						Atrás
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default Login;
