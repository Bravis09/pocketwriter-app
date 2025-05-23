import axios from 'axios';
import { Article } from '../types/Article';


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Button } from 'react-native';
import api from '../services/api';

export default function FeedScreen({ navigation }: any) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await axios.get<Article[]>('http://<your-local-ip>:8080/api/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchArticles();
}, []);


  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ArticleDetail', { id: item.id })}
      style={styles.card}
    >
      <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
      <Text numberOfLines={2} style={styles.preview}>{item.contentPreview}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
      <View style={{ padding: 10 }}>
        <Button
          title="Go to Template Builder"
          onPress={() => navigation.navigate('TemplateBuilder')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  preview: {
    fontSize: 14,
    color: '#666',
  },
});
