const daysEl = document.querySelector(".days");
const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
console.log(daysEl);

const myBirthday = "3 October 2022";

const countDown = () => {
  const myBirthdayDate = new Date(myBirthday);
  // console.log(myBirthdayDate);
  const currentDate = new Date();
  const daysLeft = myBirthdayDate - currentDate;
  console.log(daysLeft);

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  console.log(oneDay);

  let days = Math.floor(daysLeft / oneDay);
  let hours = Math.floor((daysLeft % oneDay) / oneHour);
  let minutes = Math.floor((daysLeft % oneHour) / oneMinute);
  let seconds = Math.floor((daysLeft % oneMinute) / 1000);

  function format(time) {
    // if (time < 10) {
    //   time = `0${time}`;
    // }
    // return time;

    return time < 10 ? `0${time}` : time;
  }

  daysEl.textContent = format(days);
  hoursEl.textContent = format(hours);
  minutesEl.textContent = format(minutes);
  secondsEl.textContent = format(seconds);
  // console.log(daysLeft % oneDay);
};

countDown();
setInterval(countDown, 1000);
