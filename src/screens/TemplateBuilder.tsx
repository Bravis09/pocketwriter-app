import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

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
  const dummyImage = 'https://source.unsplash.com/random/600x400?sig=' + Date.now();
  const newBlock: Block = {
    id: Date.now().toString(),
    type: 'image',
    content: dummyImage,
  };
  console.log('Adding image block:', newBlock);
  setBlocks([...blocks, newBlock]);
};


  const renderItem = ({ item, drag, isActive }: RenderItemParams<Block>) => (
    <TouchableOpacity
      onLongPress={drag}
      disabled={isActive}
      style={[
        styles.block,
        { opacity: isActive ? 0.7 : 1, backgroundColor: '#fff' },
      ]}
    >
      {item.type === 'text' ? (
        <Text style={styles.textBlock}>{item.content}</Text>
      ) : (
        <Image source={{ uri: item.content }} style={styles.imageBlock} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Template Builder</Text>

      <DraggableFlatList
        data={blocks}
        onDragEnd={({ data }) => setBlocks(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

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
  block: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    backgroundColor: '#f8f8f8',
  },
  textBlock: { fontSize: 16 },
  imageBlock: { width: '100%', height: 200, borderRadius: 6, borderWidth:2, borderColor:'red', },
  controls: { gap: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 6,
    borderRadius: 6,
  },
});
