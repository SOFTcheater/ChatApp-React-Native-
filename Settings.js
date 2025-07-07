import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Linking, StyleSheet, TouchableOpacity,Alert } from 'react-native';

import Cell from '../components/Cell';
import { auth } from '../config/firebase';
import { colors } from '../config/constants';
import ContactRow from '../components/ContactRow';

const Settings = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {
            auth.signOut().then(() => {
              navigation.replace('Login'); // Adjust the navigation as needed
            }).catch((error) => {
              console.error("Error signing out: ", error);
            });
          }
        }
      ]
    );
  };

  return (
    <View>
      <ContactRow
        name={auth?.currentUser?.displayName ?? 'No name'}
        subtitle={auth?.currentUser?.email}
        style={styles.contactRow}
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />

      <Cell
        title="Account"
        subtitle="Privacy, delete account"
        icon="key-outline"
        onPress={() => {
          navigation.navigate('Account');
        }}
        iconColor="black"
        style={{ marginTop: 20 }}
      />

      <Cell
        title="Help"
        subtitle="Contact us, app info"
        icon="help-circle-outline"
        iconColor="black"
        onPress={() => {
          navigation.navigate('Help');
        }}
      />

      <Cell
        title="Invite a friend"
        icon="people-outline"
        iconColor="black"
        onPress={() => {
          alert('Share touched');
        }}
        showForwardIcon={false}
      />
       <Cell
        title='Logout'
        icon='log-out-outline'
        iconColor="black"
        onPress={handleLogout}
        style={{ marginTop: 20 }}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  contactRow: {
    backgroundColor: 'white',
    borderColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  githubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  githubLink: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 20,
    justifyContent: 'center',
    marginTop: 20,
    width: 100,
  },
});

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;
