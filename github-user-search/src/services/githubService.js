import axios from "axios";

const USER_API = "https://api.github.com/users/";
const SEARCH_API = "https://api.github.com/search/users?q=";

// Basic single-user fetch (from Task 1)
export const fetchUserData = async (username) => {
  const response = await axios.get(`${USER_API}${username}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
    },
  });
  return response.data;
};

// Advanced search
export const searchUsers = async (username, location, minRepos, page = 1) => {
  let query = "";

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>${minRepos} `;

  const response = await axios.get(
    `${SEARCH_API}${encodeURIComponent(query)}&page=${page}&per_page=10`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
      },
    }
  );

  return {
    items: response.data.items,
    total: response.data.total_count,
  };
};
