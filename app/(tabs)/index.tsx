import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [userName, userNameChangeText] = React.useState('User Name');
  const [password, passwordChangeText] = React.useState('Password');

  return (
    <View style={styles.loginFrame}>
      <SafeAreaView style={styles.loginArea}>
        <Text style={styles.basicText}>Welcome</Text>
        <TextInput
          style={styles.loginınput}
          onChangeText={userNameChangeText}
          value={userName}
        />
        <TextInput
          style={styles.loginınput}
          onChangeText={passwordChangeText}
          value={password}
        />
        <View style={styles.loginButton}>
          <Button
            // onPress={onPressLearnMore}
            title="Sign In"
            color={'#fff'}
          />
        </View>
        <View style={styles.signButton}>
          <Pressable>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 14, // Set the font size
    textDecorationLine: 'underline', // Add text decoration
    color: '#000', // Set text color
    textAlign: 'center',
  },
  signButton: {
    height: 40,
    width: 200,
    marginTop: 50,
  },
  loginButton: {
    height: 40,
    width: 200,
    borderRadius: 5,
    color: '#fff',
    borderWidth: 1,
    backgroundColor: '#000',
    marginTop: 20,
  },
  loginArea: {
    width: 300,
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f2ec',
    borderRadius: 5,
  },

  basicText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  loginınput: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  loginFrame: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});