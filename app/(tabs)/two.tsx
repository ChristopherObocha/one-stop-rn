// import axios from 'axios';
import { Stack } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// import { ScreenContent } from '~/components/ScreenContent';
import { Text } from '~/components/nativewindui/Text';

const API_URL = 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=man';
const API_OPTIONS = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '2c964c95c5msh955042ea31151c5p14714djsn9777c2d3252d',
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
  },
} as const;

export default function Home() {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDefaultHotels = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL, API_OPTIONS);
      const result = await response.json();
      setData(result?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDefaultHotels();
  }, [fetchDefaultHotels]);

  console.log('data: ', data);

  const HotelCard = ({ hotel }: { hotel: any }) => {
    console.log(hotel);
    return (
      <View style={styles.hotelCard}>
        <Text>{hotel.name}</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View style={styles.container}>
        {/* <ScreenContent path="app/(tabs)/two.tsx" title="Tab Two" />
         */}
        <ScrollView style={{ flex: 1, backgroundColor: 'red' }} horizontal>
          {data?.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  hotelCard: {
    backgroundColor: 'grey',
    padding: 10,
    marginBottom: 10,
    height: 100,
    width: 60,
    marginRight: 10,
    borderRadius: 10,
  },
});
