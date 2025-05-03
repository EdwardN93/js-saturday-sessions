const requestOptions = {
  year: 1500,
  month: "",
  day: "",
  text: "",
};

const getHistoricalEvents = async (apiKey, requestOptions = {}) => {
  if (!apiKey) throw new Error("API Key not provided");

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
    throw new Error("You should provide at least a year, month or text");
  }

  const urlOptions = {
    method: "GET",
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
    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

const parentElementAppend = document.querySelector(".appendDataUl");

const displayHistoricalEvents = (parentElement, events, errClass) => {
  parentElement.innerHtml = "";
  if (!events.length) {
    parentElement.innerHtml = "";
    const errBlock = document.createElement("h2");
    errBlock.classList.add(errClass);
    errBlock.textContent = `No historical events are registered`;
    parentElement.append(errBlock);
  } else {
    events.forEach((ev) => {
      const event = `
      <li>
        <span>Year: ${ev.year}</span>
        <span>Month: ${ev.month}</span>
        <span>Day: ${ev.day}</span>
        <div>
          <span>Event: ${ev.event}</span>
        </div>
      </li>
      `;
      parentElement.insertAdjacentHTML("beforeend", event);
    });
  }
};

const errorDisplayMessageFromFetch = (error, parentElement) => {
  const div = document.createElement("div");
  div.textContent = error;
  parentElement.append(div);
};

getHistoricalEvents(API_KEY, requestOptions)
  .then((data) =>
    displayHistoricalEvents(parentElementAppend, data, "errClass")
  )
  .catch((err) => errorDisplayMessageFromFetch(err, parentElementAppend));
