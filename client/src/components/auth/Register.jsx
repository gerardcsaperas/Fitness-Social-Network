import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MyButton from '../custom/MyButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../style/Register.scss';

const Register = () => {
	const [ formData, setFormData ] = useState({
		username: '',
		email: '',
		password: ''
	});

	const { username, email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<section id="Register">
			<div id="RegisterBox">
				<h1>Regístrate</h1>
				<form>
					<TextField
						required
						name="username"
						label="Nombre de Usuario"
						type="name"
						variant="outlined"
						value={username}
						onChange={(e) => onChange(e)}
					/>
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
					<MyButton type="submit" color="blue">
						Hecho
					</MyButton>
				</form>
				<Link to="/">
					<Button variant="outlined" color="primary">
						Atrás
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default Register;
