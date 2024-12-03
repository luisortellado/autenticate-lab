import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {login} from '../services/AuthService';
import * as Keychain from 'react-native-keychain';
import {useAuth} from '../../App';

const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {setIsAuthenticated} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const {token, expiresAt} = await login(username, password);
      // Store JWT securely
      await Keychain.setGenericPassword(
        'authToken',
        JSON.stringify({token, expiresAt}),
      );
      setIsAuthenticated(true);
      setTimeout(() => navigation.navigate('Profile'), 300);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  input: {borderWidth: 1, marginVertical: 8, padding: 8},
  error: {color: 'red', marginTop: 8},
});

export default LoginScreen;
