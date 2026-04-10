import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import { paymentService } from '../services/paymentService';
import { auth } from '../firebase/config';

export default function PaymentScreen({ route, navigation }) {
  const { bookingData } = route.params;
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, success, cancelled

  const checkoutUrl = paymentService.generatePayFastUrl({
    amount: bookingData.amount,
    item_name: `Tutor Lesson: ${bookingData.tutorName}`,
    m_payment_id: Date.now().toString(),
    name_first: auth.currentUser?.displayName || 'Student',
    email_address: auth.currentUser?.email || 'student@example.com'
  });

  const onNavigationStateChange = (navState) => {
    if (navState.url.includes('payment_success')) {
      setPaymentStatus('success');
    } else if (navState.url.includes('payment_cancelled')) {
      setPaymentStatus('cancelled');
    }
  };

  if (paymentStatus === 'success') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.statusContent}>
          <CheckCircle2 size={100} color="#10b981" />
          <Text style={styles.statusTitle}>Payment Successful!</Text>
          <Text style={styles.statusText}>Your lesson with {bookingData.tutorName} is confirmed.</Text>
          <TouchableOpacity style={styles.statusBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.statusBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SECURE CHECKOUT</Text>
        <View style={{ width: 24 }} />
      </View>

      <WebView
        source={{ uri: checkoutUrl }}
        onNavigationStateChange={onNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator size="large" color="#6366f1" style={styles.loader} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: { fontSize: 14, fontWeight: 'bold', color: '#64748b', letterSpacing: 1 },
  loader: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#fff' },
  statusContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  statusTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginTop: 20 },
  statusText: { fontSize: 16, color: '#64748b', textAlign: 'center', marginTop: 10, lineHeight: 24 },
  statusBtn: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 30,
  },
  statusBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
