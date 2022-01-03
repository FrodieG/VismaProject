function showEventDetailWindow() {
  document.getElementById("eventInfoWindow").style.display = "block";
}

function hideEventDetailWindow() {
  document.getElementById("eventInfoWindow").style.display = "none";
}

function showBackDrop() {
  document.getElementById("backdrop").style.display = "block";
  document.body.classList.add("stop-scrolling");
}

function hideBackDrop() {
  document.getElementById("backdrop").style.display = "none";
  document.body.classList.remove("stop-scrolling");
}

function showEventForm() {
  document.getElementById("new-event-form-container").style.display = "block";
}

function hideEventForm() {
  document.getElementById("new-event-form-container").style.display = "none";
}

function setAsActive() {
  //set selected day as active on the callendar view
  let active = document.getElementById(sessionStorage.getItem("activeDay"));
  active.classList.add("active");
}

function addEventListeners(array) {
  //add event listeners to all days in callendar
  array.forEach((e) => {
    document.getElementById(e.getMonthDay()).addEventListener("click", () => {
      sessionStorage.setItem("activeDay", e.getMonthDay());
      location.reload();
    });
  });
}

function clearDaysWithNoEvents(month) {
  //remove event indicators from days that don't have any
  month.forEach((day) => {
    document.getElementById(day.getMonthDay()).classList.remove("hasEvents");
  });
}

function markDaysWithEvents(month) {
  //add indicators to days that have events in month view
  month.forEach((day) => {
    let events = sessionStorage.getItem(day.getMonthDay());
    events = JSON.parse(events);
    if (events != null) {
      if (events.length > 0) {
        document.getElementById(day.getMonthDay()).classList.add("hasEvents");
      }
    }
  });
}

function getFirstDay(now) {
  //find which day of the week is the first day of this month
  return new Date(now.getFullYear(), now.getMonth(), 1).getDay();
}

function getNumberOfDays(now) {
  //return number of days in current month
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}

function setMinEventDateAsToday() {
  //set min input date for new event input form as today
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("event-date").setAttribute("min", today);
}

function setMaxEventDateAsLastDay() {
  //set min input date for new event input form as today
  var lastDay = new Date();
  var dd = getNumberOfDays(lastDay);
  var mm = lastDay.getMonth() + 1;
  var yyyy = lastDay.getFullYear();

  if (mm < 10) {
    mm = "0" + mm;
  }
  lastDay = yyyy + "-" + mm + "-" + dd;
  document.getElementById("event-date").setAttribute("max", lastDay);
}

function showEventDetails(eventId) {
  //fill info field with chosen event data and show it
  showBackDrop();
  let eventInfo = getEventData(eventId);
  eventInView = eventId;
  insertDataToDetailWindow(eventInfo);
  showEventDetailWindow();
}

function insertDataToDetailWindow(data) {
  //fill info field with event data
  document.getElementById("titleInfoField").innerText = data.title;
  document.getElementById("dateInfoField").innerText = data.date;
  document.getElementById("startInfoField").innerText = data.start;
  document.getElementById("endInfoField").innerText = data.end;
  document.getElementById("typeInfoField").innerText = data.type;
  if (data.description == "") {
    document.getElementById("descriptionInfoField").innerText =
      "No description...";
  } else {
    document.getElementById("descriptionInfoField").innerText =
      data.description;
  }
}

function getEventData(id) {
  //return chosen event data
  let list;
  let day = sessionStorage.getItem("activeDay");
  list = JSON.parse(sessionStorage.getItem(day));
  id = id.replace("event", "");
  return list[id];
}

function getActiveDayEventList() {
  //return the list of events for the day that is currently active
  let list;
  let day = sessionStorage.getItem("activeDay");
  list = JSON.parse(sessionStorage.getItem(day));
  return list;
}

function buildMonthArray(days, weekDay) {
  //create month list that holds all the days as objects
  let array = [];
  for (let i = 0; i < days; i++) {
    array.push(new createDay(i + 1, weekDay));
    weekDay++;
    if (weekDay == 8) {
      weekDay = 1;
    }
  }
  return array;
}

function displayCalendar(month) {
  //fill empty grid cells if 1st day of the month is not monday
  var calendarStart = month[0].getWeekDay();
  for (let i = 0; i < calendarStart - 1; i++) {
    var newDay = document.createElement("div");
    newDay.classList.add("void-grid-item");
    newDay.innerText = "";
    document.getElementById("gridContainer").appendChild(newDay);
  }
  //display days of the month as a grid
  for (let i = 0; i < month.length; i++) {
    var newDay = document.createElement("div");
    newDay.id = i + 1;
    newDay.classList.add("grid-item");
    newDay.innerText = i + 1;
    document.getElementById("gridContainer").appendChild(newDay);
  }
}

function addCalendarLabels() {
  //add labels to the calendar
  var labels = ["M", "T", "W", "T", "F", "S", "S"];
  labels.forEach((label) => {
    var newDay = document.createElement("div");
    newDay.classList.add("label-grid-item");
    newDay.innerText = label;
    document.getElementById("gridContainer").appendChild(newDay);
  });
}

function displayEventList() {
  //create elements for each event and display them
  let list;
  let day = sessionStorage.getItem("activeDay");
  list = JSON.parse(sessionStorage.getItem(day));
  if (list != null) {
    let i = 0;
    list.forEach((e) => {
      var newEvent = document.createElement("div");
      newEvent.classList.add("event_card", e.type);
      newEvent.innerText = e.title;
      newEvent.id = "event" + i;

      document.getElementById("event-list-container").appendChild(newEvent);
      document.getElementById(newEvent.id).addEventListener("click", () => {
        showEventDetails(newEvent.id);
      });
      i++;
    });
  }
}

function prefillDummyEvents(month, eventCount) {
  //randomly add dummy  eventCount events
  const dates = [15, 17, 21, 25, 31];
  const start = ["8:17", "9:15", "10:11", "12:30", "15:43"];
  const end = ["19:10", "20:15", "21:08", "22:50", "23:45"];
  const types = ["call", "meeting", "out-of-office"];
  for (let i = 0; i < eventCount; i++) {
    let eventTitle = i + " title";
    let eventDate = dates[Math.floor(Math.random() * 5)];
    let eventStart = start[Math.floor(Math.random() * 5)];
    let eventEnd = end[Math.floor(Math.random() * 5)];
    let eventType = types[Math.floor(Math.random() * 3)];
    let eventDescription = "dummy description for " + i + " event";

    let item = eventDate;
    let list = [];
    //update array with values from session storage
    if (sessionStorage.getItem(item)) {
      list = JSON.parse(sessionStorage.getItem(item));
      month[item - 1].setEvents(list);
    }
    //add new event to array
    month[item - 1].addEvent(
      eventTitle,
      eventType,
      eventDate,
      eventStart,
      eventEnd,
      eventDescription
    );
    //save new array to session storage
    sessionStorage.setItem(
      month[item - 1].getMonthDay(),
      JSON.stringify(month[item - 1].getEvents())
    );
  }
}
