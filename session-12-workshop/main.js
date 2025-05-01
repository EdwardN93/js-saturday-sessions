const API_KEY = `kT9nWX/DQJB8hw5UyjGGYg==wEbNP4vTGxttHScM`;

const requestOptions = {
  year: "",
  month: "5",
  day: "",
  text: "roman empire",
};

// primesc functia de la Andreea si o testez
//trimit functia Elenei

const getHistoricalEvents = async (apiKey, requestOptions = {}) => {
  if (!apiKey) throw new Error(`Api Key not provided`);
  const year = requestOptions.year.length < 1 ? 0 : requestOptions.year;
  console.log(year);
  console.log(`If year not provided it defaults to ${year}`);

  let url = `https://api.api-ninjas.com/v1/historicalevents?year=${year}`;

  if (requestOptions.month) url += `&month=${requestOptions.month}`;
  if (requestOptions.day) url += `&day=${requestOptions.day}`;
  if (requestOptions.text) url += `&text=${requestOptions.text}`;

  const urlOptions = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch(url, urlOptions);
    console.log(response);
    if (!response.ok) throw new Error(`Status error: ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
getHistoricalEvents(API_KEY, requestOptions);

// function getHistoricalEvents(apiKey, requestOptions) {
//   const url = `https://api.api-ninjas.com/v1/historicalevents?year=${requestOptions.year}`;

//   const urlOptions = {
//     method: "GET",
//     headers: {
//       "X-Api-Key": apiKey,
//       "Content-type": "application/json",
//     },
//   };

//   return new Promise((resolve, reject) => {
//     try {
//       fetch(url, urlOptions)
//         .then((response) => {
//           if (!response.ok) reject(console.error(`Status: ${response.status}`));
//           return response.json();
//         })
//         .then((data) => resolve(data));
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   //something will happen here, BUT it should return
// }

// fetch(
//   `https://api.api-ninjas.com/v1/historicalevents?year=${requestOptions.year}`,
//   urlOptions
// )
//   .then((res) => res.json())
//   .then((data) => console.log(data));
