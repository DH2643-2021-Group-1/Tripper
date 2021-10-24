import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = React.createContext<any | null>(null);

export const AuthProvider: React.FC<{}> = ({ children }) => {
	const auth = getAuth();
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user: any) => {
			console.log(user);
			if (user) {
				setUser(user);
			} else {
            	setUser(null);
            }
		});
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
