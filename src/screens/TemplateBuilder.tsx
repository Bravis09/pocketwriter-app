import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

type Block = {
  id: string;
  type: 'text' | 'image';
  content: string;
};

export default function TemplateBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [textInput, setTextInput] = useState('');

  const addTextBlock = () => {
    if (!textInput.trim()) return;
    setBlocks([...blocks, { id: Date.now().toString(), type: 'text', content: textInput }]);
    setTextInput('');
  };

  const addImageBlock = () => {
    const dummyImage = 'https://via.placeholder.com/300'; // Replace with image picker later
    setBlocks([...blocks, { id: Date.now().toString(), type: 'image', content: dummyImage }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Template Builder</Text>

      <ScrollView style={styles.blockList}>
        {blocks.map((block) => (
          <View key={block.id} style={styles.block}>
            {block.type === 'text' ? (
              <Text style={styles.textBlock}>{block.content}</Text>
            ) : (
              <Image source={{ uri: block.content }} style={styles.imageBlock} />
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.controls}>
        <TextInput
          value={textInput}
          onChangeText={setTextInput}
          placeholder="Type something..."
          style={styles.input}
        />
        <Button title="Add Text" onPress={addTextBlock} />
        <Button title="Add Image" onPress={addImageBlock} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  blockList: { flex: 1, marginBottom: 20 },
  block: { marginBottom: 12 },
  textBlock: { fontSize: 16, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 6 },
  imageBlock: { width: '100%', height: 200, borderRadius: 6 },
  controls: { gap: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 6,
    borderRadius: 6,
  },
});
