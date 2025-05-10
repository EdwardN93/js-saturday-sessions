function getHistoricalEvents(apiKey, requestOptions) {
  // Step 1: Validate requestOptions
  const nonEmptyParams = Object.keys(requestOptions).filter(
    (key) => requestOptions[key] !== "" && requestOptions[key] !== undefined
  );

  if (nonEmptyParams.length === 0) {
    return Promise.reject(new Error("Error: year, month and day are missing."));
  }

  // Step 2: Build query string
  const queryParams = nonEmptyParams
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(requestOptions[key])}`
    )
    .join("&");

  const apiUrl = `https://api.api-ninjas.com/v1/historicalevents?${queryParams}`;

  // Step 3: Validate API key
  if (!apiKey || apiKey.trim() === "") {
    return Promise.reject(new Error("Error: API key is missing."));
  }

  // Step 4: Make API request
  return fetch(apiUrl, {
    headers: {
      "X-Api-Key": apiKey,
      Accept: "application/json",
    },
  }).then((response) => {
    if (response.status === 403 || response.status === 401) {
      throw new Error("Error: API key is incorrect or unauthorized.");
    } else if (!response.ok) {
      throw new Error(`Error: Request failed with status ${response.status}`);
    }
    return response.json();
  });
}

function displayHistoricalEvents(parentElement, eventsList) {
  parentElement.innerHTML = "";

  eventsList.forEach((eventDate) => {
    const listItem = document.createElement("li");

    const daySpan = document.createElement("span");
    daySpan.classList.add("day");
    daySpan.textContent = eventDate.day ? eventDate.day + " " : "";

    const monthSpan = document.createElement("span");
    monthSpan.classList.add("month");
    monthSpan.textContent = eventDate.month ? eventDate.month + " " : "";

    const yearSpan = document.createElement("span");
    yearSpan.classList.add("year");
    yearSpan.textContent = eventDate.year || "";

    const eventSpan = document.createElement("span");
    eventSpan.classList.add("event");
    eventSpan.textContent = ": " + eventDate.event;

    listItem.appendChild(daySpan);
    listItem.appendChild(monthSpan);
    listItem.appendChild(yearSpan);
    listItem.appendChild(eventSpan);

    parentElement.appendChild(listItem);
  });
}
