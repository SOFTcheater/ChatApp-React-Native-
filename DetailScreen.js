import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const ArticleScreen = ({ route }) => {
  const { article } = route.params;

  return (
    <ScrollView style={styles.container}>
      {article.urlToImage && <Image source={{ uri: article.urlToImage }} style={styles.image} />}
      <Text style={styles.title}>{article.title}</Text>
      {article.description && <Text style={styles.description}>{article.description}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  description: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
    fontStyle: 'italic',

  },
  contentContainer: {
    marginTop: 10,
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24, 
  },
});

export default ArticleScreen;
