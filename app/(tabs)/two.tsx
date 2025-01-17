// import axios from 'axios';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

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

  const fetchDefaultHotels = async () => {
    try {
      // const response = await axios.request(options);
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  fetchDefaultHotels();

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
