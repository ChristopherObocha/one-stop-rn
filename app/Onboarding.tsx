import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '~/lib/useColorScheme';
import { textStyles } from '~/utils/styles';

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      paddingTop: insets.top + 20,
      paddingBottom: insets.bottom + 20,
      paddingHorizontal: 15,
      backgroundColor: colors.background,
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
    </View>
  );
};

export default Onboarding;
