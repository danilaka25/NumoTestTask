import React from 'react';
import {View, Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {AppTheme} from '$src/styles/theme';

interface CustomHeaderProps {
  title: string;
  insetsTop: number;
  bgColor: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  insetsTop,
  bgColor,
}) => {
  const {styles} = useStyles(stylesheet);
  return (
    <View
      style={[
        styles.headerContainer,
        {paddingTop: insetsTop, backgroundColor: bgColor},
      ]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme: AppTheme) => ({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  header: {
    height: 136,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: theme.fontSizes.maximum,
    fontFamily: theme.fonts.bold,
    fontWeight: 'bold',
    marginLeft: 24,
    color: theme.colors.black,
  },
}));

export default CustomHeader;
