import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import store, { history } from '../utils/configureStore';

import { HomePage } from '../pages';

class AppContainer extends React.PureComponent {
	render() {
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<Switch>
						<Route component={HomePage} />
					</Switch>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default AppContainer;
