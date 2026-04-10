import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, User, BookOpen, MapPin, Award } from 'lucide-react-native';

export default function TeacherProfileForm({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [qualification, setQualification] = useState('');
  const [subject, setSubject] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('Atteridgeville');
  const [bio, setBio] = useState('');

  const handleSubmit = () => {
    if (!fullName || !qualification || !subject) {
      Alert.alert('Missing Info', 'Please complete all required fields.');
      return;
    }
    Alert.alert(
      'Profile Submitted ✅',
      `Thank you, ${fullName}. Your profile has been sent to Kirov Learn HR for review. We will contact you within 48 hours.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Teacher HR Application</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoCard}>
          <Award size={30} color="#6366f1" />
          <Text style={styles.infoTitle}>Join Our Teaching Network</Text>
          <Text style={styles.infoText}>Submit your profile below. Our HR team will review your qualifications and match you with students in your area.</Text>
        </View>

        <Text style={styles.label}>Full Name *</Text>
        <View style={styles.inputRow}>
          <User size={18} color="#94a3b8" />
          <TextInput style={styles.input} placeholder="e.g. Thabo Mokoena" value={fullName} onChangeText={setFullName} />
        </View>

        <Text style={styles.label}>Highest Qualification *</Text>
        <View style={styles.inputRow}>
          <Award size={18} color="#94a3b8" />
          <TextInput style={styles.input} placeholder="e.g. B.Ed, PGCE, Diploma" value={qualification} onChangeText={setQualification} />
        </View>

        <Text style={styles.label}>Subject Expertise *</Text>
        <View style={styles.inputRow}>
          <BookOpen size={18} color="#94a3b8" />
          <TextInput style={styles.input} placeholder="e.g. Mathematics, Physical Science" value={subject} onChangeText={setSubject} />
        </View>

        <Text style={styles.label}>Years of Experience</Text>
        <TextInput style={styles.inputFull} placeholder="e.g. 5 years" value={experience} onChangeText={setExperience} keyboardType="numeric" />

        <Text style={styles.label}>Preferred Location</Text>
        <View style={styles.inputRow}>
          <MapPin size={18} color="#94a3b8" />
          <TextInput style={styles.input} placeholder="e.g. Atteridgeville" value={location} onChangeText={setLocation} />
        </View>

        <Text style={styles.label}>About You</Text>
        <TextInput style={[styles.inputFull, styles.textArea]} multiline numberOfLines={4} placeholder="Tell us about your teaching passion..." value={bio} onChangeText={setBio} />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Send size={20} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.submitBtnText}>Submit to HR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  scrollContent: { padding: 20 },
  infoCard: { backgroundColor: '#f1f2ff', borderRadius: 20, padding: 20, marginBottom: 25, alignItems: 'center' },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginTop: 12 },
  infoText: { fontSize: 13, color: '#64748b', textAlign: 'center', marginTop: 8, lineHeight: 20 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#64748b', marginBottom: 8, marginTop: 15 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 12, paddingHorizontal: 15, borderWidth: 1, borderColor: '#e2e8f0' },
  input: { flex: 1, marginLeft: 10, fontSize: 15, color: '#1e293b', paddingVertical: 14 },
  inputFull: { backgroundColor: '#f8fafc', borderRadius: 12, padding: 15, fontSize: 15, color: '#1e293b', borderWidth: 1, borderColor: '#e2e8f0' },
  textArea: { height: 100, textAlignVertical: 'top' },
  submitBtn: { backgroundColor: '#6366f1', height: 56, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25, marginBottom: 40 },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
