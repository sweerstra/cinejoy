import React from 'react';
import { FlatList } from 'react-native';

export default function ListView({ items, renderItem, style, renderKey }) {
  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      style={style}
      keyExtractor={renderKey}
      keyboardShouldPersistTaps="handled"
    />
  );
}
