import React from 'react';
import { View, Alert ,Button} from 'react-native';

import Cell from '../components/Cell';
import { colors } from '../config/constants';

const Help = () => (
  <View>
    <Cell
      title="Contact us"
      subtitle="Questions? Need help?"
      icon="people-outline"
      tintColor={colors.primary}
      onPress={() => {
        alert('Help touched');
      }}
      showForwardIcon={false}
      style={{ marginTop: 20 }}
    />
    <Cell
      title="App info"
      icon="information-circle-outline"
      tintColor={colors.pink}
      onPress={() => {
        Alert.alert(
      'An IIT(ISM) Dhanbad Initiative','',
          [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ],
          { cancelable: true }
        );
      }}
      showForwardIcon={false}
    />
  </View>
);

export default Help;
