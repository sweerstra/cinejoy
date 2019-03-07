import React from 'react';
import Icon from '../components/Icon';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function HeaderIcon({ name, color, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}>
      <Icon
        name={name}
        color={color}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 16,
  },
});
