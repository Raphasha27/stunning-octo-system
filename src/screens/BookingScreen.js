import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, MessageSquare, Video } from 'lucide-react-native';

export default function BookingScreen({ route, navigation }) {
  const { tutor } = route.params || {
    tutor: {
      name: 'Dr. John Mathe',
      subject: 'Mathematics',
      price: 'R250',
      location: 'Johannesburg',
      rating: 4.9,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      bio: 'Experienced PhD in Mathematics with 10+ years of teaching. specialized in Calculus and Statistics.'
    }
  };

  const [selectedDay, setSelectedDay] = useState('Mon');

  const handleBooking = () => {
    // Navigate to payment instead of just showing alerts
    navigation.navigate('Payment', {
      bookingData: {
        tutorName: tutor.name,
        amount: parseFloat(tutor.price.replace('R', '')),
        tutorId: tutor.id
      }
    });
  };

  const handleChat = () => {
    navigation.navigate('Chat', { tutor });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tutor Details</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image source={{ uri: tutor.image }} style={styles.profileImage} />
          <Text style={styles.tutorName}>{tutor.name}</Text>
          <Text style={styles.tutorSubject}>{tutor.subject} Expert</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>{tutor.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>{tutor.reviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>{tutor.price}</Text>
              <Text style={styles.statLabel}>Per Hour</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>
            {tutor.bio || "Helping students master complex concepts through simplified teaching methods and personalized attention."}
          </Text>

          <Text style={styles.sectionTitle}>Class Options</Text>
          <View style={styles.optionsRow}>
             <View style={styles.optionItem}>
                <Video size={20} color="#6366f1" />
                <Text style={styles.optionText}>Online</Text>
             </View>
             <View style={styles.optionItem}>
                <MapPin size={20} color="#6366f1" />
                <Text style={styles.optionText}>Physical</Text>
             </View>
          </View>

          <Text style={styles.sectionTitle}>Availability</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysList}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <TouchableOpacity 
                key={day} 
                style={[styles.dayCard, selectedDay === day && styles.selectedDay]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
         <TouchableOpacity style={styles.chatBtn} onPress={handleChat}>
            <MessageSquare size={24} color="#6366f1" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.mainBtn} onPress={handleBooking}>
            <Text style={styles.mainBtnText}>Confirm Booking</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  profileSection: {
    alignItems: 'center',
    paddingTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f1f5f9',
  },
  tutorName: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginTop: 15 },
  tutorSubject: { fontSize: 16, color: '#6366f1', fontWeight: '500', marginTop: 5 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    marginTop: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '90%',
    justifyContent: 'space-between',
  },
  stat: { alignItems: 'center' },
  statVal: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 4 },
  statDivider: { width: 1, backgroundColor: '#e2e8f0', height: '100%' },
  content: { padding: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginTop: 10, marginBottom: 15 },
  bioText: { fontSize: 15, color: '#64748b', lineHeight: 24 },
  optionsRow: { flexDirection: 'row', marginBottom: 20 },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f2ff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
  },
  optionText: { marginLeft: 8, color: '#6366f1', fontWeight: '600' },
  daysList: { marginTop: 5 },
  dayCard: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedDay: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  dayText: { fontSize: 14, fontWeight: 'bold', color: '#64748b' },
  selectedDayText: { color: '#fff' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  chatBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#f1f2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  mainBtn: {
    flex: 1,
    height: 56,
    backgroundColor: '#6366f1',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
