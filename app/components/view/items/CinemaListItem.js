import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../constants/Colors';
import Icon from '../../Icon';

export default function CinemaListItem({ id, title, brand, isSelected, onPress }) {
  const icon = isSelected
    ? <Icon
      name="checkmark"
      color={Colors.light}/>
    : null;

  return (
    <TouchableOpacity
      style={[styles.item, isSelected && styles.itemActive]}
      onPress={onPress}>
      <Text style={[styles.title, isSelected && styles.titleActive]}>{title}</Text>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 4,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: Colors.light,
  },
  itemActive: {
    backgroundColor: Colors.primaryTint,
  },
  title: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  titleActive: {
    color: Colors.light,
  },
});
