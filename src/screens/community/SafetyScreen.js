import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Shield, AlertTriangle, MapPin, Heart, Siren } from 'lucide-react-native';

const EMERGENCY_CONTACTS = [
  { name: 'SA Police (SAPS)', number: '10111', icon: Shield, color: '#1e40af', bg: '#dbeafe' },
  { name: 'Ambulance', number: '10177', icon: Heart, color: '#dc2626', bg: '#fee2e2' },
  { name: 'Child Protection', number: '0800 055 555', icon: AlertTriangle, color: '#d97706', bg: '#fef3c7' },
  { name: 'GBV Command Centre', number: '0800 428 428', icon: Shield, color: '#7c3aed', bg: '#ede9fe' },
  { name: 'Suicide Crisis Line', number: '0800 567 567', icon: Phone, color: '#059669', bg: '#d1fae5' },
  { name: 'Fire Department', number: '10177', icon: Siren, color: '#ea580c', bg: '#ffedd5' },
  { name: 'Childline SA', number: '116', icon: Heart, color: '#e11d48', bg: '#ffe4e6' },
];

export default function SafetyScreen({ navigation }) {
  const handleCall = (number, name) => {
    Alert.alert(
      `Call ${name}?`,
      `You are about to dial ${number}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => Linking.openURL(`tel:${number.replace(/\s/g, '')}`) },
      ]
    );
  };

  const handleEmergency = () => {
    Alert.alert(
      '🚨 EMERGENCY',
      'This will immediately call SAPS (10111). Proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'CALL NOW', style: 'destructive', onPress: () => Linking.openURL('tel:10111') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety & Emergency</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Big Emergency Button */}
        <TouchableOpacity style={styles.emergencyBtn} onPress={handleEmergency}>
          <Siren size={40} color="#fff" />
          <Text style={styles.emergencyTitle}>🚨 EMERGENCY SOS</Text>
          <Text style={styles.emergencyText}>Tap to immediately call SAPS (10111)</Text>
        </TouchableOpacity>

        {/* Parental Guidance Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parental Safety Tracker</Text>
          <View style={styles.trackerCard}>
            <View style={styles.trackerRow}>
              <MapPin size={18} color="#6366f1" />
              <View style={styles.trackerInfo}>
                <Text style={styles.trackerLabel}>Last Known Location</Text>
                <Text style={styles.trackerValue}>Atteridgeville Community Library</Text>
              </View>
            </View>
            <View style={styles.trackerDivider} />
            <View style={styles.trackerRow}>
              <Shield size={18} color="#10b981" />
              <View style={styles.trackerInfo}>
                <Text style={styles.trackerLabel}>Session Status</Text>
                <Text style={[styles.trackerValue, { color: '#10b981' }]}>✅ Safe — In Session with Mr. Lepota</Text>
              </View>
            </View>
            <View style={styles.trackerDivider} />
            <View style={styles.trackerRow}>
              <Phone size={18} color="#f59e0b" />
              <View style={styles.trackerInfo}>
                <Text style={styles.trackerLabel}>Session Duration</Text>
                <Text style={styles.trackerValue}>45 mins (ends at 16:00)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Emergency Contact Directory */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts 🇿🇦</Text>
          {EMERGENCY_CONTACTS.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.contactCard}
                onPress={() => handleCall(contact.number, contact.name)}
              >
                <View style={[styles.contactIcon, { backgroundColor: contact.bg }]}>
                  <Icon size={22} color={contact.color} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactNumber}>{contact.number}</Text>
                </View>
                <View style={styles.callBtn}>
                  <Phone size={18} color="#fff" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>🛡️ Safety Tips for Parents</Text>
          <Text style={styles.tipText}>• Always verify tutor identity before house calls</Text>
          <Text style={styles.tipText}>• Keep sessions in public spaces when possible</Text>
          <Text style={styles.tipText}>• Set your child's daily schedule in the app</Text>
          <Text style={styles.tipText}>• Enable notifications to track session progress</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  scrollContent: { padding: 20 },
  emergencyBtn: {
    backgroundColor: '#dc2626',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 8,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  emergencyTitle: { fontSize: 22, fontWeight: '900', color: '#fff', marginTop: 12 },
  emergencyText: { fontSize: 13, color: '#fecaca', marginTop: 6 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
  trackerCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 2 },
  trackerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  trackerInfo: { marginLeft: 15, flex: 1 },
  trackerLabel: { fontSize: 11, color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' },
  trackerValue: { fontSize: 14, color: '#1e293b', fontWeight: '600', marginTop: 3 },
  trackerDivider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 5 },
  contactCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 15, marginBottom: 10, elevation: 1 },
  contactIcon: { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  contactInfo: { flex: 1, marginLeft: 15 },
  contactName: { fontSize: 15, fontWeight: 'bold', color: '#1e293b' },
  contactNumber: { fontSize: 13, color: '#64748b', marginTop: 3 },
  callBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#10b981', justifyContent: 'center', alignItems: 'center' },
  tipCard: { backgroundColor: '#fffbeb', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#fef3c7' },
  tipTitle: { fontSize: 16, fontWeight: 'bold', color: '#92400e', marginBottom: 10 },
  tipText: { fontSize: 13, color: '#78350f', lineHeight: 22 },
});
