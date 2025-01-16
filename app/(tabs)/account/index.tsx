import { useState } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';

import Avatar from '~/components/Avatar';
import { Button } from '~/components/nativewindui/Button';
import { TextField } from '~/components/nativewindui/TextField';
import { useAuthStore } from '~/stores/useAuthStore';
import { supabase } from '~/utils/supabase';

export default function Account() {
  const { session, profile, setProfile, loading } = useAuthStore();
  const [username, setUsername] = useState(profile?.username ?? '');
  const [website, setWebsite] = useState(profile?.website ?? '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? '');

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
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        console.log('Error updating profile', error);
        throw error;
      }

      setProfile({ username, website, avatar_url });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error updating profile', error);
        Alert.alert(error.message);
      }
    }
  }

  console.log('Profile avatar_url', avatarUrl);

  return (
    <View style={styles.container}>
      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
