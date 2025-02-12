export const BASE_URL = "https://api.unsplash.com/";
export const ACCESS_KEY = import.meta.env.VITE_UNSPLASH__ACCESS_KEY

export const config = {
  headers: {
    Authorization: "Client-ID" + " " + ACCESS_KEY,
  },
};
