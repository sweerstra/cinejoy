import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../constants/Colors';
import { RaisedShadow } from '../../../constants/Box';

export default function MovieListItem({ title, image, release, onPress }) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onPress({ title })}>
      <Image style={styles.image} source={{ uri: image }}/>
      <View style={styles.itemContent}>
        <Text style={styles.title}>{title}</Text>
        {release && <Text style={styles.label}>{release}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.primaryTint,
    borderRadius: 4,
    ...RaisedShadow,
  },
  image: {
    width: 40,
    height: 60,
    marginRight: 16,
    borderRadius: 4,
  },
  itemContent: {
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    color: Colors.light,
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
  },
  label: {
    color: Colors.light,
  },
});
