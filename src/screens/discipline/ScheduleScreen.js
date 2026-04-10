import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, CheckCircle2, Circle } from 'lucide-react-native';

const ROUTINE = [
  { time: '06:30', task: 'Wake Up & Prayer', done: true },
  { time: '07:00', task: 'Gym / Stretching', done: true },
  { time: '15:00', task: 'Math Homework', done: false },
  { time: '17:30', task: 'Life Science Revision', done: false },
  { time: '19:00', task: 'Supper', done: false },
  { time: '21:00', task: 'Sleep', done: false },
];

export default function ScheduleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Discipline</Text>
          <Text style={styles.subtitle}>Success is built on routine. 🇿🇦</Text>
        </View>

        <View style={styles.focusCard}>
           <Text style={styles.focusLabel}>Focus Score</Text>
           <Text style={styles.focusValue}>85%</Text>
           <View style={styles.focusProgress}>
              <View style={[styles.focusFill, { width: '85%' }]} />
           </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
             <Text style={styles.sectionTitle}>Daily Routine</Text>
             <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.addBtnText}>+ Add</Text>
             </TouchableOpacity>
          </View>

          {ROUTINE.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.taskItem, item.done && styles.taskDone]}>
               <View style={styles.taskTimeBox}>
                  <Text style={[styles.taskTime, item.done && styles.taskDoneText]}>{item.time}</Text>
               </View>
               <View style={styles.taskInfo}>
                  <Text style={[styles.taskName, item.done && styles.taskDoneText]}>{item.task}</Text>
                  {index === 2 && <View style={styles.reminderBadge}><Bell size={10} color="#f59e0b" /><Text style={styles.reminderText}>Reminder set</Text></View>}
               </View>
               {item.done ? <CheckCircle2 size={24} color="#10b981" /> : <Circle size={24} color="#cbd5e1" />}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.habitBtn}>
           <Text style={styles.habitBtnText}>Build New Habit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 25 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 5 },
  focusCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  focusLabel: { color: '#94a3b8', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  focusValue: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginTop: 5 },
  focusProgress: { height: 6, backgroundColor: '#334155', borderRadius: 3, marginTop: 15 },
  focusFill: { height: '100%', backgroundColor: '#6366f1', borderRadius: 3 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  addBtn: { backgroundColor: '#f1f5f9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: '#1e293b', fontWeight: 'bold', fontSize: 12 },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  taskTimeBox: { width: 60 },
  taskTime: { fontSize: 13, fontWeight: 'bold', color: '#6366f1' },
  taskInfo: { flex: 1, marginLeft: 10 },
  taskName: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
  reminderBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  reminderText: { fontSize: 10, color: '#f59e0b', marginLeft: 4, fontWeight: 'bold' },
  taskDone: { backgroundColor: '#f8fafc', borderColor: '#f1f5f9' },
  taskDoneText: { color: '#94a3b8', textDecorationLine: 'line-through' },
  habitBtn: {
    backgroundColor: '#6366f1',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  habitBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
