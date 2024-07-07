import axios from 'axios';

const CIVIC_API_URL = 'https://www.googleapis.com/civicinfo/v2/representatives';
const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const LOC_API_URL = 'https://api.congress.gov/v3';
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const CIVIC_API_KEY = process.env.REACT_APP_CIVIC_API_KEY;
const GEOCODING_API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;
const LOC_API_KEY = process.env.REACT_APP_LOC_API_KEY;
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

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
        format: 'json',
        limit: 10,
        api_key: LOC_API_KEY,
      },
    });
    console.log('API Response for recent bills:', response.data);
    return response.data.bills || []; // Ensure this matches the structure of your API response
  } catch (error) {
    console.error('Error fetching recent bills:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getNewsArticles = async () => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: 'politics',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
        apiKey: NEWS_API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news articles:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getMembersOfCongress = async () => {
  try {
    const response = await axios.get(`${LOC_API_URL}/member`, {
      params: {
        format: 'json',
        api_key: LOC_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching members of Congress:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getMemberSponsoredLegislation = async (bioguideId) => {
  try {
    const response = await axios.get(`${LOC_API_URL}/member/${bioguideId}/sponsored-legislation`, {
      params: {
        format: 'json',
        api_key: LOC_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching sponsored legislation for member ${bioguideId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getMemberCosponsoredLegislation = async (bioguideId) => {
  try {
    const response = await axios.get(`${LOC_API_URL}/member/${bioguideId}/cosponsored-legislation`, {
      params: {
        format: 'json',
        api_key: LOC_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching cosponsored legislation for member ${bioguideId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};
