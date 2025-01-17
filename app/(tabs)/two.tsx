// import axios from 'axios';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const url =
    'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=304554';
  const options = {
    method: 'GET',
    // url: 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation',
    headers: {
      'x-rapidapi-key': '2c964c95c5msh955042ea31151c5p14714djsn9777c2d3252d',
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
    },
  };
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    fetchDefaultHotels();
  }, []);

  const fetchDefaultHotels = async () => {
    try {
      // const response = await axios.request(options);
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      setData(result?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/two.tsx" title="Tab Two" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
