import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';
/* b.	Implement secure authentication practices to address any improper authentication vulnerabilities. */
import { firebase_auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

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
	/* b.	Implement secure authentication practices to address any improper authentication vulnerabilities. 
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
	const auth = firebase_auth;
	const login = async() => {
		try {
			const response = await signInWithEmailAndPassword(auth, username, password);
			if(response) {
				let foundUser: IUser | false = false;
				foundUser = { username: username, password: password };
				props.onLogin(foundUser);
			}else {
				Alert.alert('Error', 'Username or password is invalid.');
			}
		} catch (error) {
			console.error('Error authenticate securely', error);
			throw(error);
		}
	}
	const signup = async() => {
		try {
			const response = await createUserWithEmailAndPassword(auth, username, password);
			console.log(response);
		} catch (error) {
			console.error('Error authenticate securely', error);
			throw(error);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={styles.username}
				value={username}
				onChangeText={setUsername}
				placeholder="Username"
			/>
			<TextInput
				style={styles.password}
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
			/>
			<Button title="Login" onPress={login} />
			<Button title="Sign Up" onPress={signup} />
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
	}
});