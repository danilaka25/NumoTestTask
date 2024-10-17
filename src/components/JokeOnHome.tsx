import React from 'react';
import {View, Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import LikeToggle from '$src/components/LikeToggle';
import {AppTheme} from '$src/styles/theme';
import {Joke} from '$src/types/jokes';

interface JokeOnHomeProps {
  joke: Joke | null;
  isLiked: boolean;
  onToggleFavorite: () => void;
}

const JokeOnHome: React.FC<JokeOnHomeProps> = ({
  joke,
  isLiked,
  onToggleFavorite,
}) => {
  const {styles} = useStyles(stylesheet);

  if (!joke) return null;

  return (
    <View style={styles.container}>
      <View style={styles.jokeContainer}>
        {joke.type === 'single' ? (
          <Text style={styles.jokeText}>{joke.joke}</Text>
        ) : (
          <>
            <Text style={styles.jokeText}>{joke.setup}</Text>
            <Text style={styles.jokeText}>{joke.delivery}</Text>
          </>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <LikeToggle isLiked={isLiked} onToggle={onToggleFavorite} />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme: AppTheme) => ({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  jokeContainer: {
    marginBottom: 16,
  },
  jokeText: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.black,
    fontFamily: theme.fonts.medium,
    lineHeight: 38,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
}));

export default JokeOnHome;
