import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, MapPin, Filter, Search, ChevronRight, RefreshCw } from 'lucide-react-native';
import { tutorService } from '../services/tutorService';

const INITIAL_TUTORS = [
  { id: '1', name: 'Dr. John Mathe', subject: 'Mathematics', level: 'Grade 10-12', rating: 4.9, price: 'R250', location: 'Pretoria East', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
  { id: '2', name: 'Ms. Sarah Dube', subject: 'Physical Science', level: 'Grade 12', rating: 4.8, price: 'R200', location: 'Sunnyside, Pta', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
  { id: '3', name: 'Mr. David Lepota', subject: 'English HL', level: 'Grade 11-12', rating: 4.7, price: 'R180', location: 'Mamelodi, Pta', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
  { id: '4', name: 'Thabo Mokoena', subject: 'Accounting', level: 'Grade 10-12', rating: 5.0, price: 'R220', location: 'Hatfield, Pta', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' },
];

export default function TutorsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [tutors, setTutors] = useState(INITIAL_TUTORS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    setLoading(true);
    try {
      const data = await tutorService.getAllTutors();
      if (data.length > 0) {
        setTutors(data);
      }
    } catch (error) {
      console.log("Using fallback tutors (Firebase not configured yet)");
    } finally {
      setLoading(false);
    }
  };

  const renderTutor = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Booking', { tutor: item })}
    >
      <Image source={{ uri: item.image }} style={styles.tutorImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.tutorName}>{item.name}</Text>
          <View style={styles.ratingBadge}>
            <Star size={12} color="#fbbf24" fill="#fbbf24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.subjectText}>{item.subject} • {item.level}</Text>
        
        <View style={styles.locationRow}>
          <MapPin size={14} color="#94a3b8" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.priceText}><Text style={styles.priceAmount}>{item.price}</Text>/hr</Text>
          <TouchableOpacity style={styles.bookBtn}>
             <Text style={styles.bookBtnText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Tutors</Text>
        <TouchableOpacity style={styles.filterBtn}>
           <Filter size={20} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#94a3b8" />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search by subject or name..."
          value={search}
          onChangeText={setSearch}
        />
        {loading && <ActivityIndicator color="#6366f1" size="small" />}
      </View>

      <FlatList
        data={tutors.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderTutor}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={loadTutors}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  filterBtn: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    height: 50,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#1e293b' },
  list: { padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tutorImage: {
    width: 90,
    height: 110,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tutorName: { fontSize: 17, fontWeight: 'bold', color: '#1e293b' },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: { marginLeft: 4, fontSize: 12, fontWeight: 'bold', color: '#d97706' },
  subjectText: { fontSize: 13, color: '#6366f1', fontWeight: '600', marginTop: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  locationText: { fontSize: 12, color: '#64748b', marginLeft: 4, flex: 1 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  priceText: { color: '#64748b', fontSize: 14 },
  priceAmount: { fontWeight: 'bold', color: '#1e293b', fontSize: 18 },
  bookBtn: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookBtnText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
});
