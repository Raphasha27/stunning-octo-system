import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, CheckSquare, Award, Clock } from 'lucide-react-native';

export default function TeacherReportForm({ navigation }) {
  const [studentName, setStudentName] = useState('');
  const [subject, setSubject] = useState('');
  const [attendance, setAttendance] = useState(true);
  const [homework, setHomework] = useState(true);
  const [performance, setPerformance] = useState('Excellent');
  const [comment, setComment] = useState('');

  const perfOptions = ['Excellent', 'Good', 'Needs Improvement', 'At Risk'];

  const handleSubmit = () => {
    if (!studentName || !subject) {
      Alert.alert('Missing Info', 'Please provide student name and subject.');
      return;
    }
    
    // Simulate API call
    Alert.alert(
      'Report Submitted',
      `Weekly report for ${studentName} has been sent to parents.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weekly Progress Report</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.label}>Student Name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Koketso Raphasha" 
            value={studentName}
            onChangeText={setStudentName}
          />

          <Text style={styles.label}>Subject</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Mathematics" 
            value={subject}
            onChangeText={setSubject}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
           <View style={styles.rowInfo}>
              <CheckSquare size={20} color="#6366f1" />
              <Text style={styles.rowLabel}>Attended Class</Text>
           </View>
           <Switch value={attendance} onValueChange={setAttendance} />
        </View>

        <View style={styles.row}>
           <View style={styles.rowInfo}>
              <Award size={20} color="#6366f1" />
              <Text style={styles.rowLabel}>Homework Completed</Text>
           </View>
           <Switch value={homework} onValueChange={setHomework} />
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>Performance Level</Text>
        <View style={styles.perfGrid}>
           {perfOptions.map(opt => (
             <TouchableOpacity 
               key={opt} 
               style={[styles.perfBtn, performance === opt && styles.perfBtnActive]}
               onPress={() => setPerformance(opt)}
             >
                <Text style={[styles.perfText, performance === opt && styles.perfTextActive]}>{opt}</Text>
             </TouchableOpacity>
           ))}
        </View>

        <Text style={styles.label}>Teacher's Comment</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          multiline 
          numberOfLines={4} 
          placeholder="Specific feedback for parents..." 
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
           <Send size={20} color="#fff" style={{ marginRight: 10 }} />
           <Text style={styles.submitBtnText}>Submit Weekly Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  scrollContent: { padding: 20 },
  section: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#64748b', marginBottom: 10 },
  input: { backgroundColor: '#f8fafc', borderRadius: 12, padding: 15, fontSize: 15, color: '#1e293b', borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 10, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  rowInfo: { flexDirection: 'row', alignItems: 'center' },
  rowLabel: { marginLeft: 12, fontSize: 16, color: '#1e293b', fontWeight: '500' },
  perfGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  perfBtn: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10, backgroundColor: '#f1f5f9', marginRight: 10, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  perfBtnActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  perfText: { fontSize: 13, color: '#64748b', fontWeight: '600' },
  perfTextActive: { color: '#fff' },
  textArea: { height: 100, textAlignVertical: 'top' },
  submitBtn: { backgroundColor: '#6366f1', height: 56, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
