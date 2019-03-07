import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

function ChoiceButton({ type, isActive, onSelect, children }) {
  function getStyleForType(type) {
    switch (type) {
      case 'left':
        return [styles.button, styles.buttonLeft];
      case 'middle':
        return [styles.button, styles.buttonMiddle];
      case 'right':
        return [styles.button, styles.buttonRight];
      default:
        return styles.button;
    }
  }

  const buttonStyle = [getStyleForType(type), isActive && styles.buttonActive];
  const buttonTextStyle = [styles.buttonText, isActive && styles.buttonTextActive];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={() => onSelect(children)}>
      <Text style={buttonTextStyle}>{children}</Text>
    </TouchableOpacity>
  );
}

export default function ChoiceButtons({ values, onSelect, selected, style }) {
  function getTypeForIndex(index) {
    const count = index + 1;

    if (count === 1) {
      return 'left';
    } else if (count === values.length) {
      return 'right';
    }
    return 'middle';
  }

  return (
    <View style={style}>
      {values.map((value, index) =>
        <ChoiceButton
          type={getTypeForIndex(index)}
          isActive={value === selected}
          onSelect={() => onSelect(value)}
          key={value}>
          {value}
        </ChoiceButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderColor: Colors.light,
  },
  buttonActive: {
    borderColor: Colors.secondary
  },
  buttonLeft: {
    borderBottomEndRadius: 0,
    borderTopEndRadius: 0,
    marginRight: 6,
  },
  buttonMiddle: {
    borderRadius: 0,
    marginHorizontal: 4,
  },
  buttonRight: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    marginLeft: 6,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.light,
    textAlign: 'center',
  },
  buttonTextActive: {
    color: Colors.secondary,
    fontWeight: 'bold',
  },
});
