import React from 'react';

import '../../configs/firebase-config';
import './Menu.scss';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MenuIconPresenter from './MenuIcons/MenuIconPresenter';

import Button, { ButtonTypes } from '../../components/button/button';
interface Props {
	onFailure: Function;
	onSignIn: Function;
	onSignOut: Function;
	user: Object[] | null
}

const MenuView: React.FC<Props> = ({
	onFailure,
	onSignIn,
	onSignOut,
	user,
}) => {
	return (
		<div className='Menu'>
			<div className='Menu-content'>
				<Link className='Menu-item' to='/'>
					<MenuIconPresenter menuIcon='compass' height='20px' />
					Tripper
				</Link>
				<Link className='Menu-item' to='/post'>
					<MenuIconPresenter menuIcon='plus' height='20px' />
					New blogpost
				</Link>
				<Link className='Menu-item' to='/profile'>
					<MenuIconPresenter menuIcon='user' height='20px' />
					Profile
				</Link>
				{user ? (
					<Button type={ButtonTypes.tertiary} onPress={() => onSignOut()}>
						<FontAwesomeIcon icon={faSignOutAlt} />
						Sign out
					</Button>
				) : (
						<GoogleLogin
							clientId='209447824082-unncgfvgil8pbbdr7it1vd1hlhapnp18.apps.googleusercontent.com'
							buttonText='Login with Google'
							onSuccess={(res) => onSignIn(res)}
							onFailure={(err) => onFailure(err)}
							cookiePolicy={'single_host_origin'}
						/>
					)}
			</div>
		</div>
	);
};

export default MenuView;
