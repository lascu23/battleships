import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { login } from '../api/auth';
import { styles } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      const accessToken = data.accessToken;
      await AsyncStorage.setItem('token', accessToken);
      console.log('Token:',accessToken);
      navigation.navigate('Home');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

