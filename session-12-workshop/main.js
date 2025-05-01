const requestOptions = {
  year: 1997,
  month: "",
  day: "",
  text: "",
};

// primesc functia de la Andreea si o testez
// trimit functia Elenei

const getHistoricalEvents = async (apiKey, requestOptions = {}) => {
  if (!apiKey) throw new Error("API Key not provided");

  const { year = 1995, month, day, text } = requestOptions;

  let url = "https://api.api-ninjas.com/v1/historicalevents";

  const params = [year];

  if (year) params.push(`year=${year}`);
  if (month) params.push(`month=${month}`);
  if (day) params.push(`day=${day}`);
  if (text) params.push(`text=${encodeURIComponent(text)}`);

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  console.log("Request URL:", url);

  const urlOptions = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch(url, urlOptions);
    if (!response.ok) throw new Error(`Status error: ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getHistoricalEvents(API_KEY, requestOptions);
