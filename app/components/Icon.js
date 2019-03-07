import React from 'react';
import { Icon } from 'expo';
import { Platform } from 'react-native';

export default function ({ name, size = 26, ...rest }) {
  const iconName = Platform.OS === 'ios'
    ? `ios-${name}`
    : `md-${name}`;

  return (
    <Icon.Ionicons
      name={iconName}
      size={size}
      {...rest}
    />
  );
}
