import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-web';

export default function AllGames () {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://163.172.177.98:8081/game', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGames(response.data.games.slice(0, 100));
      } catch (error) {
        console.error('Error fetching games: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <div style={styles.divContainer}>
        <View style={styles.container}>
        <Text style={styles.title}>Available Games:</Text>
        <FlatList
            data={games}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
            <View style={styles.gameContainer}>
                <Text style={styles.gameText}>{index + 1}. {item.id}</Text>
                <Text style={styles.gameText}>Status: {item.status}</Text>
                <Text style={styles.gameText}>Player 1: {item.player1.email}</Text>
                <Text style={styles.gameText}>Player 2: {item.player2.email}</Text>
                <Text>player1id: {item.player1Id}</Text>
                <Text>player2Id {item.player2Id}</Text>
                <Text>playerToMoveId {item.playerToMoveId}</Text>
            </View>
            )}
        />
        </View>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  divContainer:{
    overflow: scroll,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gameContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  gameText: {
    fontSize: 16,
    marginBottom: 5,
  },
});




