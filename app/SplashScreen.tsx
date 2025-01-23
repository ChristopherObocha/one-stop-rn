import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '~/lib/useColorScheme';
import { COLORS } from '~/theme/colors';
import { textStyles } from '~/utils/styles';

const LogoSVG = require('~/assets/svgs/logo-svg.svg');

const SplashScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      paddingTop: insets.top + 20,
      paddingBottom: insets.bottom + 20,
      paddingHorizontal: 15,
      backgroundColor: colors.primary,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: '80%',
      height: 100,
      color: COLORS.white,
    },
    title: {
      ...textStyles.title,
      color: COLORS.white,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={LogoSVG} style={styles.logo} />
      <Text style={styles.title}>Plan. Save. Travel Together</Text>
    </View>
  );
};

export default SplashScreen;
