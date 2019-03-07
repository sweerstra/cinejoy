import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import HeaderIcon from '../components/HeaderIcon';
import ListView from '../components/view/ListView';
import Spinner from '../components/Spinner';
import CinemaListItem from '../components/view/items/CinemaListItem';
import Input from '../components/ui/Input';
import Api from '../data/Api';
import Storage from '../data/Storage';
import Colors from '../constants/Colors';

export default class CinemaScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTintColor: Colors.light,
      headerStyle: {
        backgroundColor: Colors.primary,
        elevation: 0,
      },
      tintColor: Colors.light,
      headerRight: (params && params.isInitial) && (
        <HeaderIcon
          name="checkmark"
          color={Colors.secondary}
          onPress={params.onContinue}
        />
      ),
    };
  };

  state = {
    cinemas: [],
    selectedCinemas: [],
    isLoading: true,
    search: '',
    searchIsFocused: false,
    selectionIsOpen: false,
  };

  async componentDidMount() {
    try {
      const cinemas = await Api.getCinemas();
      const selectedCinemas = await Storage.getSavedCinemas();
      this.setState({ cinemas, selectedCinemas, isLoading: false });
    } catch (e) {
      alert(e.message);
    }

    this.props.navigation.setParams({
      onContinue: this.onContinue
    });
  }

  onContinue = () => {
    if (this.state.selectedCinemas.length > 0) {
      this.props.navigation.navigate('Film');
    } else {
      alert('Selecteer één of meerdere bioscopen om door te gaan.');
    }
  };

  toggleCinema(cinema) {
    const { id } = cinema;

    this.setState(({ selectedCinemas }) => {
      const index = selectedCinemas.findIndex(cinema => cinema.id === id);

      if (index === -1) {
        selectedCinemas.push(cinema);
      } else {
        selectedCinemas.splice(index, 1);
      }

      return { selectedCinemas };
    }, this.saveSelectedCinemas);
  }

  toggleSelection = () => {
    this.setState(state => ({ selectionIsOpen: !state.selectionIsOpen }));
  };

  onSearchFocus = () => {
    this.setState({ searchIsFocused: true });
  };

  onSearchBlur = () => {
    this.setState({ searchIsFocused: false });
  };

  get filteredCinemas() {
    const query = this.state.search.toLowerCase();
    return this.state.cinemas.filter(cinema => {
      const title = cinema.title.replace('é', 'e').toLowerCase();
      return title.indexOf(query) !== -1;
    });
  }

  render() {
    const { selectedCinemas, isLoading, search, searchIsFocused, selectionIsOpen } = this.state;

    return (
      <View style={styles.container}>
        {/* TODO: animate focus */}
        <View style={[styles.search, searchIsFocused && styles.searchActive]}>
          <Input
            placeholder="Search"
            value={search}
            icon="search"
            style={searchIsFocused && styles.searchInputActive}
            onChange={search => this.setState({ search })}
            onFocus={this.onSearchFocus}
            onBlur={this.onSearchBlur}/>
        </View>
        {isLoading
          ? <Spinner/>
          : <ListView
            items={this.filteredCinemas}
            renderItem={({ item }) =>
              <CinemaListItem
                {...item}
                onPress={() => this.toggleCinema(item)}
                isSelected={selectedCinemas.some(cinema => cinema.id === item.id)}/>
            }
            style={{ backgroundColor: Colors.lightTint }}
            renderKey={cinema => cinema.id}/>}
        {/* TODO: Top shadow toevoegen */}
        <View>
          {selectionIsOpen && <View style={styles.selectionContent}>
            {selectedCinemas.map(cinema =>
              <Text style={styles.selectionContentRow} key={cinema.id}>{cinema.title}</Text>
            )}
          </View>}
          <View style={styles.selectionBar}>
            <View>
              <Text style={styles.selectionBarTitle}>Jouw selectie:</Text>
              <Text style={styles.selectionBarLabel}>{selectedCinemas.length} vestigingen</Text>
            </View>
            <View style={styles.selectionBarAction}>
              {selectedCinemas.length > 0 && <Text
                style={styles.selectionBarActionLink}
                onPress={this.toggleSelection}>
                {selectionIsOpen ? 'Verberg' : 'Bekijk'}
              </Text>}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    height: 60,
    padding: 10,
    backgroundColor: Colors.primary,
  },
  searchActive: {
    padding: 0,
  },
  searchInputActive: {
    height: '100%',
    borderRadius: 0,
  },
  selectionBar: {
    height: 80,
    paddingHorizontal: 40,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightTint,
  },
  selectionBarTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  selectionBarLabel: {
    color: Colors.dark,
  },
  selectionBarAction: {
    paddingHorizontal: 10,
  },
  selectionBarActionLink: {
    color: Colors.primaryTint,
    fontSize: 15,
    textAlign: 'center',
  },
  selectionContent: {
    padding: 20,
    backgroundColor: Colors.lightTint,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightDark,
  },
  selectionContentRow: {
    height: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: Colors.dark,
    fontWeight: 'bold',
  },
});
