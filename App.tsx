// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './src/screens/FeedScreen';
import ArticleDetail from './src/screens/ArticleDetail';
import TemplateBuilder from './src/screens/TemplateBuilder';
import ArticleEditor from './src/screens/ArticleEditor';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="TemplateBuilder" component={TemplateBuilder} />
        <Stack.Screen name="ArticleEditor" component={ArticleEditor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
