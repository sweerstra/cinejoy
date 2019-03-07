import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar, TextInput
} from 'react-native';
import Button from '../components/ui/Button';
import Colors from '../constants/Colors';
import Input from '../components/ui/Input';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    text: ''
  };

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  onContinue = () => {
    this.props.navigation.navigate('Main');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          {/*Cinejoy*/}
          <Text style={styles.heading}>Bioscoop POWER!</Text>
          <Text style={styles.intro}>
            {/*Everything you want to know about Cinema in your city!*/}
            Een bioscoop tripje plannen moet weer leuk worden...
          </Text>
          <View style={styles.inputs}>
            <Input
              label="Username"
              value={this.state.text}
              onChange={text => this.setState({ text })}
              style={{ marginBottom: 20 }}/>
            <Input
              label="Password"
              value={this.state.text}
              onChange={text => this.setState({ text })}
              style={{ marginBottom: 20 }}/>
          </View>
          <Button onPress={this.onContinue}>
            Continue
          </Button>
        </View>
      </View>
      /* <LinearGradient colors={['#95D7AE', '#8698B8']} style={styles.container}>
          <View style={styles.welcomeContainer}>
              <Text>Welcome!</Text>
          </View>
      </LinearGradient> */
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 40,
    borderRadius: 10,
  },
  heading: {
    color: Colors.light,
    fontSize: 40,
    fontWeight: 'bold',
  },
  intro: {
    fontSize: 18,
    color: Colors.light,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  inputs: {
    alignSelf: 'stretch',
  },
});
