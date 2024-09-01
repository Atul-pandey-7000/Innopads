import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import axios from 'axios';

const HomeScreen = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    // Call fetchNews without any search query initially
    fetchNews('');
  }, [sortOrder]);

  const fetchNews = async query => {
    try {
      // Set the URL based on whether the query is empty or not
      const url = query
        ? `https://newsapi.org/v2/everything?q=${query}&sortBy=${
            sortOrder === 'newest' ? 'publishedAt' : 'relevancy'
          }&apiKey=008b6b8ea2d94811a367b0e1be9066c4`
        : `https://newsapi.org/v2/everything?q={}&apiKey=008b6b8ea2d94811a367b0e1be9066c4`;

      // Log the constructed URL for debugging
      console.log('Fetching news with URL:', url);

      const response = await axios.get(url);

      // Log the response to debug
      console.log('API Response:', response.data);

      // Update the state with the news articles
      setNews(response.data.articles);
    } catch (error) {
      // Log errors to the console for debugging
      console.error('Error fetching news:', error);
    }
  };

  // Handler for the search button click
  const handleSearch = () => {
    fetchNews(searchQuery); // Re-fetch news based on the updated search query
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {article: item})}>
      <View style={styles.newsItem}>
        <Image source={{uri: item.urlToImage}} style={styles.newsImage} />
        <View style={styles.newsContent}>
          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search news by title"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <Button title={`Sort by ${sortOrder}`} onPress={toggleSortOrder} />
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    overflow: 'hidden',
  },
  newsImage: {
    width: 100,
    height: 100,
  },
  newsContent: {
    flex: 1,
    padding: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
