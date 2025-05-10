const form = document.querySelector(".form");
const parentElementAppend = document.querySelector(".appendDataOl");
const loader = document.querySelector(".lds-facebook ");

const requestOptions = {
  year: 1200,
  month: "",
  day: "",
  text: "",
};

const getHistoricalEvents = async (apiKey, requestOptions = {}) => {
  if (!apiKey) throw new Error("API Key not provided");

  if (loader.classList.contains("hidden")) {
    loader.classList.remove("hidden");
    parentElementAppend.innerHTML = "";
  }

  const { year, month, day, text } = requestOptions;

  let url = "https://api.api-ninjas.com/v1/historicalevents";
  const params = [];

  if (year) params.push(`year=${year}`);
  if (month) params.push(`month=${month}`);
  if (day) params.push(`date=${day}`);
  if (text) params.push(`text=${encodeURIComponent(text)}`);

  if (params.length > 0) {
    url += "?" + params.join("&");
  } else {
    loader.classList.add("hidden");
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
      loader.classList.add("hidden");
      throw new Error(message);
    }

    loader.classList.add("hidden");
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
    events.forEach((ev) => {
      const event = `
      <li>
          <span>${ev.day}</span><span>${ev.month}</span><span>${
        ev.year <= 0 ? `${-ev.year} BCE` : `${ev.year} CE`
      }</span>
          <div>
            <span>Event: ${ev.event}</span>
          </div>
      </li>`;
      parentElement.insertAdjacentHTML("beforeend", event);
    });
  }
};

const errorDisplayMessageFromFetch = (error, parentElement) => {
  parentElement.innerHTML = "";
  const div = document.createElement("div");
  div.textContent = error;
  parentElement.append(div);
};

getHistoricalEvents(API_KEY, requestOptions)
  .then((data) =>
    displayHistoricalEvents(parentElementAppend, data, "errClass")
  )
  .catch((err) => errorDisplayMessageFromFetch(err, parentElementAppend));

const getFormDataAndFetchThem = (data) => {
  const [year, month, day] = data?.date?.split("-");
  const text = data.eventText;

  const requestOptions = {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    text,
  };

  getHistoricalEvents(API_KEY, requestOptions)
    .then((data) =>
      displayHistoricalEvents(parentElementAppend, data, "errClass")
    )
    .catch((err) => errorDisplayMessageFromFetch(err, parentElementAppend));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  getFormDataAndFetchThem(data);
});
