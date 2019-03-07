import { AsyncStorage } from 'react-native';

const CINEMAS_KEY = '@cinemas';

export default {
  async getSavedCinemas() {
    try {
      return (await AsyncStorage.getItem(CINEMAS_KEY)) || [];
    } catch (error) {
      console.log(`Couldn't obtain cinema data`, error.message);
    }
  },
  async saveSelectedCinemas() {
    const { selectedCinemas } = this.state;

    try {
      const data = JSON.stringify(selectedCinemas);
      await AsyncStorage.setItem(CINEMAS_KEY, data);
    } catch (error) {
      console.log(`Couldn't save cinema data`, error.message);
    }
  }
};
