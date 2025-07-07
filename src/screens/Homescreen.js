/* import React, { useEffect, useState } from 'react';

import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { fetchNewsData } from './newsService'; // Assuming you have a newsService.js file

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchNewsData();
      setPosts(data);
    };
    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PostDetails", { post: item })}
          >
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.bookCover }} style={styles.image} />
              <Card.Content>
                <Title style={styles.title}>{item.bookName}</Title>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("CreatePostScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});

export default HomeScreen;*/

















import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { rdb} from '../config/firebase'; 
import {ref, onValue } from 'firebase/database'; 

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const postsRef = ref(rdb, "posts");

    
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedPosts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPosts(formattedPosts.reverse()); 
      }
    });

    return () => {}; 
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PostDetails", { post: item })}
          >
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.bookCover }} style={styles.image} />
              <Card.Content>
                <Title style={styles.title}>{item.bookName}</Title>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        color="#fff" // White plus icon
        onPress={() => navigation.navigate("CreatePostScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    height: 400,
    width: '100%',
  
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
});

export default HomeScreen;

