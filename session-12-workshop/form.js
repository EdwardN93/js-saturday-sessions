const formDiv = document.querySelector("#formDiv");
const insertForm = (parentElement) => {
  const html = `
    <form class="form">
      <div class="formData">
        <label for="day">Select day</label>
        <input type="number" name="day" id="day" placeholder="Enter day" />
        <label for="month">Select month</label>
        <input
          type="number"
          name="month"
          id="month"
          placeholder="Enter month"
        />
        <label for="year">Select year</label>
        <input type="number" name="year" id="year" placeholder="Enter Year " />
        <label for="eventText">Text to search events on: </label>
        <input type="text" name="eventText" id="eventText" />
      </div>
      <div class="btnHolder">
        <button class="getPage">Get Events</button>
      </div>
    </form>`;
  parentElement.insertAdjacentHTML("beforeend", html);
};

insertForm(formDiv);
