import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [refresh, setRefresh] = useState(false);

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, tasks, setTasks, refresh, setRefresh }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
