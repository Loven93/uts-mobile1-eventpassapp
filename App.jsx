import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FontAwesomeIcon from '@react-native-vector-icons/fontawesome-free-solid';

import EventHeader from './src/components/EventHeader';
import StatBadge from './src/components/StatBadge';
import RundownItemCard from './src/components/RundownItemCard';
import { colors, fonts } from './src/theme';

const INITIAL_RUNDOWN = [
  {
    id: 1,
    performerName: 'The Jansen',
    timeSlot: '19:00 - 19:45 WIB',
    stageName: 'Main Stage',
  },
  {
    id: 2,
    performerName: 'Hindia',
    timeSlot: '20:00 - 20:45 WIB',
    stageName: 'Indie Stage',
  },
  {
    id: 3,
    performerName: 'Perunggu',
    timeSlot: '21:00 - 22:00 WIB',
    stageName: 'Main Stage',
  },
];

// Penampil baru mendapat slot satu jam setelah slot sebelumnya, mulai 22:15.
const buatTimeSlot = (urutanBaru) => {
  const pad = (n) => String(n).padStart(2, '0');
  const jamMulai = (22 + urutanBaru) % 24;
  const jamSelesai = (jamMulai + 1) % 24;
  return `${pad(jamMulai)}:15 - ${pad(jamSelesai)}:00 WIB`;
};

export default function App() {
  const [checkInCount, setCheckInCount] = useState(128);
  const [performerInput, setPerformerInput] = useState('');
  const [rundownList, setRundownList] = useState(INITIAL_RUNDOWN);

  const handleCheckIn = () => {
    setCheckInCount((prevCount) => prevCount + 1);
  };

  const handleAddRundown = () => {
    if (performerInput.trim() === '') {
      Alert.alert('Peringatan', 'Nama band/performer tidak boleh kosong!');
      return;
    }

    const urutanBaru = rundownList.length - INITIAL_RUNDOWN.length;

    const newRundown = {
      id: Date.now(),
      performerName: performerInput.trim(),
      timeSlot: buatTimeSlot(urutanBaru),
      stageName: rundownList.length % 2 === 0 ? 'Main Stage' : 'Indie Stage',
    };

    setRundownList((prevList) => [...prevList, newRundown]);
    setPerformerInput('');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" backgroundColor={colors.ink} />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.topBar}>
              <Text style={styles.brand}>EVENTPASS</Text>
              <Text style={styles.brandSub}>FESTIVAL CREW APP</Text>
            </View>

            <EventHeader
              eventName="Sidoarjo Indie Music Fest 2026"
              venue="Parkir Timur GOR Delta Sidoarjo"
              eventDate="Sabtu, 31 Oktober 2026"
              posterUrl="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80"
            />

            <StatBadge
              label="Penonton hadir di venue"
              count={checkInCount}
              onPress={handleCheckIn}
            />

            <Text style={styles.sectionLabel}>TAMBAH PENAMPIL</Text>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nama band / performer"
                placeholderTextColor={colors.textMuted}
                value={performerInput}
                onChangeText={setPerformerInput}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAddRundown}
                activeOpacity={0.85}
              >
                <FontAwesomeIcon name="plus" size={13} color={colors.white} />
                <Text style={styles.submitButtonText}>TAMBAH KE RUNDOWN</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.listHeaderRow}>
              <Text style={styles.sectionLabelInline}>RUNDOWN PANGGUNG</Text>
              <View style={styles.countPill}>
                <Text style={styles.countPillText}>
                  {rundownList.length} PENAMPIL
                </Text>
              </View>
            </View>

            {rundownList.map((item) => (
              <RundownItemCard
                key={item.id}
                performerName={item.performerName}
                timeSlot={item.timeSlot}
                stageName={item.stageName}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 48,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  brand: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 4,
    color: colors.ember,
  },
  brandSub: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.textMuted,
  },
  sectionLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.textMuted,
    marginBottom: 10,
  },
  sectionLabelInline: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.textMuted,
  },
  formContainer: {
    backgroundColor: colors.inkSoft,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.inkLine,
    padding: 14,
    marginBottom: 28,
  },
  input: {
    backgroundColor: colors.ink,
    borderWidth: 1,
    borderColor: colors.inkLine,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textMain,
    marginBottom: 10,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ember,
    borderRadius: 12,
    paddingVertical: 14,
  },
  submitButtonText: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    color: colors.white,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  countPill: {
    borderWidth: 1,
    borderColor: colors.inkLine,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  countPillText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.sun,
  },
});
