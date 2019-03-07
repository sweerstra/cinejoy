import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebBrowser } from 'expo';
import Icon from '../components/Icon';
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => this.props.navigation.navigate('Cinema')}>
          <View style={styles.optionIcon}>
            <Icon name="videocam" color={Colors.primary}/>
          </View>
          <Text style={styles.optionText}>
            Bioscopen instellen
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={this._handlePressSlack}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Image
                source="#"
                fadeDuration={0}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Join us on Slack
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={this._handlePressForums}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Icon name="chatboxes" size={22} color="#ccc"/>
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Ask a question on the Expo forums
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  _handlePressSlack = () => {
    WebBrowser.openBrowserAsync('https://slack.expo.io');
  };

  _handlePressForums = () => {
    WebBrowser.openBrowserAsync('http://forums.expo.io');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionsTitleText: {
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  option: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.light,
  },
  optionIcon: {
    marginRight: 20,
  },
  optionText: {
    fontSize: 15,
  },
});
