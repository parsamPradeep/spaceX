import axios from "axios";

export const fetchAllLaunches = async () => {
  const response = await axios
    .get("https://api.spacexdata.com/v3/launches")
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const fetchPastLaunches = async (start, end) => {
  const response = await axios
    .get(
      `https://api.spacexdata.com/v3/launches/past?start=${start}&end=${end}`
    )
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const fetchUpcomingLaunches = async () => {
  const response = await axios
    .get("https://api.spacexdata.com/v3/launches/upcoming")
    .catch((err) => {
      console.log(err);
    });
  return response;
};
