const form = document.querySelector(".form");
const parentElementAppend = document.querySelector(".appendDataOl");
const gameContainer = document.querySelector(".gamesContainer"); // NOT FOR COURSE
const formSearchGames = document.querySelector(".searchGames"); // NOT FOR COURSE
const allGames = []; // NOT FOR COURSE

const getHistoricalEvents = async (apiKey, requestOptions = {}) => {
  if (!apiKey) throw new Error("API Key not provided");

  const { year, month, day, text } = requestOptions;

  let url = "https://api.api-ninjas.com/v1/historicalevents";
  const params = [];

  if (year) params.push(`year=${year}`);
  if (month) params.push(`month=${month}`);
  if (day) params.push(`day=${day}`);
  if (text) params.push(`text=${encodeURIComponent(text)}`);

  if (params.length > 0) {
    url += "?" + params.join("&");
  } else {
    throw new Error("You should provide at least a year, month or text");
  }

  const urlOptions = {
    headers: {
      "X-Api-Key": apiKey,
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch(url, urlOptions);

    if (!response.ok) {
      let message = `Status ${response.status}`;
      try {
        const errorData = await response.json();
        message += `: ${
          errorData.error || errorData.message || "Unknown error"
        }`;
      } catch (e) {
        message += " (Invalid JSON response)";
      }
      throw new Error(message);
    }

    const data = await response.json();
    const reorderedData = data.sort((a, b) => a.year - b.year);

    return reorderedData;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

const displayHistoricalEvents = (parentElement, events, errClass = "") => {
  parentElement.innerHTML = "";

  if (!events.length) {
    const errBlock = document.createElement("h2");
    if (errClass) {
      errBlock.classList.add(errClass);
    }
    errBlock.textContent = `No historical events are registered`;
    parentElement.append(errBlock);
  } else {
    const olElement = document.createElement("ol");
    parentElement.append(olElement);
    events.forEach((ev) => {
      const event = `
      <li>
          <span>${ev.day}</span>
          <span>${ev.month}</span>
          <span>${ev.year <= 0 ? `${-ev.year} BCE` : `${ev.year} CE`}</span>
          <span>Event: ${ev.event}</span>
      </li>`;
      olElement.insertAdjacentHTML("beforeend", event);
    });
  }
};

const errorDisplayMessageFromFetch = (error, parentElement) => {
  parentElement.innerHTML = "";
  const div = document.createElement("div");
  div.textContent = error;
  parentElement.append(div);
};

const getFormDataAndFetchThem = (data) => {
  getHistoricalEvents(API_KEY, data)
    .then((data) =>
      displayHistoricalEvents(parentElementAppend, data, "errClass")
    )
    .catch((err) => errorDisplayMessageFromFetch(err, parentElementAppend));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const rawData = Object.fromEntries(formData.entries());
  const requestData = {};

  const day = Number(rawData.day);
  const month = Number(rawData.month);
  const year = Number(rawData.year);
  const text = rawData.eventText?.trim();

  if (rawData.day && (day < 1 || day > 31)) {
    return errorDisplayMessageFromFetch(
      "Please provide a valid day",
      parentElementAppend
    );
  }

  if (rawData.month && (month < 1 || month > 12)) {
    return errorDisplayMessageFromFetch(
      "Please provide a valid month",
      parentElementAppend
    );
  }

  if (day && month && year) {
    const date = new Date(year, month - 1, day);
    const isValid =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    if (!isValid) {
      return errorDisplayMessageFromFetch(
        "Invalid date. Please check your input (e.g. February 30 doesn't exist).",
        parentElementAppend
      );
    }
  }

  if (rawData.year) requestData.year = year;
  if (rawData.month) requestData.month = month;
  if (rawData.day) requestData.day = day;
  if (text) requestData.text = text;

  if (
    !requestData.year &&
    !requestData.month &&
    !requestData.day &&
    !requestData.text
  ) {
    return errorDisplayMessageFromFetch(
      "Please provide at least a day or month or year or some text",
      parentElementAppend
    );
  }

  getFormDataAndFetchThem(requestData);
});

//////////////////////////////////////////
///                                    ///
///         NOT PART OF COURSE         ///
///                                    ///
//////////////////////////////////////////

const client_id = "trri2ib651zl1ovquoc7b3nsijpn9c";
const getGames = async () => {
  const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "fc407b2743msh03301e4b77cbf0ap14c3e8jsn3c75b504865f",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    allGames.push(result);
    return result;
  } catch (error) {
    return error;
  }
};

const gameListFactory = (parentElement, arr) => {
  parentElement.innerHTML = "";
  const ol = document.createElement("ol");
  arr.forEach((item) => {
    const html = `
    <li>
    <span class="title">${item.title}</span>
    <span class="genre">${item.genre}</span>
    <span class="developer">${item.developer}</span>
    <img src="${item.thumbnail}">
    <span class="short-description">${item.short_description}</span>
    <a href="${item.game_url}"class="gameUrl" target= '_blank'>Go To ${item.title}</a>
    <span class="platform">${item.platform}</span>
    <span class="publisher">${item.publisher}</span>
    <span class="release-date">${item.release_date}</span>
    </li>
    `;
    ol.insertAdjacentHTML("beforeend", html);
  });
  parentElement.append(ol);
};

const searchByName = (gameDb, parentElement, searchText) => {
  const filter = gameDb[0].filter((game) =>
    game.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (filter.length > 0) {
    gameListFactory(parentElement, filter);
    console.log(filter);
  }
};

formSearchGames.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formSearchGames);
  const data = Object.fromEntries(formData.entries());
  searchByName(allGames, gameContainer, data.gameSearch);
});

const displayInfo = (parentEl, gamesData) => {
  gameListFactory(parentEl, gamesData);
};

getGames()
  .then((data) => {
    displayInfo(gameContainer, data);
  })
  .catch((err) => console.error(err));
