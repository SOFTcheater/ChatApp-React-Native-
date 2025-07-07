import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { fetchAndSaveNews, fetchNewsData } from "./newsService";
import { useNavigation } from '@react-navigation/native';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadNews = async () => {
      await fetchAndSaveNews(); 
      const data = await fetchNewsData();
      setNews(data);
    };
    loadNews();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.newsItem}
            onPress={() => navigation.navigate('Article', { article: item })}
          >
            <Image source={{ uri: item.urlToImage }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  newsItem: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default NewsFeed;












