import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlayCircle, Upload, FileText, ArrowLeft, GraduationCap } from 'lucide-react-native';

export default function TeacherTrainingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <ArrowLeft size={30} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Teacher Training Hub</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.introCard}>
           <GraduationCap size={40} color="#fff" />
           <Text style={styles.introTitle}>Welcome, Educator</Text>
           <Text style={styles.introText}>We make teaching simple. Choose a training module below to start.</Text>
        </View>

        <TrainingModule 
          icon={PlayCircle} 
          title="1. How to Record" 
          desc="Step-by-step guide on recording your high-quality video lesson." 
          color="#6366f1"
        />
        
        <TrainingModule 
          icon={Upload} 
          title="2. How to Upload" 
          desc="Learn how to share your lessons with the Pretoria community." 
          color="#10b981"
        />

        <TrainingModule 
          icon={FileText} 
          title="3. Weekly Reports" 
          desc="Simple instructions on sending progress updates to parents." 
          color="#f59e0b"
          onPress={() => navigation.navigate('TeacherReport')}
        />

        <TouchableOpacity style={styles.supportBtn}>
           <Text style={styles.supportBtnText}>Need 24/7 Tech Support?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const TrainingModule = ({ icon: Icon, title, desc, color, onPress }) => (
  <TouchableOpacity style={styles.modCard} onPress={onPress}>
    <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
       <Icon size={32} color={color} />
    </View>
    <View style={styles.modInfo}>
       <Text style={styles.modTitle}>{title}</Text>
       <Text style={styles.modDesc}>{desc}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  scrollContent: { padding: 20 },
  introCard: { backgroundColor: '#1e293b', borderRadius: 24, padding: 25, marginBottom: 30 },
  introTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 15 },
  introText: { color: '#94a3b8', fontSize: 14, marginTop: 8, lineHeight: 22 },
  modCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 15, elevation: 2 },
  iconBox: { width: 65, height: 65, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  modInfo: { flex: 1, marginLeft: 15 },
  modTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  modDesc: { fontSize: 13, color: '#64748b', marginTop: 4 },
  supportBtn: { padding: 20, alignItems: 'center', marginTop: 10 },
  supportBtnText: { color: '#6366f1', fontWeight: 'bold', fontSize: 16 },
});
