import React, { useState, useEffect } from 'react';

import '../../configs/firebase-config';
import './Menu.scss';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MenuIconPresenter from './MenuIcons/MenuIconPresenter';

import Button, { ButtonTypes } from '../../components/button/button';

import {
	getAuth,
	onAuthStateChanged,
	signInWithCredential,
	signOut,
	GoogleAuthProvider,
} from 'firebase/auth';

interface Props {}

const MenuView: React.FC<Props> = () => {
	const auth = getAuth();
	const [signedIn, setSignedIn] = useState<boolean>();

	onAuthStateChanged(auth, (user) => {
		if (user) {
		  setSignedIn(true)
		}
	  });

	const onFailure = (error: any) => {
		console.log(error) // TODO: better error handling
	}

	const onSignIn = (googleUser: { [k: string]: any }) => {
			console.log('Google Auth Response', googleUser);
			// We need to register an Observer on Firebase Auth to make sure auth is initialized.
			const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
				unsubscribe();
				// Check if we are already signed-in Firebase with the correct user.
				if (!isUserEqual(googleUser, firebaseUser)) {
					// Build Firebase credential with the Google ID token.
					const credential = GoogleAuthProvider.credential(
						googleUser.getAuthResponse().id_token
					);

					// Sign in with credential from the Google user.
					signInWithCredential(auth, credential).catch((error) => {
						// Handle Errors here.
						const errorCode = error.code;
						const errorMessage = error.message;
						const email = error.email;
						const credential = GoogleAuthProvider.credentialFromError(error);
					});
					setSignedIn(true);
				} else {
          setSignedIn(true);
					console.log('User already signed-in Firebase.');
				}
			});
	};

	const isUserEqual = (googleUser: any, firebaseUser: any) => {
		if (firebaseUser) {
			const providerData = firebaseUser.providerData;
			for (let i = 0; i < providerData.length; i++) {
				if (
					providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
					providerData[i].uid === googleUser.getBasicProfile().getId()
				) {
					// We don't need to reauth the Firebase connection.
					return true;
				}
			}
		}
		return false;
	};

	const onSignOut = () => {
		signOut(auth)
			.then(() => {
				setSignedIn(false)
			})
			.catch((error) => {
        console.log(error) // TODO: better error handling
			});
	};

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
				{signedIn ? (
					<Button type={ButtonTypes.secondary} onPress={() => onSignOut()}>
						<FontAwesomeIcon icon={faSignOutAlt} />
						Sign out
					</Button>
				) : (
					<GoogleLogin
						clientId= '209447824082-unncgfvgil8pbbdr7it1vd1hlhapnp18.apps.googleusercontent.com'
						buttonText='Login with Google'
						onSuccess={onSignIn}
						onFailure={onFailure}
						cookiePolicy={'single_host_origin'}
					/>
				)}
			</div>
		</div>
	);
};

export default MenuView;
