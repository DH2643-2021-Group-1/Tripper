import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

interface Props {
	children?: any;
	component?: React.FC;
	exact: boolean;
	path: string;
}

const PrivateRoute: React.FC<Props> = (props) => {
	const user = useContext(AuthContext);
	const { children, ...rest } = props;

	return (
		<Route
			{...rest}
			render={(renderProps) =>
				user ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: renderProps.location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
