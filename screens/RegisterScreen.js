import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { register } from '../api/auth';
import { styles } from '../styles';


export default function RegisterScreen ({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const data = await register(email, password);
      navigation.navigate('Login');
    } catch (err) {
      setError('Registration failed');
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};
