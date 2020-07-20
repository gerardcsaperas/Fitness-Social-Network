import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import KnowMore from './components/misc/KnowMore';

const App = () => (
	<Router>
		<Fragment>
			<Route exact path="/" component={Landing} />
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/knowmore" component={KnowMore} />
			</Switch>
		</Fragment>
	</Router>
);

export default App;
