function createDay(monthDay, weekDay) {
  this.monthDay = monthDay;
  this.weekDay = weekDay;
  this.events = [];
  this.getWeekDay = () => {
    return this.weekDay;
  };
  this.getMonthDay = () => {
    return this.monthDay;
  };
  this.getEvents = () => {
    return this.events;
  };
  this.addEvent = (title, type, date, start, end, descr) => {
    this.events.push(new createEvent(title, type, date, start, end, descr));
  };
  this.setEvents = (array) => {
    this.events = array;
  };
}
