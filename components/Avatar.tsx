import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Image, Button } from 'react-native';

import { supabase } from '../utils/supabase';

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
  editable?: boolean;
  name?: string;
}

export default function Avatar({
  url = null,
  size = 150,
  onUpload,
  editable = false,
  name,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url ?? null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // Restrict to only images
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1,
        exif: false, // We don't want nor need that data.
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('User cancelled image picker.');
        return;
      }

      const image = result.assets[0];
      console.log('Got image', result);

      if (!image.uri) {
        throw new Error('No image uri!'); // Realistically, this should never happen, but just in case...
      }

      const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer());

      const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const fileName = `${Date.now()}.${fileExt}`;

      const path = `${Date.now()}.${fileExt}`;
      console.log('updating profile: ', path, ' ', arraybuffer);
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, arraybuffer, {
          contentType: `image/${fileExt}`,
        });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(data.path);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error updating profile: ', error);
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  console.log('editable: ', url);

  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      {editable && (
        <View>
          <Button
            title={uploading ? 'Uploading ...' : 'Upload'}
            onPress={uploadAvatar}
            disabled={uploading}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 50,
    overflow: 'hidden',
    maxWidth: '100%',
    backgroundColor: '#333',
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(200, 200, 200)',
    borderRadius: 50,
  },
});
