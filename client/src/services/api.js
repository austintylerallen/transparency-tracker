import axios from 'axios';

const CIVIC_API_URL = 'https://www.googleapis.com/civicinfo/v2/representatives';
const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const LOC_API_URL = 'https://api.congress.gov/v3';
const CIVIC_API_KEY = process.env.REACT_APP_CIVIC_API_KEY;
const GEOCODING_API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;
const LOC_API_KEY = process.env.REACT_APP_LOC_API_KEY;

export const getRepresentativesByAddress = async (address) => {
  try {
    const response = await axios.get(CIVIC_API_URL, {
      params: {
        key: CIVIC_API_KEY,
        address: address,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching representatives by address:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getAddressFromCoords = async (latitude, longitude) => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        latlng: `${latitude},${longitude}`,
        key: GEOCODING_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching address from coordinates:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getRecentBills = async () => {
  try {
    const response = await axios.get(`${LOC_API_URL}/bill`, {
      params: {
        api_key: LOC_API_KEY,
        format: 'json',
        limit: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent bills:', error.response ? error.response.data : error.message);
    throw error;
  }
};
