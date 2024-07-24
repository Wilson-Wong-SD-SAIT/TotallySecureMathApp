import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as math from 'mathjs';

interface IProps {
	title: string;
	text: string;
}

function Note(props: IProps) {
	function evaluateEquation() {
		
		/******************************************
		 * Group 11 - Lab 3 Cross-Platform Security
		 * Fix Vulnerability for Code Injection Prevention and Input Validation
		 * 1. Use math.evaluate instead of eval()
		 * 2. Add try catch
		 * ****************************************/
		//const result = eval(props.text);	
		//Alert.alert('Result', 'Result: ' + result);
		try {
			const result = math.evaluate(props.text);				
			Alert.alert('Result', 'Result: ' + result);			
		}
		catch (error) {
			console.error('Error:', (error as Error).message);
		}	
		/******************************************/	
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{props.title}
			</Text>
			<Text style={styles.text}>
				{props.text}
			</Text>
			<View style={styles.evaluateContainer}>
				<Button title='Evaluate' onPress={evaluateEquation} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: '#fff',
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	text: {
		fontSize: 16,
	},
	evaluateContainer: {
		marginTop: 10,
		marginBottom: 10
	}
});

export default Note;