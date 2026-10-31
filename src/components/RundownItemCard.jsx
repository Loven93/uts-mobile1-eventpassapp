import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontAwesomeIcon from '@react-native-vector-icons/fontawesome-free-solid';
import { colors, fonts } from '../theme';

const MAIN_STAGE = 'Main Stage';

export default function RundownItemCard({
  performerName,
  timeSlot,
  stageName,
}) {
  const [mulai, selesai] = timeSlot.replace(' WIB', '').split(' - ');
  const isMainStage = stageName === MAIN_STAGE;

  return (
    <View style={styles.row}>
      <View style={styles.timeCol}>
        <Text style={styles.startTime}>{mulai}</Text>
        <Text style={styles.endTime}>s/d {selesai}</Text>
      </View>

      <View style={styles.rail}>
        <View style={isMainStage ? styles.dotMain : styles.dotIndie} />
        <View style={styles.railLine} />
      </View>

      <View style={styles.card}>
        <View style={styles.cardTop}>
          <FontAwesomeIcon
            name="music"
            size={12}
            color={isMainStage ? colors.ember : colors.sun}
          />
          <Text style={styles.stageLabel}>
            {stageName.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.performerText}>{performerName}</Text>
        <View style={styles.cardBottom}>
          <FontAwesomeIcon name="clock" size={11} color={colors.textMuted} />
          <Text style={styles.timeText}>{timeSlot}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  timeCol: {
    width: 62,
    paddingTop: 12,
    alignItems: 'flex-end',
  },
  startTime: {
    fontFamily: fonts.mono,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textMain,
  },
  endTime: {
    marginTop: 2,
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textMuted,
  },
  rail: {
    width: 28,
    alignItems: 'center',
    paddingTop: 16,
  },
  dotMain: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.ember,
    borderWidth: 3,
    borderColor: colors.ink,
  },
  dotIndie: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.sun,
    borderWidth: 3,
    borderColor: colors.ink,
  },
  railLine: {
    flex: 1,
    width: 2,
    marginTop: 2,
    backgroundColor: colors.inkLine,
  },
  card: {
    flex: 1,
    backgroundColor: colors.inkSoft,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.inkLine,
    padding: 14,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageLabel: {
    marginLeft: 6,
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.textMuted,
  },
  performerText: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '800',
    color: colors.textMain,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timeText: {
    marginLeft: 6,
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.textMuted,
  },
});
