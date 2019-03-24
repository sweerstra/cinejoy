import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { RaisedShadow } from '../../constants/Box';

export default function Button({ onPress, uppercase = true, style, children, ...rest }) {
  const content = uppercase && typeof children === 'string'
    ? children.toUpperCase()
    : children;

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
      {...rest}>
      <Text style={styles.buttonText}>{content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    paddingVertical: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
    ...RaisedShadow,
  },
  buttonText: {
    color: Colors.light,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
