import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '@composables/useTranslation';

export default function BugReportScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { translations } = useTranslation();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        mode="outlined"
        label={translations['title']}
        value={title}
        onChangeText={title => setTitle(title)}
      />
      <TextInput
        style={styles.content}
        mode="outlined"
        label={translations['content']}
        value={content}
        onChangeText={content => setContent(content)}
        multiline={true}
      />
      <Button
        icon="message"
        mode="contained"
        onPress={() => console.log('pressed')}>
        Send Bug Report
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    marginBottom: 20,
  },
  content: {
    marginBottom: 20,
    height: 140,
  },
});
