import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, ArrowLeft, Phone, Video } from 'lucide-react-native';
import { chatService } from '../services/chatService';
import { auth } from '../firebase/config';

export default function ChatScreen({ route, navigation }) {
  const { tutor } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  const chatId = chatService.getChatId(tutor.id || 'demo_tutor', auth.currentUser?.uid || 'demo_user');

  useEffect(() => {
    // Demo fallback if Firebase not connected
    if (!auth.currentUser) {
      setMessages([
        { id: '1', text: `Hi! I'm ${tutor.name}. How can I help you?`, senderId: 'tutor', createdAt: new Date() },
      ]);
      return;
    }

    const unsubscribe = chatService.subscribeToMessages(chatId, (newMessages) => {
      setMessages(newMessages);
    });

    return unsubscribe;
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    if (!auth.currentUser) {
       // Demo mode
       setMessages(prev => [...prev, { id: Date.now().toString(), text: inputText, senderId: 'user', createdAt: new Date() }]);
       setInputText('');
       return;
    }

    try {
      await chatService.sendMessage(chatId, auth.currentUser.uid, inputText);
      setInputText('');
    } catch (error) {
       console.error(error);
    }
  };

  const renderMessage = ({ item }) => {
    const isMine = item.senderId === (auth.currentUser?.uid || 'user');
    return (
      <View style={[styles.messageBubble, isMine ? styles.myMessage : styles.theirMessage]}>
        <Text style={[styles.messageText, isMine ? styles.myMessageText : styles.theirMessageText]}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{tutor.name}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
           <Phone size={20} color="#6366f1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
           <Video size={20} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <View style={styles.safetyBanner}>
        <Text style={styles.safetyText}>🛡️ Safe-Pay: Never pay outside the app to avoid scams.</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerInfo: { flex: 1, marginLeft: 15 },
  headerName: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  headerStatus: { fontSize: 12, color: '#10b981' },
  headerIcon: { marginLeft: 15 },
  safetyBanner: {
    backgroundColor: '#fffbeb',
    padding: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fef3c7',
  },
  safetyText: { fontSize: 11, color: '#d97706', fontWeight: '600' },
  messageList: { padding: 20 },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6366f1',
    borderBottomRightRadius: 2,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  messageText: { fontSize: 15 },
  myMessageText: { color: '#fff' },
  theirMessageText: { color: '#1e293b' },
  inputArea: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 15,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
