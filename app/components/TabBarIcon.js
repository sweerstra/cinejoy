import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'expo';

export default function TabBarIcon({ name, color }) {
  const iconName = Platform.OS === 'ios'
    ? `ios-${name}`
    : `md-${name}`;

  return (
    <Icon.Ionicons
      name={iconName}
      size={26}
      style={{ marginBottom: -3 }}
      color={color}
    />
  );
}
