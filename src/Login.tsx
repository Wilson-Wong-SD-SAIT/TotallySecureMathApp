import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';
/******************************************
 * Group 11 - Lab 3 Cross-Platform Security
 * Secure Data Storage and Authentication Enhancement	
 * Implement secure authentication practices to address any improper authentication vulnerabilities	
 * ****************************************/
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // API key for accessing Firebase services
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, // Domain for Firebase authentication
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // ID of the Firebase project
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // Storage bucket for Firebase storage service
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // Sender ID for Firebase messaging
	appId: process.env.REACT_APP_FIREBASE_APP_ID, // App ID for the Firebase application
  };

firebase.initializeApp(firebaseConfig);

/******************************************/  


export interface IUser {
	username: string;
	password: string;
}

interface IProps {
	onLogin: (user: IUser) => void;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Login'> & IProps;

export default function Login(props: TProps) {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	/******************************************
	 * Group 11 - Lab 3 Cross-Platform Security
	 * Secure Data Storage and Authentication Enhancement	
	 * Implement secure authentication practices to address any improper authentication vulnerabilities	
	 * ****************************************/
	/*
	const users: IUser[] = [
		{ username: 'joe', password: 'secret' },
		{ username: 'bob', password: 'password' },
	];

	function login() {
		let foundUser: IUser | false = false;

		for (const user of users) {
			if (username === user.username && password === user.password) {
				foundUser = user;

				break;
			}
		}

		if (foundUser) {
			props.onLogin(foundUser);
		} else {
			Alert.alert('Error', 'Username or password is invalid.');
		}
	}
	*/
	const auth = getAuth();
	const login = async() => {
		try {
			
			if(username.trim() == '') {
				Alert.alert('Error', 'Please enter the username.')
				return;
			}
			if(password.trim() == '') {
				Alert.alert('Error', 'Please enter the password.')
				return;
			}
			const response = await signInWithEmailAndPassword(auth, username, password);
			if(response) {
				let foundUser: IUser | false = false;
				foundUser = { username: username, password: password };
				props.onLogin(foundUser);
			}
			else {
				Alert.alert('Error', 'Username or password is invalid.');
				return;
			}
		} catch (error) {
			console.error('Error:', (error as Error).message);
		}
	}
	/******************************************/  

	/****For Testing Only****/
	/* const signup = async() => {
		try {
			const response = await createUserWithEmailAndPassword(firebase_auth, username, password);
			console.log(response);
		} catch (error) {
			console.error('Error authenticate securely', error);
			throw(error);
		}
	}*/

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login by Firebase Account</Text>
			<TextInput
				style={styles.username}
				value={username}
				onChangeText={setUsername}
				placeholder="Username"
			/>
			<TextInput
				/******************************************
	 			 * Group 11 - Lab 3 Cross-Platform Security
				 * Authentication Enhancement
				 * Add css to mask the password input field
				 *****************************/
				style={styles.password}				
				secureTextEntry={true}
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
				/******************************************/  
			/>
			<Button title="Login" onPress={login} />			
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	username: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	password: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},	
});