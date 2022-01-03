//event object constructor
function createEvent(title, type, date, start, end, description) {
  this.title = title;
  this.type = type;
  this.date = date;
  this.start = start;
  this.end = end;
  this.description = description;
  this.getType = () => {
    return this.type;
  };
  this.getTitle = () => {
    return this.title;
  };
}
