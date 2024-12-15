const url = process.env.TEAMS_URL;
const key = process.env.TEAMS_KEY;
const host = process.env.TEAMS_HOST;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": `${key}`,
    "x-rapidapi-host": `${host}`,
  },
};

export const getTeams = async function () {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTeamById = async function (id) {
  try {
    const response = await fetch(
      `https://api-nba-v1.p.rapidapi.com/teams?id=${id}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPlayersByTeamId = async function (id) {
  try {
    const response = await fetch(
      `https://api-nba-v1.p.rapidapi.com/players?team=${id}&season=2024`,
      options
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
