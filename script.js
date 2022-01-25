// when user opens page, the current month should show by default
// at this time, the last day of the current month will be fetched
// and the total number of days in the month determined
const date = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let days = "";
let thisMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

fillCalendar();
function fillCalendar(distanceFromMonth = 0) {
  removeDarkened();
  thisMonth += distanceFromMonth;
  if (thisMonth < 0) {
    thisMonth = 11;
    currentYear--;
  } else if (thisMonth > 11) {
    thisMonth = 0;
    currentYear++;
  }
  const currentMonth = months[thisMonth];
  const currentDate = new Date(currentYear, thisMonth);
  //header
  document.querySelector(".date h1").innerHTML = currentMonth;
  document.querySelector(".date p").innerHTML = currentDate.toDateString();
  const dateDays = populateDaysOfMonth(thisMonth);
  const daysDivs = document.querySelector(".days");

  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let firstDayIdx = weekDays.findIndex((i) => {
    return i.includes(getShortMonth(dateDays[0]));
  });
  let index = 0;
  let beginningOfMonthIdx = 0 - firstDayIdx;
  let endOfMonthIdx = 0;

  let started = false;
  let prevMonthDates = populateDaysOfMonth(thisMonth - 1);
  let nextMonthDates = populateDaysOfMonth(thisMonth + 1);
  for (let day of daysDivs.children) {
    if (!started && !day.className.includes(getShortMonth(dateDays[0]))) {
      day.textContent =
        prevMonthDates[prevMonthDates.length + beginningOfMonthIdx].getDate();
      beginningOfMonthIdx++;
      day.classList.add("darkened");
      continue;
    }
    started = true;
    if (index < dateDays.length) {
      day.textContent = dateDays[index].getDate();
    } else {
      day.textContent = nextMonthDates[endOfMonthIdx].getDate();
      day.classList.add("darkened");
      endOfMonthIdx++;
    }
    index++;
  }
}
function getDaysInMonth(month, year) {
  return new Date(year, month, 0);
}

function populateDaysOfMonth(monthIndex) {
  const datesInMonth = [];
  const lastDayOfCurrentMonth = getDaysInMonth(monthIndex + 1, currentYear);
  for (let i = 1; i < lastDayOfCurrentMonth.getDate() + 1; i++) {
    datesInMonth.push(
      new Date(
        lastDayOfCurrentMonth.getFullYear(),
        lastDayOfCurrentMonth.getMonth(),
        i
      )
    );
  }
  return datesInMonth;
}

function getShortMonth(dateObj) {
  return dateObj.toDateString().substring(0, 3);
}

function removeDarkened() {
  document.querySelectorAll(".darkened").forEach((e) => {
    e.classList.remove("darkened");
  });
}
