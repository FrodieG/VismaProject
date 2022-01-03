const eventButton = document.getElementById("new-event-button");
eventButton.addEventListener("click", () => {
  //Listener for add new event button
  //check if day is selected, then show backdrop and new event form
  let item = sessionStorage.getItem("activeDay");
  showBackDrop();
  showEventForm();
});

const deleteEventBtn = document.getElementById("delete-an-event-btn");
deleteEventBtn.addEventListener("click", () => {
  //Listener for delete button on details view
  //get list of events from session, remove selected event, save new list to session
  let list = getActiveDayEventList();
  eventInView = eventInView.replace("event", "");
  list.splice(eventInView, 1);
  sessionStorage.setItem(
    sessionStorage.getItem("activeDay"),
    JSON.stringify(list)
  );
  sessionStorage.setItem("eventDeleted", 1);
  location.reload();
});

const cancelViewBtn = document.getElementById("close-detail-view-btn");
cancelViewBtn.addEventListener("click", () => {
  //Listener for cancel button on details view
  //hide backdrop and details view
  hideEventDetailWindow();
  hideBackDrop();
});

const eventCancelButton = document.getElementById("new-event-form-cancel");
eventCancelButton.addEventListener("click", () => {
  //Listener for cancel button on new event input form
  //remove backdrop and new event form from view
  hideBackDrop();
  hideEventForm();
  document.getElementById("new-event-form").reset();
  location.replace("");
});

const eventDeleted = document.getElementById("delete-mesage-btn");
eventDeleted.addEventListener("click", () => {
  hideBackDrop();
  document.getElementById("deleteMessage").style.display = "none";
  sessionStorage.setItem("eventDeleted", 0);
});

const eventAddButton = document.getElementById("new-event-form-add");
eventAddButton.addEventListener("click", () => {
  //Listener for add new event button
  //get all values
  const eventTitle = document.getElementById("event-title").value;
  const eventDate = document.getElementById("event-date").value;
  const eventStart = document.getElementById("event-start-input").value;
  const eventEnd = document.getElementById("event-end-input").value;
  const eventType = document.getElementById("event-type").value;
  const eventDescription = document.getElementById("event-description").value;
  //check if input form has any errors
  var errors = 0;
  const fields = [eventTitle, eventType, eventDate, eventStart, eventEnd];
  fields.forEach((field) => {
    if (field == "") {
      errors++;
    }
  });
  if (parseInt(eventStart) > parseInt(eventEnd)) {
    errors++;
  }
  if (eventTitle.length > 50) {
    errors++;
  }
  if (errors > 0) {
    return 0;
  } else {
    //get the list of events for chosen day

    let setDay = eventDate.substring(eventDate.length - 2, eventDate.length);
    setDay = parseInt(setDay);

    let item = setDay;
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
    location.reload();
  }
});
