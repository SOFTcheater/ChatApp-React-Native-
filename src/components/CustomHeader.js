import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#888"
          style={[
            styles.searchInput,
            { borderBottomColor: isFocused ? "black" : "#EEE" },
          ]}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginRight: 25,
    
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginLeft: 30,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 40, 
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
});

export default CustomHeader;

