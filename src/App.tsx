import React from 'react';

import { Button } from './components';

class App extends React.PureComponent {
	render() {
		return (
			<div>
				<Button onClick={() => { }}>
					Text Button
					</Button>
			</div>
		);
	}
}

export default App;