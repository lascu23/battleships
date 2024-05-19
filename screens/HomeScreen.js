import React from 'react';
import { View, Button } from 'react-native';
import { styles } from '../styles';


export default function HomeScreen ({ navigation }) {
  return (
    <View style={styles.container}>
      <Button style={styles.button}
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      <Button style={styles.button}
        title="Login"
        onPress={() => navigation.navigate('Login')}
  
      />
      <Button style={styles.button}
        title="Details"
        onPress={() => navigation.navigate('UserDetails')}
      />
      <Button style={styles.button}
        title="Games"
        onPress={() => navigation.navigate('Games')}
      />
    </View>
  );
};