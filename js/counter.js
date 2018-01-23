const endDate = new Date("Apr 8, 2018 23:59:59").getTime(); // The date is set to the end of a final sprint
const $premiereCounterDisplay = $('#premiere-counter-display');

const count = setInterval(function () {

    const currentDate = new Date().getTime();

    const timeLeft = endDate - currentDate;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    $premiereCounterDisplay.text(`${days}d ${hours}h ${minutes}m ${seconds}s`);

    // After counter reaches 0:
    if (timeLeft < 0) {
        clearInterval(count);
        $premiereCounterDisplay.text('0d 0h 0m 0s');
    }

}, 1000);