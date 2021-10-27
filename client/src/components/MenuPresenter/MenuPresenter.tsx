import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import MenuView from "./MenuView";

import {
	getAuth,
	onAuthStateChanged,
	signInWithCredential,
	signOut,
	GoogleAuthProvider,
} from 'firebase/auth'

import { AuthContext } from '../../contexts/AuthContext'

import useBlogPostApi from "../../hooks/useBlogPostApi";
const [ handleGetAllBlogPosts,
	handleGetBlogPostByUserId,
	handleGetUserDetails,
	handleCreateUser,
	handleCheckUser ] = useBlogPostApi();

interface Props {}

const Menu: React.FC<Props> = () => {
	const history = useHistory();
	const user = useContext(AuthContext);
  	const auth = getAuth();

	const onFailure = (error: any) => {
		// TODO: better error handling
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
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						const email = error.email;
						const credential = GoogleAuthProvider.credentialFromError(error);
					});
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
				history.push("/");
			})
	};

	return (
		<MenuView onFailure={onFailure} onSignIn={onSignIn} onSignOut={onSignOut} user={user}/>
	);
};

export default Menu;
