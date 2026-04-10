import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, CheckCircle2, Circle, Calendar as CalendarIcon, BellRing } from 'lucide-react-native';
import { notificationService } from '../../services/notificationService';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const WEEKLY_DATA = {
  Mon: [
    { time: '06:30', task: 'Wake Up (Pretoria High)', done: true },
    { time: '15:00', task: 'Math Homework', done: false },
    { time: '18:00', task: 'Study: Physics', done: false },
  ],
  Tue: [
    { time: '06:30', task: 'Wake Up', done: false },
    { time: '15:00', task: 'English Essay', done: false },
    { time: '17:00', task: 'Pretoria Study Group', done: false },
  ],
  Wed: [
    { time: '06:30', task: 'Wake Up', done: false },
    { time: '14:30', task: 'Sports/Activity', done: false },
    { time: '16:00', task: 'Math Revision', done: false },
  ],
  Thu: [
    { time: '06:30', task: 'Wake Up', done: false },
    { time: '15:00', task: 'History Notes', done: false },
  ],
  Fri: [
    { time: '06:30', task: 'Wake Up', done: false },
    { time: '14:00', task: 'Weekly Report due', done: false },
  ],
  Sat: [
    { time: '09:00', task: 'Pretoria Academy Lessons', done: false },
  ],
  Sun: [
    { time: '15:00', task: 'Plan next week', done: false },
  ],
};

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const granted = await notificationService.requestPermissions();
      if (granted) {
        // Schedule pre-configured reminders for the selected day/week
        await notificationService.scheduleReminder('Wake Up ⏰', 'Time to start your productive day!', 6, 30);
        await notificationService.scheduleReminder('Homework Time 📚', 'Open Kirov Learn and finish your tasks.', 15, 0);
        setNotificationsEnabled(true);
      }
    } else {
      await notificationService.cancelAllNotifications();
      setNotificationsEnabled(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Weekly Scheduler</Text>
          <Text style={styles.subtitle}>Building discipline in Pretoria & beyond 🇿🇦</Text>
        </View>
        <TouchableOpacity 
          style={[styles.remBtn, notificationsEnabled && { backgroundColor: '#6366f1' }]} 
          onPress={toggleNotifications}
        >
           {notificationsEnabled ? <BellRing size={22} color="#fff" /> : <Bell size={22} color="#6366f1" />}
        </TouchableOpacity>
      </View>

      <View style={styles.daySelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysContainer}>
          {DAYS.map((day) => (
            <TouchableOpacity 
              key={day} 
              style={[styles.dayBtn, selectedDay === day && styles.dayBtnActive]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>{day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.focusCard}>
           <View style={styles.focusInfo}>
              <Text style={styles.focusLabel}>Weekly Discipline Score</Text>
              <Text style={styles.focusValue}>72%</Text>
           </View>
           <CalendarIcon size={40} color="#6366f130" style={styles.focusIcon} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{selectedDay}'s Routine</Text>
          {WEEKLY_DATA[selectedDay].map((item, index) => (
            <TouchableOpacity key={index} style={[styles.taskItem, item.done && styles.taskDone]}>
               <View style={styles.taskTimeBox}>
                  <Text style={styles.taskTime}>{item.time}</Text>
               </View>
               <View style={styles.taskInfo}>
                  <Text style={[styles.taskName, item.done && styles.taskDoneText]}>{item.task}</Text>
                  {!item.done && <Text style={styles.remLabel}>Reminder: 15 mins before</Text>}
               </View>
               {item.done ? <CheckCircle2 size={24} color="#10b981" /> : <Circle size={24} color="#cbd5e1" />}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addBtn}>
           <Text style={styles.addBtnText}>+ Create New Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { fontSize: 13, color: '#64748b', marginTop: 4 },
  remBtn: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#eff6ff', justifyContent: 'center', alignItems: 'center' },
  daySelector: { paddingVertical: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  daysContainer: { paddingHorizontal: 15 },
  dayBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, marginRight: 8 },
  dayBtnActive: { backgroundColor: '#6366f1' },
  dayText: { fontSize: 14, fontWeight: 'bold', color: '#64748b' },
  dayTextActive: { color: '#fff' },
  scrollContent: { padding: 20 },
  focusCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  focusInfo: { flex: 1 },
  focusLabel: { color: '#64748b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  focusValue: { color: '#1e293b', fontSize: 32, fontWeight: 'bold', marginTop: 5 },
  focusIcon: { marginLeft: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 20 },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  taskTimeBox: { width: 60 },
  taskTime: { fontSize: 13, fontWeight: 'bold', color: '#6366f1' },
  taskInfo: { flex: 1, marginLeft: 10 },
  taskName: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
  remLabel: { fontSize: 11, color: '#f59e0b', marginTop: 4 },
  taskDone: { opacity: 0.6 },
  taskDoneText: { textDecorationLine: 'line-through', color: '#94a3b8' },
  addBtn: {
    backgroundColor: '#1e293b',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
