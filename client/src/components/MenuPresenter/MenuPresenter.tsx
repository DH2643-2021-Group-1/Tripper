import React, { useState } from "react";
import MenuView from "./MenuView";

import {
	getAuth,
	onAuthStateChanged,
	signInWithCredential,
	signOut,
	GoogleAuthProvider,
} from 'firebase/auth'

import useBlogPostApi from "../../hooks/useBlogPostApi";
const [ handleGetAllBlogPosts,
	handleGetBlogPostByUserId,
	handleEditProfile,
	handleGetUserDetails,
	handleCreateUser, ] = useBlogPostApi();

interface Props {}

const Menu: React.FC<Props> = () => {
  const auth = getAuth();
	const [signedIn, setSignedIn] = useState<boolean>(false);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			//console.log('auth user: ', user)
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
				const id_token = googleUser.getAuthResponse().id_token;
				const credential = GoogleAuthProvider.credential(id_token);
				
				signInWithCredential(auth, credential)
					.then(({ user }) => {
						handleCreateUser(user)
						setSignedIn(true);
					})
					.catch((error) => {
						// Handle Errors here.
						const errorCode = error.code;
						const errorMessage = error.message;
						const email = error.email;
						const credential = GoogleAuthProvider.credentialFromError(error);
					});
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
				setSignedIn(false);
			})
			.catch((error) => {
				console.log(error); // TODO: better error handling
			});
	};

	return (
		<MenuView
			onFailure={onFailure}
			onSignIn={onSignIn}
			onSignOut={onSignOut}
			signedIn={signedIn}
		/>
	);
};

export default Menu;
