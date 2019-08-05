import { SwapContext } from '../SwapMode/SwapMode';

const withSwapContext = (Component) => (props) => (
	<SwapContext.Consumer>
		{value => <Component {...props} {...value} />}
	</SwapContext.Consumer>
);

export default withSwapContext;
