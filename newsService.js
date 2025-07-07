import {getDatabase,ref, set, get, child } from 'firebase/database';
import { rdb } from '../config/firebase';

const NEWS_API_URL = 'https://newsapi.org/v2/everything?q=tesla&from=2025-01-27&sortBy=publishedAt&language=en&apiKey=0a31a8b0e06f43f6ae34d3b4395970d3';

export const fetchAndSaveNews = async () => {
  try {
    const response = await fetch(NEWS_API_URL);
    const data = await response.json();
    const articles = data.articles;

    const db = getDatabase();
    articles.forEach((article, index) => {
      set(ref(db, 'news/' + index), article);
    });

    console.log('News data saved successfully!');
  } catch (error) {
    console.error('Error fetching or saving news:', error);
  }
};

export const fetchNewsData = async () => {
  try {
    const db = getDatabase();
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, 'news'));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      console.log('No data available');
      return [];
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};