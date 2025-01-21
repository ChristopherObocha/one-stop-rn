import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import { Spacer } from '~/utils/Spacer';
import { constants, Hotel } from '~/utils/constants';

const { DEFAULT_HOTELS } = constants;

export default function Home() {
  const hotelData = DEFAULT_HOTELS;

  const HotelCard = ({ hotel }: { hotel: any }) => {
    return (
      <View style={styles.hotelCard}>
        <Image source={hotel.image_url} style={styles.hotelImage} />
        <View style={styles.hotelInfo}>
          <Text variant="heading" style={styles.hotelName}>
            {hotel.name}
          </Text>
          <Spacer size={10} vertical />
          <Text variant="body" style={styles.hotelLocation}>
            {`${hotel.city_name}, ${hotel.country}`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <ScrollView style={styles.container}>
        <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
          {hotelData?.data?.map((hotel: Hotel, index: number) => (
            <HotelCard key={`${hotel.dest_id}-${index}`} hotel={hotel} />
          ))}
        </ScrollView>
        <Spacer size={10} vertical />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 24,
  },
  scrollView: {
    flexDirection: 'row',
  },
  hotelCard: {
    backgroundColor: 'white',
    marginBottom: 10,
    maxHeight: 200,
    width: 180,
    marginRight: 10,
    borderRadius: 10,
    paddingBottom: 10,
  },
  hotelImage: {
    height: 100,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  hotelInfo: {
    padding: 10,
  },
  hotelName: {
    fontWeight: 'bold',
  },
  hotelLocation: {
    color: 'gray',
    lineHeight: 18,
  },
});
