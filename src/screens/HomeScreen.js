import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, GraduationCap, BookOpen, Laptop, MapPin, User } from 'lucide-react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Learner 👋</Text>
            <Text style={styles.title}>Find Your Perfect Tutor</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <User color="#6366f1" size={24} />
          </TouchableOpacity>
        </View>

        {/* Search Bar Placeholder */}
        <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('Tutors')}>
          <Search color="#94a3b8" size={20} />
          <Text style={styles.searchText}>Search subjects, levels, or locations...</Text>
        </TouchableOpacity>

        {/* Quick Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            <CategoryCard icon={GraduationCap} label="High School" color="#e0e7ff" iconColor="#6366f1" />
            <CategoryCard icon={BookOpen} label="Primary" color="#fef3c7" iconColor="#d97706" />
            <CategoryCard icon={Laptop} label="University" color="#dcfce7" iconColor="#16a34a" />
            <CategoryCard icon={MapPin} label="Local" color="#fee2e2" iconColor="#dc2626" />
          </ScrollView>
        </View>

        {/* Featured Subjects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Subjects</Text>
          <View style={styles.grid}>
            <SubjectTile name="Mathematics" count="120+ Tutors" />
            <SubjectTile name="Physical Science" count="85+ Tutors" />
            <SubjectTile name="English" count="95+ Tutors" />
            <SubjectTile name="Coding" count="45+ Tutors" />
          </View>
        </View>

        {/* CTA Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Want to Teach?</Text>
          <Text style={styles.bannerText}>Join our growing community of local tutors today.</Text>
          <TouchableOpacity style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>Register as Tutor</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const CategoryCard = ({ icon: Icon, label, color, iconColor }) => (
  <TouchableOpacity style={[styles.catCard, { backgroundColor: color }]}>
    <Icon color={iconColor} size={24} />
    <Text style={[styles.catLabel, { color: iconColor }]}>{label}</Text>
  </TouchableOpacity>
);

const SubjectTile = ({ name, count }) => (
  <TouchableOpacity style={styles.subjectTile}>
    <Text style={styles.subjectName}>{name}</Text>
    <Text style={styles.subjectCount}>{count}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greeting: { fontSize: 16, color: '#64748b', fontWeight: '500' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginTop: 4 },
  profileBtn: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 25,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchText: { marginLeft: 10, color: '#94a3b8', fontSize: 15 },
  section: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', paddingHorizontal: 20, marginBottom: 15 },
  categories: { paddingLeft: 20 },
  catCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  catLabel: { marginTop: 8, fontSize: 12, fontWeight: '600' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  subjectTile: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  subjectName: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  subjectCount: { fontSize: 12, color: '#64748b', marginTop: 4 },
  banner: {
    backgroundColor: '#6366f1',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 25,
    borderRadius: 20,
  },
  bannerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  bannerText: { color: '#e0e7ff', marginTop: 8, fontSize: 14 },
  bannerBtn: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  bannerBtnText: { color: '#6366f1', fontWeight: 'bold' },
});
