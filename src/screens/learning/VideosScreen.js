import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Clock, Share2 } from 'lucide-react-native';

const VIDEOS = [
  { id: '1', title: 'Algebraic Expressions', subject: 'Math', duration: '12:45', teacher: 'Mr. Smith', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=200&auto=format&fit=crop' },
  { id: '2', title: 'Chemical Bonding', subject: 'Science', duration: '15:20', teacher: 'Dr. Khoza', thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9d39d9992?q=80&w=200&auto=format&fit=crop' },
  { id: '3', title: 'Essay Writing Tips', subject: 'English', duration: '08:15', teacher: 'Ms. Peterson', thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=200&auto=format&fit=crop' },
];

export default function VideosScreen() {
  const renderVideo = ({ item }) => (
    <TouchableOpacity style={styles.videoCard}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.playOverlay}>
           <Play size={24} color="#fff" fill="#fff" />
        </View>
        <View style={styles.durationBadge}>
           <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoMeta}>{item.subject} • {item.teacher}</Text>
        <View style={styles.actionRow}>
           <TouchableOpacity style={styles.actionBtn}>
              <Clock size={16} color="#64748b" />
              <Text style={styles.actionText}>Later</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionBtn}>
              <Share2 size={16} color="#64748b" />
              <Text style={styles.actionText}>Share</Text>
           </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video Lessons</Text>
        <TouchableOpacity style={styles.uploadBtn}>
           <Text style={styles.uploadBtnText}>Teacher Upload</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={VIDEOS}
        renderItem={renderVideo}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  uploadBtn: { backgroundColor: '#6366f115', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10 },
  uploadBtnText: { color: '#6366f1', fontWeight: 'bold', fontSize: 13 },
  list: { paddingHorizontal: 20 },
  videoCard: { backgroundColor: '#fff', borderRadius: 20, marginBottom: 20, overflow: 'hidden', elevation: 2 },
  thumbnailContainer: { height: 180, width: '100%', position: 'relative' },
  thumbnail: { width: '100%', height: '100%', backgroundColor: '#e2e8f0' },
  playOverlay: { position: 'absolute', top: '50%', left: '50%', marginLeft: -25, marginTop: -25, width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(99, 102, 241, 0.8)', justifyContent: 'center', alignItems: 'center' },
  durationBadge: { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  durationText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  videoInfo: { padding: 15 },
  videoTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  videoMeta: { fontSize: 13, color: '#64748b', marginTop: 4 },
  actionRow: { flexDirection: 'row', marginTop: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  actionText: { marginLeft: 6, fontSize: 12, color: '#64748b', fontWeight: '600' },
});
