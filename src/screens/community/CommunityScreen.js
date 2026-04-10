import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageSquare, FileText, Bell, Users, GraduationCap } from 'lucide-react-native';

export default function CommunityScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Community</Text>
          <Text style={styles.subtitle}>Parent & Teacher Connection Hub</Text>
        </View>

        <View style={styles.alertCard}>
           <Bell size={20} color="#fff" />
           <Text style={styles.alertText}>New Weekly Report from Mr. Smith available.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
             <ActionIcon icon={MessageSquare} label="Chats" color="#6366f1" />
             <ActionIcon 
               icon={FileText} 
               label="Reports" 
               color="#f59e0b" 
               onPress={() => navigation.navigate('TeacherReport')} 
             />
             <ActionIcon icon={Users} label="Groups" color="#10b981" />
             <ActionIcon 
               icon={GraduationCap} 
               label="Training" 
               color="#ed64a6" 
               onPress={() => navigation.navigate('TeacherTraining')} 
             />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teacher Reports</Text>
          <ReportCard 
            teacher="Mr. Smith" 
            subject="Mathematics" 
            performance="Exceeded" 
            date="Week 12 (Mar 10)" 
          />
          <ReportCard 
            teacher="Dr. Khoza" 
            subject="Physical Science" 
            performance="Good" 
            date="Week 11 (Mar 03)" 
          />
        </View>

        <TouchableOpacity style={styles.forumBtn}>
           <Text style={styles.forumBtnText}>Open Parent Forum</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const ActionIcon = ({ icon: Icon, label, color, onPress }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <View style={[styles.actionIcon, { backgroundColor: color + '15' }]}>
       <Icon size={24} color={color} />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const ReportCard = ({ teacher, subject, performance, date }) => (
  <TouchableOpacity style={styles.reportCard}>
     <View style={styles.reportInfo}>
        <Text style={styles.reportSubject}>{subject}</Text>
        <Text style={styles.reportTeacher}>Level: {teacher}</Text>
        <Text style={styles.reportDate}>{date}</Text>
     </View>
     <View style={[styles.perfBadge, { backgroundColor: performance === 'Exceeded' ? '#dcfce7' : '#fef9c3' }]}>
        <Text style={[styles.perfText, { color: performance === 'Exceeded' ? '#16a34a' : '#a16207' }]}>{performance}</Text>
     </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 25 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 5 },
  alertCard: {
    backgroundColor: '#6366f1',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  alertText: { flex: 1, color: '#fff', fontSize: 13, fontWeight: 'bold', marginLeft: 10 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 20 },
  actionGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  actionItem: { alignItems: 'center' },
  actionIcon: { width: 55, height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionLabel: { fontSize: 12, fontWeight: 'bold', color: '#64748b' },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  reportInfo: { flex: 1 },
  reportSubject: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  reportTeacher: { fontSize: 13, color: '#64748b', marginTop: 4 },
  reportDate: { fontSize: 11, color: '#94a3b8', marginTop: 6 },
  perfBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  perfText: { fontSize: 11, fontWeight: 'bold' },
  forumBtn: { width: '100%', padding: 18, borderRadius: 16, backgroundColor: '#1e293b', alignItems: 'center', marginTop: 10 },
  forumBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
