import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './components/Note';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';
import { getAuth } from 'firebase/auth';

export interface INote {
	title: string;
	text: string;
}

interface IProps {
}

interface IState {
	notes: INote[];
	newNoteTitle: string;
	newNoteEquation: string;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Notes'> & IProps;

export default class Notes extends React.Component<TProps, IState> {
	constructor(props: Readonly<TProps>) {
		super(props);

		this.state = {
			notes: [],
			newNoteTitle: '',
			newNoteEquation: ''
		};

		this.onNoteTitleChange = this.onNoteTitleChange.bind(this);
		this.onNoteEquationChange = this.onNoteEquationChange.bind(this);
		this.addNote = this.addNote.bind(this);
	}

	public async componentDidMount() {
		const existing = await this.getStoredNotes();

		this.setState({ notes: existing });
	}

	public async componentWillUnmount() {
		this.storeNotes(this.state.notes);
	}

	private async getStoredNotes(): Promise<INote[]> {
		const suffix = this.props.route.params.user.username + '-' + this.props.route.params.user.password;

		const value = await AsyncStorage.getItem('notes-' + suffix);

		if (value !== null) {
			return JSON.parse(value);
		} else {
			return [];
		}
	}

	private async storeNotes(notes: INote[]) {
		const suffix = this.props.route.params.user.username + '-' + this.props.route.params.user.password;

		const jsonValue = JSON.stringify(notes);
		await AsyncStorage.setItem('notes-' + suffix, jsonValue);
	}

	private onNoteTitleChange(value: string) {
		this.setState({ newNoteTitle: value });
	}

	private onNoteEquationChange(value: string) {
		this.setState({ newNoteEquation: value });
	}	

	private addNote() {
		const note: INote = {
			title: this.state.newNoteTitle,
			text: this.state.newNoteEquation
		};

		/******************************************
		 * Group 11 - Lab 3 Cross-Platform Security
		 * Fix Vulnerability for Input Validation	
		 * Check trimmed value		
		 * ****************************************/
		//if (note.title === '' || note.text === '') {
		if (note.title.trim() === '' || note.text.trim() === '') {
			Alert.alert('Error', 'Title and equation cannot be empty.');
			return;
		}
		/******************************************/

		/******************************************
		 * Group 11 - Lab 3 Cross-Platform Security
		 * Fix Vulnerability for Input Validation	
		 * Check if user input a math equation with digit and operands		
		 * ****************************************/
		if (!/^[\d+\-*/().^]+$/.test(note.text.trim())) {
			Alert.alert('Please input a math equation, e.g. 1+2');
			return;
		}
		/******************************************/

		this.setState({ 
			notes: this.state.notes.concat(note),
			newNoteTitle: '',
			newNoteEquation: ''
		});
	}

	private async handleLogout() {
		try {
            const auth = getAuth();
            await auth.signOut();            
			this.props.navigation.navigate('Login');
        } catch (error) {
            console.error('Error:', (error as Error).message);
        }
	}

	public render() {
		return (
			<SafeAreaView>
				<ScrollView contentInsetAdjustmentBehavior="automatic">
					<View style={styles.container}>
						<Button title="Logout" onPress={this.handleLogout} />
						<Text style={styles.title}>
							{'Math Notes: ' + this.props.route.params.user.username}
						</Text>
						<TextInput
							style={styles.titleInput}
							value={this.state.newNoteTitle}
							onChangeText={this.onNoteTitleChange}
							placeholder="Enter your title"
						/>
						<TextInput
							style={styles.textInput}
							value={this.state.newNoteEquation}
							onChangeText={this.onNoteEquationChange}
							placeholder="Enter your math equation"
						/>
						<Button title="Add Note" onPress={this.addNote} />

						<View style={styles.notes}>
							{this.state.notes.map((note, index) => (
								<Note key={index} title={note.title} text={note.text} />
							))}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
}

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
		marginTop: 10
	},
	titleInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	textInput: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
	notes: {
		marginTop: 15
	},
});