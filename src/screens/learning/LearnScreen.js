import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlayCircle, BookOpen, Clock, ChevronRight } from 'lucide-react-native';

export default function LearnScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Self-Study Hub</Text>
          <Text style={styles.subtitle}>What would you like to master today?</Text>
        </View>

        {/* ONE BUTTON LEARN */}
        <TouchableOpacity style={styles.oneButtonLearn}>
           <View style={styles.oneButtonContent}>
              <PlayCircle size={60} color="#fff" />
              <View style={styles.oneButtonTextContainer}>
                <Text style={styles.oneButtonTitle}>ONE BUTTON LEARN</Text>
                <Text style={styles.oneButtonSubtitle}>Start your next lesson instantly</Text>
              </View>
           </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Subjects</Text>
          <SubjectCard title="Mathematics" progress={75} color="#6366f1" />
          <SubjectCard title="Physical Science" progress={40} color="#f59e0b" />
          <SubjectCard title="English HL" progress={90} color="#10b981" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Library</Text>
          <TouchableOpacity style={styles.libItem}>
             <BookOpen size={20} color="#64748b" />
             <Text style={styles.libText}>Past Papers (Grade 12)</Text>
             <ChevronRight size={20} color="#cbd5e1" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.libItem}>
             <Clock size={20} color="#64748b" />
             <Text style={styles.libText}>Revision Quizzes</Text>
             <ChevronRight size={20} color="#cbd5e1" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SubjectCard = ({ title, progress, color }) => (
  <View style={styles.card}>
    <View style={styles.cardTop}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardProgress}>{progress}%</Text>
    </View>
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 25 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 5 },
  oneButtonLearn: {
    backgroundColor: '#6366f1',
    borderRadius: 24,
    padding: 25,
    marginBottom: 30,
    elevation: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  oneButtonContent: { flexDirection: 'row', alignItems: 'center' },
  oneButtonTextContainer: { marginLeft: 20 },
  oneButtonTitle: { fontSize: 20, fontWeight: '900', color: '#fff' },
  oneButtonSubtitle: { fontSize: 13, color: '#e0e7ff', marginTop: 4 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 15, marginBottom: 15, elevation: 2 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  cardProgress: { fontSize: 12, fontWeight: 'bold', color: '#64748b' },
  progressBg: { height: 8, backgroundColor: '#f1f5f9', borderRadius: 4 },
  progressFill: { height: '100%', borderRadius: 4 },
  libItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
  },
  libText: { flex: 1, marginLeft: 15, fontSize: 15, color: '#1e293b' },
});
