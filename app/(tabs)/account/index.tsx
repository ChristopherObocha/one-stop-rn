import { Icon } from '@roninoss/icons';
import { format } from 'date-fns';
import { router } from 'expo-router';
import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Platform,
  Text,
  Linking,
  TextStyle,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import Onboarding from '~/app/Onboarding';
// import Avatar from '~/components/Avatar';
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Avatar, AvatarFallback } from '~/components/nativewindui/Avatar';
import {
  ESTIMATED_ITEM_HEIGHT,
  List,
  ListItem,
  ListRenderItemInfo,
  ListSectionHeader,
} from '~/components/nativewindui/List';
import { useColorScheme } from '~/lib/useColorScheme';
import { useAuthStore } from '~/stores/useAuthStore';
import { COLORS } from '~/theme/colors';
import { Spacer } from '~/utils/Spacer';
import { textStyles } from '~/utils/styles';
import { supabase } from '~/utils/supabase';

export default function Account() {
  const { session, profile, setProfile, loading } = useAuthStore();
  const username = profile?.username ?? '';
  const website = profile?.website ?? '';
  const avatarUrl = profile?.avatar_url ?? '';
  const updatedAt = profile?.updated_at ?? '';

  const insets = useSafeAreaInsets();

  const colorScheme = useColorScheme();
  const { colors } = colorScheme;

  const ESTIMATED_ITEM_SIZE =
    ESTIMATED_ITEM_HEIGHT[Platform.OS === 'ios' ? 'titleOnly' : 'withSubTitle'];

  const textColor = {
    color: colors.foreground,
  };

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      if (!session?.user) throw new Error('No user on the session!');
      // console.log('Profile avatar_url', avatar_url);

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        console.log('Error updating profile', error);
        throw error;
      }

      setProfile({
        username,
        website,
        avatar_url,
        // updated_at: new Date().toISOString(),
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error updating profile', error);
        Alert.alert(error.message);
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 40,
      paddingTop: insets.top,
      paddingBottom: insets.bottom + 20,
    },
    avatarContainer: {
      alignItems: 'center',
      alignSelf: 'center',
    },
    buttonContainer: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      alignSelf: 'center',
    },
    buttonText: {
      color: colors.background,
      fontSize: 16,
      fontWeight: '500',
    },
    contentContainer: {
      paddingBottom: 70,
    },
    ctaButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emphasis: {
      fontWeight: 'bold',
      color: colors.grey,
      fontSize: 16,
      lineHeight: 16,
    },
    header: {
      ...(textStyles.header1 as TextStyle),
      color: colors.foreground,
      fontWeight: '600',
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
      paddingHorizontal: 15,
    },
    mt20: {
      marginTop: 20,
    },
    paddingHorizontal: {
      paddingHorizontal: 15,
      flex: 1,
    },
    text: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.foreground,
    },
    textHeaderContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    titleContainer: {
      paddingHorizontal: 15,
    },
    title: {
      fontSize: 34, // equivalent to text-4xl
      fontWeight: '500', // equivalent to font-medium
      color: COLORS.black,
    },
    avatarText: {
      fontSize: 40, // equivalent to text-4xl
      fontWeight: '500', // equivalent to font-medium
      color: colors.background,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, textColor]}>Profile</Text>
      </View>
      <Spacer size={20} vertical />
      <View style={styles.avatarContainer}>
        <Image
          source={require('~/assets/images/logo.png')}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
          }}
        />
      </View>
      <Spacer size={24} vertical />
      <View style={styles.textHeaderContainer}>
        <Text style={styles.header}>{username}</Text>
        <Spacer size={4} vertical />
        <Text style={styles.emphasis}>{session?.user?.email}</Text>
      </View>
      <Spacer size={30} vertical />

      <View style={styles.paddingHorizontal}>
        <Text style={styles.text}>
          Last updated on: <Text style={styles.emphasis}>{format(updatedAt, 'MM/dd/yyyy')}</Text>
        </Text>
      </View>

      {/* LIST */}
      <Spacer size={10} vertical />
      <List
        variant="insets"
        data={DATA}
        sectionHeaderAsGap={Platform.OS === 'ios'}
        estimatedItemSize={ESTIMATED_ITEM_SIZE}
        renderItem={renderItem}
      />

      {/* BUTTONS  */}
      <Spacer size={40} vertical />
      <TouchableOpacity
        onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
        style={[styles.buttonContainer, styles.ctaButton]}>
        {loading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Update</Text>}
      </TouchableOpacity>

      <Spacer size={20} vertical />
      <TouchableOpacity
        onPress={() => useAuthStore.getState().signOut()}
        style={styles.buttonContainer}>
        <Text style={[styles.buttonText, { color: colors.destructive }]}>Sign Out</Text>
      </TouchableOpacity>

      {/* FOOTER  */}
      <Spacer size={40} vertical />
    </ScrollView>
  );
}

export function renderItem(info: ListRenderItemInfo<DataItem>) {
  return <Item info={info} />;
}

function Item({ info }: { info: ListRenderItemInfo<DataItem> }) {
  const { colors } = useColorScheme();

  if (typeof info.item === 'string') {
    return <ListSectionHeader {...info} />;
  }
  return (
    <ListItem
      titleClassName="text-lg"
      rightView={
        <View className="flex-1 flex-row items-center gap-0.5 px-2">
          {!!info.item.value && <Text className="text-muted-foreground">{info.item.value}</Text>}
          <Icon name="chevron-right" size={22} color={colors.grey2} />
        </View>
      }
      onPress={info.item.onPress}
      {...info}
    />
  );
}

type DataItem = {
  id: string;
  title: string;
  value?: string;
  subTitle?: string;
  onPress: () => void;
};

const DATA: DataItem[] = [
  {
    id: '4',
    title: 'Personal Information',
    ...(Platform.OS === 'ios' ? { value: 'Push' } : { subTitle: 'Push' }),
    onPress: () => router.push('/profile/notifications'),
  },
  {
    id: '4',
    title: 'Notifications',
    ...(Platform.OS === 'ios' ? { value: 'Push' } : { subTitle: 'Push' }),
    onPress: () => router.push('/profile/notifications'),
  },
  {
    id: '6',
    title: 'Support',
    ...(Platform.OS === 'ios' ? { value: 'Discord' } : { subTitle: 'Discord' }),
    onPress: () => Linking.openURL('https://nativewindui.com/discord'),
  },
  {
    id: '7',
    title: 'About',
    ...(Platform.OS === 'ios' ? { value: 'NativeWindUI' } : { subTitle: 'NativeWindUI' }),
    onPress: () => Linking.openURL('https://nativewindui.com/'),
  },
];
