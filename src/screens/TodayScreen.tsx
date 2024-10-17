import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import {fetchRandomJoke, toggleFavorite} from '$src/store/jokesSlice';
import {RootState} from '$src/store/store';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {useAppDispatch} from '$src/hooks/useAppDispatch';
import {AppTheme} from '$src/styles/theme';
import JokeOnHome from '$src/components/JokeOnHome';

const TodayScreen = () => {
  const dispatch = useAppDispatch();
  const {currentJoke, loading, error, favoriteJokes} = useSelector(
    (state: RootState) => state.jokes,
  );
  const {styles} = useStyles(stylesheet);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchRandomJoke());
  }, [dispatch]);

  const handleNewJoke = async () => {
    setRefreshing(true);
    await dispatch(fetchRandomJoke());
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleToggleFavorite = () => {
    if (currentJoke) {
      dispatch(toggleFavorite(currentJoke));
    }
  };

  const isCurrentJokeLiked = currentJoke
    ? favoriteJokes.some(joke => joke.id === currentJoke.id)
    : false;

  if (loading || refreshing) {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleNewJoke} />
      }>
      <JokeOnHome
        joke={currentJoke}
        isLiked={isCurrentJokeLiked}
        onToggleFavorite={handleToggleFavorite}
      />
    </ScrollView>
  );
};

const stylesheet = createStyleSheet((theme: AppTheme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 64,
  },
  error: {
    color: 'red',
    fontSize: theme.fontSizes.medium,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: theme.fonts.medium,
  },
}));

export default TodayScreen;
