import { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert, Platform, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import Avatar from '~/components/Avatar';
import { Avatar, AvatarFallback } from '~/components/nativewindui/Avatar';
import { Button } from '~/components/nativewindui/Button';
// import { Text } from '~/components/nativewindui/Text';
import { TextField } from '~/components/nativewindui/TextField';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';
import { useAuthStore } from '~/stores/useAuthStore';
import { COLORS } from '~/theme/colors';
import { Spacer } from '~/utils/Spacer';
import { supabase } from '~/utils/supabase';

export default function Account() {
  const { session, profile, setProfile, loading } = useAuthStore();
  const [username, setUsername] = useState(profile?.username ?? '');
  const [website, setWebsite] = useState(profile?.website ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? '');
  const updatedAt = profile?.updated_at ?? '';

  const insets = useSafeAreaInsets();

  const colorScheme = useColorScheme();
  const { colors } = colorScheme;

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
      padding: 12,
      paddingTop: insets.top,
      paddingBottom: insets.bottom + 20,
    },
    avatarContainer: {
      alignItems: 'center',
      alignSelf: 'center',
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    },
    mt20: {
      marginTop: 20,
    },
    titleContainer: {
      borderBottomWidth: 1,
      borderBottomColor: colors.grey4,
    },
    title: {
      fontSize: 34, // equivalent to text-4xl
      fontWeight: '500', // equivalent to font-medium
      color: COLORS.black,
    },
    avatarText: {
      fontSize: 34, // equivalent to text-4xl
      fontWeight: '500', // equivalent to font-medium
      color: colors.background,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, textColor]}>Profile</Text>
      </View>
      <Spacer size={20} vertical />
      <View style={styles.avatarContainer}>
        {/* <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        /> */}
        <Avatar alt="Zach Nugent's Profile" className="h-24 w-24">
          <AvatarFallback>
            <Text style={styles.avatarText}>ZN</Text>
          </AvatarFallback>
        </Avatar>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextField label="Email" value={session?.user?.email} />
      </View>
      <View style={styles.verticallySpaced}>
        <TextField
          label="Username"
          value={username || ''}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextField
          label="Website"
          value={website || ''}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          disabled={loading}>
          <Text>{loading ? 'Loading ...' : 'Update'}</Text>
        </Button>
      </View>

      <View style={styles.verticallySpaced}>
        <Button onPress={() => useAuthStore.getState().signOut()}>
          <Text>Sign Out</Text>
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Text>Updated at: {updatedAt as string}</Text>
      </View>
    </ScrollView>
  );
}
