import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import ImageViewing from 'react-native-image-viewing';

const DetailScreen = ({ route }) => {
  const { article } = route.params;
  const [isImageViewVisible, setImageViewVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => setImageViewVisible(true)}>
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.date}>{new Date(article.publishedAt).toDateString()}</Text>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.content}>{article.content}</Text>
      <Text style={styles.author}>Author: {article.author || 'Unknown'}</Text>
      <Text
        style={styles.source}
        onPress={() => Linking.openURL(article.url)}
      >
        Read more
      </Text>
      <ImageViewing
        images={[{ uri: article.urlToImage }]}
        imageIndex={0}
        visible={isImageViewVisible}
        onRequestClose={() => setImageViewVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  date: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  source: {
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
});

export default DetailScreen;
