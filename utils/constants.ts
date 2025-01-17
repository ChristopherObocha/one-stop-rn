export interface Hotel {
  cc1: string;
  city_name: string;
  city_ufi: number | null;
  country: string;
  dest_id: string;
  dest_type: string;
  hotels: number;
  image_url: string;
  label: string;
  latitude: number;
  lc: string;
  longitude: number;
  name: string;
  nr_hotels: number;
  region: string;
  roundtrip: string;
  search_type: string;
  type: string;
}

interface DefaultHotels {
  data: Hotel[];
  message: string;
  status: boolean;
  timestamp: number;
}

const DIRECTIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

const DEFAULT_HOTELS: DefaultHotels = {
  data: [
    {
      cc1: 'us',
      city_name: 'New York',
      city_ufi: 20088325,
      country: 'United States',
      dest_id: '929',
      dest_type: 'district',
      hotels: 1267,
      image_url:
        'https://cf.bstatic.com/xdata/images/district/150x150/57691.jpg?k=de3390bd7f9a501b600f4954a39cb97aefe8ea5acaf438d75d689219a94fe981&o=',
      label: 'Manhattan, New York, New York, United States',
      latitude: 40.776115,
      lc: 'en',
      longitude: -73.970894,
      name: 'Manhattan',
      nr_hotels: 1267,
      region: 'New York',
      roundtrip: 'GhBmMzUzMDcyOTgxOTAwMGY5IAAoATICZW46A21hbkAASgBQAA==',
      search_type: 'district',
      type: 'di',
    },
    {
      cc1: 'us',
      city_name: 'Manchester',
      city_ufi: null,
      country: 'United States',
      dest_id: '20079942',
      dest_type: 'city',
      hotels: 21,
      image_url:
        'https://cf.bstatic.com/xdata/images/city/150x150/980138.jpg?k=13118c0c36fd028243e14cd7fbd70f7e9b0364ef8dfc82e82791d3022aac8bc7&o=',
      label: 'Manchester, New Hampshire, United States',
      latitude: 42.9956,
      lc: 'en',
      longitude: -71.4553,
      name: 'Manchester',
      nr_hotels: 21,
      region: 'New Hampshire',
      roundtrip: 'GhBmMzUzMDcyOTgxOTAwMGY5IAEoATICZW46A21hbkAASgBQAA==',
      search_type: 'city',
      type: 'ci',
    },
    {
      cc1: 'gb',
      city_name: 'Manchester',
      city_ufi: null,
      country: 'United Kingdom',
      dest_id: '-2602512',
      dest_type: 'city',
      hotels: 1088,
      image_url:
        'https://cf.bstatic.com/xdata/images/city/150x150/976977.jpg?k=8d13c94917fa00569d115c9123c7b5789ad41f7383b6fad32a1bda8e215e8936&o=',
      label: 'Manchester, Greater Manchester, United Kingdom',
      latitude: 53.4812,
      lc: 'en',
      longitude: -2.23615,
      name: 'Manchester',
      nr_hotels: 1088,
      region: 'Greater Manchester',
      roundtrip: 'GhBmMzUzMDcyOTgxOTAwMGY5IAIoATICZW46A21hbkAASgBQAA==',
      search_type: 'city',
      type: 'ci',
    },
    {
      cc1: 'ph',
      city_name: 'Manila',
      city_ufi: null,
      country: 'Philippines',
      dest_id: '-2437894',
      dest_type: 'city',
      hotels: 4803,
      image_url:
        'https://cf.bstatic.com/xdata/images/city/150x150/685726.jpg?k=25b602b90c38b13fe9e858b62a9bbd3c773bf459b16e84b26642a8a056c9f524&o=',
      label: 'Manila, Luzon, Philippines',
      latitude: 14.5967655,
      lc: 'en',
      longitude: 120.98368,
      name: 'Manila',
      nr_hotels: 4803,
      region: 'Luzon',
      roundtrip: 'GhBmMzUzMDcyOTgxOTAwMGY5IAMoATICZW46A21hbkAASgBQAA==',
      search_type: 'city',
      type: 'ci',
    },
    {
      cc1: 'bh',
      city_name: 'Manama',
      city_ufi: null,
      country: 'Bahrain',
      dest_id: '-784833',
      dest_type: 'city',
      hotels: 199,
      image_url:
        'https://cf.bstatic.com/xdata/images/city/150x150/654907.jpg?k=ad1646e402771be9a1e984c4a4aea71121a2ae474b4bbc99386ccc0ef04f5c7c&o=',
      label: 'Manama, Capital Governorate, Bahrain',
      latitude: 26.2235,
      lc: 'en',
      longitude: 50.58224,
      name: 'Manama',
      nr_hotels: 199,
      region: 'Capital Governorate',
      roundtrip: 'GhBmMzUzMDcyOTgxOTAwMGY5IAQoATICZW46A21hbkAASgBQAA==',
      search_type: 'city',
      type: 'ci',
    },
  ],
  message: 'Success',
  status: true,
  timestamp: 1737075666567,
};

const SEARCH_HOTELS_MAN = {
  API_URL: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=man',
  API_OPTIONS: {
    method: 'GET',
    headers: {
      KEY: '2c964c95c5msh955042ea31151c5p14714djsn9777c2d3252d',
      HOST: 'booking-com15.p.rapidapi.com',
    },
  },
};

export const constants = {
  DEFAULT_HOTELS_STRING: JSON.stringify(DEFAULT_HOTELS),
  DEFAULT_HOTELS_PARSED: DEFAULT_HOTELS,
  DEFAULT_HOTELS,
  SEARCH_HOTELS_MAN,
  ...DIRECTIONS,
};
