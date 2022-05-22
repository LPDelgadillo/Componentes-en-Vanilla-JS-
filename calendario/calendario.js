let events = [];
let arr = [];

const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#bAdd");
const eventsContainer = document.querySelector("#eventsContainer")

const json = load();
try {
  arr = JSON.parse(json);
} catch (error) {
  arr = [];
}
events =arr? [...arr]: [];
renderEvents();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addEvent();
});
buttonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  addEvent();
});


function addEvent() {
  if (eventName.value === "" || eventDate.value === "") {
    return;
  }
  if (datediff(eventDate.value) < 0) {
    return;
  }
  const newEvent = {
    id: (Math.random() * 100).toString(36).slice(2),
    name: eventName.value,
    date: eventDate.value,
  };

  events.unshift(newEvent);

  save(JSON.stringify(events));

  eventName.value = "";

  renderEvents();
}

function renderEvents() {
  const eventsHTML = events.map((event) => {
    return `
        <div class="event">
            <div class="days"><span class="days-number">${datediff(
      event.date
    )}</span><span class="days-text">días</span></div>
            <div class="event-name">${event.name}</div>
            <div class="event-date">${event.date}</div>
            <div class="actions">
              <button data-id="${event.id}" class="bDelete">Eliminar</button></div>
        </div>`;
  });

  eventsContainer.innerHTML = eventsHTML.join("");

  document.querySelectorAll(".bDelete").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = button.getAttribute("data-id");
      events = events.filter((event) => event.id !== id);
      save(JSON.stringify(events));
      renderEvents();
    });
  });
}

function datediff(d) {
  let targetDate = new Date(d);
  let today = new Date();
  let difference = targetDate.getTime() - today.getTime();
  let days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
}

function save(data) {
  localStorage.setItem("items", data);
}

function load() {
  return localStorage.getItem("items");
}