import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from '../Icon';
import Colors from '../../constants/Colors';

export default function Input({ label, value, onChange, icon, style, ...rest }) {
  const inputStyle = icon
    ? [styles.input, styles.iconInput, style]
    : [styles.input, style];

  const input = (
    <TextInput
      style={inputStyle}
      value={value}
      onChangeText={onChange}
      {...rest}
    />
  );

  if (label) {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        {input}
      </View>
    );
  }

  return (
    <View style={[styles.inputContainer, style]}>
      {input}
      {icon && <Icon
        name={icon}
        color={Colors.light}
        style={styles.icon}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primaryTint,
    borderRadius: 4,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.light,
    backgroundColor: Colors.primaryTint,
    borderRadius: 4,
  },
  iconInput: {
    flex: 1,
  },
  icon: {
    marginHorizontal: 20,
  },
  label: {
    marginBottom: 4,
    color: Colors.primaryDark,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
