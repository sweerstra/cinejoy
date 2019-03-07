import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeaderIcon from '../components/HeaderIcon';
import GridView from '../components/view/GridView';
import ListView from '../components/view/ListView';
import MovieListItem from '../components/view/items/MovieListItem';
import Spinner from '../components/Spinner';
import ChoiceButtons from '../components/ui/ChoiceButtons';
import Colors from '../constants/Colors';
import Api from '../data/Api';

export default class FilmScreen extends React.Component {
  state = {
    availableMovies: [],
    expectedMovies: [],
    isLoading: false,
    type: 'Beschikbaar',
    brands: ['euroscoop'/*, 'pathe', 'kinepolis'*/],
    view: 'grid'
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: 'Film',
      headerTitleStyle: {
        color: Colors.light,
      },
      headerStyle: {
        backgroundColor: Colors.primaryDark,
      },
      headerRight: params && (
        <HeaderIcon
          name={params.view === 'grid' ? 'list' : 'grid'}
          color={Colors.light}
          onPress={params.toggleView}
        />
      ),
    };
  };

  async componentDidMount() {
    try {
      const { type, brands } = this.state;
      await this.fetchMoviesForType(type, brands);
    } catch (e) {
      this.setState({ isLoading: false });
      alert(e.message);
    }

    this.props.navigation.setParams({
      view: this.state.view,
      toggleView: this.toggleView
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const { type, brands } = this.state;

    if (type !== prevState.type) {
      await this.fetchMoviesForType(type, brands);
    }
  }

  async fetchMoviesForType(type, brands) {
    const { availableMovies, expectedMovies } = this.state;

    if (type === 'Beschikbaar') {
      if (availableMovies.length === 0) {
        this.setState({ isLoading: true });
        this.setState({ availableMovies: await Api.getAvailableMovies(brands), isLoading: false });
      }
    } else {
      if (expectedMovies.length === 0) {
        this.setState({ isLoading: true });
        this.setState({ expectedMovies: await Api.getExpectedMovies(brands), isLoading: false });
      }
    }
  }

  selectMovie = (item) => {
    alert(`Something happened: ${item.title}`);
  };

  toggleView = () => {
    this.setState(state => {
      const view = state.view === 'grid' ? 'list' : 'grid';
      return { view };
    }, () => {
      this.props.navigation.setParams({
        view: this.state.view
      });
    });
  };

  setType = (type) => {
    this.setState({ type });
  };

  render() {
    const { availableMovies, expectedMovies, isLoading, type, view } = this.state;

    const movies = type === 'Beschikbaar'
      ? availableMovies
      : expectedMovies;

    const content = isLoading
      ? <Spinner/>
      : view === 'grid'
        ? <GridView items={movies} onSelect={this.selectMovie}/>
        : <ListView
          items={movies}
          renderItem={({ item }) =>
            <MovieListItem
              {...item}
              onPress={() => this.selectMovie(item)}/>
          }
          renderKey={movie => movie.title}/>;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles[view]}
        showsVerticalScrollIndicator={false}
      >
        <ChoiceButtons
          style={styles.choiceButtonsContainer}
          values={['Beschikbaar', 'Verwacht']}
          selected={type}
          onSelect={this.setType}/>
        {content}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
  },
  choiceButtonsContainer: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
