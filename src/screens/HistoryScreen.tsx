import React, {useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '$src/store/store';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {loadFavoriteJokes, toggleFavorite} from '$src/store/jokesSlice';
import {useAppDispatch} from '$src/hooks/useAppDispatch';
import {AppTheme} from '$src/styles/theme';
import {Joke} from '$src/types/jokes';
import JokeItem from '$src/components/JokeItem';

const HistoryScreen = () => {
  const dispatch = useAppDispatch();
  const favoriteJokes = useSelector(
    (state: RootState) => state.jokes.favoriteJokes,
  );
  const {styles} = useStyles(stylesheet);

  useEffect(() => {
    dispatch(loadFavoriteJokes());
  }, [dispatch]);

  const handleToggleFavorite = (joke: Joke) => {
    dispatch(toggleFavorite(joke));
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={favoriteJokes}
        renderItem={({item}) => (
          <JokeItem joke={item} onToggleFavorite={handleToggleFavorite} />
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No favorite jokes yet</Text>
        }
      />
    </View>
  );
};

const stylesheet = createStyleSheet((theme: AppTheme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  listContent: {
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: theme.fontSizes.large,
    textAlign: 'center',
    marginTop: 20,
    color: theme.colors.grey,
    fontFamily: theme.fonts.medium,
  },
}));

export default HistoryScreen;
