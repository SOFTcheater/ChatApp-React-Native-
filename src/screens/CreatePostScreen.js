/* import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CreatePostScreen = ({ route }) => {
  const navigation = useNavigation();
  const [bookName, setBookName] = useState('');
  const [bookCover, setBookCover] = useState(null);
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
   
  // Function to fetch book cover from Google Books API
  const fetchBookCover = async () => {
    if (!bookName) return Alert.alert("Please enter a book name.");
    
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=1`
      );
      const book = response.data.items[0];
      if (book) {
        const coverUrl = book.volumeInfo.imageLinks?.thumbnail;
        setBookCover(coverUrl || null);
      } else {
        Alert.alert("No cover found for this book.");
      }
    } catch (error) {
      Alert.alert("Error fetching book cover.");
    }
  };

  const submitPost = () => {
    if (!bookName || !description) {
      return Alert.alert("Please fill all fields.");
    }

    navigation.navigate('HomeScreen', {
      posts: [{ bookName, subtitle, description, bookCover }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Book Name</Text>
      <TextInput
        placeholder="Enter book name"
        value={bookName}
        onChangeText={setBookName}
        style={styles.input}
      />
      <Text style={styles.label}>Subtitle</Text>
      <TextInput
        placeholder="Enter subtitle"
        value={subtitle}
        onChangeText={setSubtitle}
        style={styles.input}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        multiline
      />
      {bookCover && <Image source={{ uri: bookCover }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={fetchBookCover}>
        <Text style={styles.buttonText}>Fetch Book Cover</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={submitPost}>
        <Text style={styles.buttonText}>Submit Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePostScreen;*/

import React, { useState } from 'react';
import { 
  View, Text, TextInput, Image, TouchableOpacity, 
  StyleSheet, Alert, ScrollView 
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { rdb}from '../config/firebase'
import { ref, push } from 'firebase/database';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const [bookName, setBookName] = useState('');
  const [bookCover, setBookCover] = useState(null);
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');

  // Function to fetch book cover from Google Books API
  const fetchBookCover = async () => {
    if (!bookName) return Alert.alert("Please enter a book name.");
    
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=1`
      );
      const book = response.data.items[0];
      if (book) {
        const coverUrl = book.volumeInfo.imageLinks?.thumbnail;
        setBookCover(coverUrl || null);
      } else {
        Alert.alert("No cover found for this book.");
      }
    } catch (error) {
      Alert.alert("Error fetching book cover.");
    }
  };

  const submitPost = () => {
    if (!bookName || !description) {
      return Alert.alert("Please fill all fields.");
    }

    // Save post to Firebase Realtime Database
    push(ref(rdb, "posts"), {
      bookName,
      subtitle,
      description,
      bookCover,
    });

    Alert.alert("Success", "Post Created!");
    navigation.goBack(); // Return to HomeScreen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Book Name</Text>
      <TextInput
        placeholder="Enter book name"
        value={bookName}
        onChangeText={setBookName}
        style={styles.input}
      />
      <Text style={styles.label}>Subtitle</Text>
      <TextInput
        placeholder="Enter subtitle"
        value={subtitle}
        onChangeText={setSubtitle}
        style={styles.input}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        multiline
      />
      {bookCover && <Image source={{ uri: bookCover }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={fetchBookCover}>
        <Text style={styles.buttonText}>Fetch Book Cover</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={submitPost}>
        <Text style={styles.buttonText}>Submit Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePostScreen;
