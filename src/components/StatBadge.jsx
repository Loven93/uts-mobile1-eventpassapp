import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from '@react-native-vector-icons/fontawesome-free-solid';
import PropTypes from 'prop-types';
import { colors, fonts } from '../theme';

const CAPACITY = 500;
const SEGMENT_COUNT = 12;
const SEGMENTS = Array.from({ length: SEGMENT_COUNT }, (_, i) => i);

export default function StatBadge(props) {
  const litSegments = Math.min(
    SEGMENT_COUNT,
    Math.ceil((props.count / CAPACITY) * SEGMENT_COUNT)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>

      <View style={styles.counterRow}>
        <Text style={styles.countText}>{props.count}</Text>
        <Text style={styles.capacityText}>/ {CAPACITY} kapasitas</Text>
      </View>

      <View style={styles.meterRow}>
        {SEGMENTS.map((i) => (
          <View
            key={i}
            style={i < litSegments ? styles.segmentOn : styles.segmentOff}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={props.onPress}
        activeOpacity={0.85}
      >
        <FontAwesomeIcon name="check-circle" size={15} color={colors.ink} />
        <Text style={styles.buttonText}>CHECK-IN KEHADIRAN</Text>
        <Text style={styles.buttonPlus}>+1</Text>
      </TouchableOpacity>
    </View>
  );
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inkSoft,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.inkLine,
    padding: 18,
    marginBottom: 20,
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 6,
    marginBottom: 14,
  },
  countText: {
    fontFamily: fonts.mono,
    fontSize: 52,
    lineHeight: 58,
    fontWeight: 'bold',
    color: colors.sun,
  },
  capacityText: {
    marginLeft: 10,
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textMuted,
  },
  meterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  segmentOn: {
    width: 22,
    height: 8,
    borderRadius: 2,
    backgroundColor: colors.sun,
  },
  segmentOff: {
    width: 22,
    height: 8,
    borderRadius: 2,
    backgroundColor: colors.inkLine,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sun,
    borderRadius: 12,
    paddingVertical: 14,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
    color: colors.ink,
  },
  buttonPlus: {
    marginLeft: 10,
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.ink,
    opacity: 0.55,
  },
});
