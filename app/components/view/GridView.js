import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { RaisedShadow } from '../../constants/Box';

export default function GridView({ items, onSelect }) {
  function renderItem(item, index) {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => onSelect(item, index)}
        activeOpacity={0.7}
        key={index}>
        <Image
          style={styles.image}
          source={{ uri: item.image }}
        />
        <View style={styles.dotsContainer}>
          {item.cinemas.map(({ brand }, index) =>
            <View style={[styles.dot, { backgroundColor: Colors[brand] }]} key={index}/>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {items.map(renderItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  gridItem: {
    width: 60,
    height: 90,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 4,
    ...RaisedShadow,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  dotsContainer: {
    flex: 1,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 9,
    height: 9,
    marginHorizontal: 2,
    borderWidth: .5,
    borderColor: Colors.light,
    borderRadius: 4,
  }
});
