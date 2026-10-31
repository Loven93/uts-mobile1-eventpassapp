import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import FontAwesomeIcon from '@react-native-vector-icons/fontawesome-free-solid';
import { colors, fonts } from '../theme';

const DASH_COUNT = 26;
const DASHES = Array.from({ length: DASH_COUNT }, (_, i) => i);
const BARCODE = [
  'k', 't', 'k', 'k', 't', 'k', 't', 't', 'k', 't', 'k', 'k', 't', 'k',
  't', 'k', 'k', 't', 'k', 't', 'k', 't', 't', 'k', 'k', 't', 'k', 't',
];

export default function EventHeader({
  eventName,
  venue,
  eventDate,
  posterUrl,
}) {
  return (
    <View style={styles.ticket}>
      <View style={styles.posterWrap}>
        <Image source={{ uri: posterUrl }} style={styles.posterImage} />
        <View style={styles.overlayTop} />
        <View style={styles.overlayBottom} />

        <View style={styles.posterContent}>
          <View style={styles.livePill}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>ACCESS PASS</Text>
          </View>
          <Text style={styles.eventTitle}>{eventName}</Text>
        </View>
      </View>

      <View style={styles.perforation}>
        <View style={styles.notchLeft} />
        <View style={styles.dashRow}>
          {DASHES.map((i) => (
            <View key={i} style={styles.dash} />
          ))}
        </View>
        <View style={styles.notchRight} />
      </View>

      <View style={styles.stub}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>TANGGAL</Text>
          <View style={styles.infoValueRow}>
            <FontAwesomeIcon name="calendar" size={12} color={colors.ember} />
            <Text style={styles.infoValue}>{eventDate}</Text>
          </View>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>LOKASI</Text>
          <View style={styles.infoValueRow}>
            <FontAwesomeIcon name="map-marker-alt" size={12} color={colors.ember} />
            <Text style={styles.infoValue}>{venue}</Text>
          </View>
        </View>

        <View style={styles.barcodeRow}>
          {BARCODE.map((type, i) => (
            <View
              key={i}
              style={type === 't' ? styles.barThick : styles.barThin}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const NOTCH = 22;

const styles = StyleSheet.create({
  ticket: {
    marginBottom: 20,
  },
  posterWrap: {
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.inkSoft,
    justifyContent: 'flex-end',
  },
  posterImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlayTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayLight,
  },
  overlayBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 130,
    backgroundColor: colors.overlayHeavy,
  },
  posterContent: {
    padding: 18,
  },
  livePill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ember,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 10,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
    marginRight: 6,
  },
  liveText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: colors.white,
  },
  eventTitle: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
    color: colors.paper,
  },
  perforation: {
    height: NOTCH,
    backgroundColor: colors.paper,
    justifyContent: 'center',
  },
  notchLeft: {
    position: 'absolute',
    left: -NOTCH / 2,
    top: 0,
    width: NOTCH,
    height: NOTCH,
    borderRadius: NOTCH / 2,
    backgroundColor: colors.ink,
  },
  notchRight: {
    position: 'absolute',
    right: -NOTCH / 2,
    top: 0,
    width: NOTCH,
    height: NOTCH,
    borderRadius: NOTCH / 2,
    backgroundColor: colors.ink,
  },
  dashRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: NOTCH,
  },
  dash: {
    width: 6,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.paperDim,
  },
  stub: {
    backgroundColor: colors.paper,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 18,
  },
  infoBlock: {
    marginBottom: 12,
  },
  infoLabel: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.onPaperMuted,
    marginBottom: 4,
  },
  infoValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValue: {
    marginLeft: 8,
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '700',
    color: colors.onPaper,
  },
  barcodeRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 34,
    marginTop: 16,
  },
  barThin: {
    width: 2,
    height: '100%',
    backgroundColor: colors.onPaper,
  },
  barThick: {
    width: 5,
    height: '78%',
    backgroundColor: colors.onPaper,
  },
});
