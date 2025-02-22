const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const selectMovie = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getLocalStorage();
calculatePrice();

container.addEventListener('click', function(x) {
    if(x.target.classList.contains('seat') && !x.target.classList.contains('reserved')) {
        x.target.classList.toggle('selected');
        
        calculatePrice();
    }
});

selectMovie.addEventListener('change', function(x) {
    calculatePrice();
});

function calculatePrice() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const selectedSeatsArray = [];
    const seatsArray = [];
    
    selectedSeats.forEach(function(seat) {
        selectedSeatsArray.push(seat);
    });

    seats.forEach(function(seat) {
        seatsArray.push(seat);
    });

    let selectedSeatIndex = selectedSeatsArray.map(function(seat) {
        return seatsArray.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;

    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * selectMovie.value;

    saveLocalStorage(selectedSeatIndex);
}

function getLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

    if (selectedMovieIndex != null) {
        selectMovie.selectedIndex = selectedMovieIndex;
    }
}

function saveLocalStorage(index) {
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('selectedMovieIndex', selectMovie.selectedIndex);
}
