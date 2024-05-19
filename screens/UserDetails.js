import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles';

export default function UserDetails () {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://163.172.177.98:8081/user/details/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserDetails(response.data);
      } catch (err) {
        console.error('Error fetching user details', err);
        setError('Failed to fetch user details');
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const renderUserDetails = () => {
    if (userDetails) {
      return (
        <>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userDetailsText}>Name: {userDetails.user.email}</Text>
            <Text style={styles.userDetailsText}>Games Played: {userDetails.gamesPlayed}</Text>
            <Text style={styles.userDetailsText}>Games Lost: {userDetails.gamesLost}</Text>
            <Text style={styles.userDetailsText}>Games Won: {userDetails.gamesWon}</Text>
            <Text style={styles.userDetailsText}>Currently Games Playing: {userDetails.currentlyGamesPlaying}</Text>
          </View>
      </>
      );
    } else {
      return <Text>No user details available</Text>;
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderUserDetails()}
    </View>
  );
};
