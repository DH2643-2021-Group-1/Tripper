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
	handleGetUserDetails,
	handleCreateUser,
	handleCheckUser ] = useBlogPostApi();

interface Props {}

const Menu: React.FC<Props> = () => {
  const auth = getAuth();
	const [signedIn, setSignedIn] = useState<boolean>(false);

	onAuthStateChanged(auth, (user) => {
		if (user) {
		  setSignedIn(true)
		}
	  });

	const onFailure = (error: any) => {
		console.log(error) // TODO: better error handling
	}

	const onSignIn = (googleUser: { [k: string]: any }) => {

		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			unsubscribe();

			if (!isUserEqual(googleUser, firebaseUser)) {

				const id_token = googleUser.getAuthResponse().id_token;
				const credential = GoogleAuthProvider.credential(id_token);
				
				signInWithCredential(auth, credential)
					.then(({ user }) => {
						handleCheckUser(user.uid).then(res => {
							if (!res) {
								handleCreateUser(user)
							}
						})
						setSignedIn(true);
					})
					.catch((error) => {
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
		<MenuView onFailure={onFailure} onSignIn={onSignIn} onSignOut={onSignOut} signedIn={signedIn}/>
	);
};

export default Menu;
