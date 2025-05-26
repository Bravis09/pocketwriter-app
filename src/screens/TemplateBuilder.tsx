import api from '../services/api'; // make sure this is at the top of the file
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
  const [templateName, setTemplateName] = useState('');


  const addTextBlock = () => {
    if (!textInput.trim()) return;
    setBlocks([...blocks, { id: Date.now().toString(), type: 'text', content: textInput }]);
    setTextInput('');
  };

 const addImageBlock = () => {
  const dummyImage = 'https://image-processor-storage.s3.us-west-2.amazonaws.com/images/281c2d4581ed27c8a258b0e79bc504ad/halo-of-neon-ring-illuminated-in-the-stunning-landscape-of-yosemite.jpg';
  const newBlock: Block = {
    id: Date.now().toString(),
    type: 'image',
    content: dummyImage,
  };
  console.log('Adding image block:', newBlock);
  setBlocks([...blocks, newBlock]);
};

const handleSaveTemplate = async () => {
  if (!templateName.trim()) {
    alert('Please enter a template name');
    return;
  }

  try {
    const response = await api.post('/templates', {
      name: templateName,
      layout: blocks,
    });

    alert('Template saved successfully!');
    setTemplateName('');
  } catch (error) {
    console.error('Error saving template:', error);
    alert('Failed to save template');
  }
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
        <TextInput
           placeholder="Template Name"
           value={templateName}
           onChangeText={setTemplateName}
           style={styles.input}
        />
        <Button title="Save Template" onPress={handleSaveTemplate} />

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
  imageBlock: { width: '50%', height: 300, borderRadius: 6, borderWidth:2, borderColor:'red', },
  controls: { gap: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 6,
    borderRadius: 6,
  },
});
