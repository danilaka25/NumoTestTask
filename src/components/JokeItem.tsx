import React from 'react';
import {View, Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import LikeToggle from '$src/components/LikeToggle';
import {AppTheme} from '$src/styles/theme';
import {Joke} from '$src/types/jokes';

interface JokeItemProps {
  joke: Joke;
  onToggleFavorite: (joke: Joke) => void;
}

const JokeItem: React.FC<JokeItemProps> = ({joke, onToggleFavorite}) => {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.jokeItem}>
      {joke.type === 'single' ? (
        <Text style={styles.jokeText}>{joke.joke}</Text>
      ) : (
        <>
          <Text style={styles.jokeText}>{joke.setup}</Text>
          <Text style={styles.jokeText}>{joke.delivery}</Text>
        </>
      )}
      <View style={styles.likeContainer}>
        <LikeToggle
          isLiked={true}
          onToggle={() => onToggleFavorite(joke)}
          size={48}
        />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme: AppTheme) => ({
  jokeItem: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e5e5',
  },
  jokeText: {
    fontSize: theme.fontSizes.medium,
    paddingRight: 20,
    color: theme.colors.black,
    fontFamily: theme.fonts.medium,
    flex: 1,
  },
  likeContainer: {
    alignItems: 'flex-end',
    marginLeft: 20,
    width: 48,
  },
}));

export default JokeItem;
