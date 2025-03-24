document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const passengersInput = document.getElementById('passengers');
    const passengerDetails = document.getElementById('passengerDetails');
    const ticketDetails = document.getElementById('ticketDetails');
    const bookingSummary = document.getElementById('bookingSummary');
    const downloadPDF = document.getElementById('downloadPDF');
    const fromStation = document.getElementById('from');
    const toStation = document.getElementById('to');
    const bookingTypeSelect = document.getElementById('bookingType');

    // Populate the "From" and "To" station dropdown lists
    populateStationOptions(fromStation);
    populateStationOptions(toStation);

    passengersInput.addEventListener('change', generatePassengerFields);
    bookingTypeSelect.addEventListener('change', toggleTatkalFields);
    form.addEventListener('submit', handleSubmit);
    downloadPDF.addEventListener('click', generatePDF);

    function populateStationOptions(stationSelect) {
        // Add options for all Indian railway cities here
        const indianRailwayCities = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad','Mysuru', 'Ahmedabad', 'Pune', 'Surat', 'Jaipur'];
        indianRailwayCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.text = city;
            stationSelect.add(option);
        });
    }

    function toggleTatkalFields() {
        const tatkalFields = document.querySelectorAll('.tatkal-field');
        const bookingType = bookingTypeSelect.value;
        tatkalFields.forEach(field => {
            field.style.display = bookingType === 'tatkal' ? 'block' : 'none';
        });
    }

    function generatePassengerFields() {
        const count = parseInt(passengersInput.value);
        passengerDetails.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            passengerDetails.innerHTML += `
                <div class="passenger">
                    <h3>Passenger ${i}</h3>
                    <div class="form-group">
                        <label for="name${i}">Name:</label>
                        <input type="text" id="name${i}" required>
                    </div>
                    <div class="form-group">
                        <label for="gender${i}">Gender:</label>
                        <select id="gender${i}" required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="age${i}">Age:</label>
                        <input type="number" id="age${i}" required min="1" max="120">
                    </div>
                    <div class="form-group">
                        <label for="aadhar${i}">Aadhar Number:</label>
                        <input type="text" id="aadhar${i}" required pattern="[0-9]{12}">
                    </div>
                    <div class="form-group">
                        <label for="disability${i}">Disability:</label>
                        <select id="disability${i}">
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>
                    <div class="form-group tatkal-field" style="display:none;">
                        <label for="tatkalFare${i}">Tatkal Fare:</label>
                        <input type="number" id="tatkalFare${i}" min="0" step="0.01">
                    </div>
                </div>
            `;
            document.getElementById(`disability${i}`).addEventListener('change', function() {
                const wheelchairGroup = document.getElementById(`wheelchairGroup${i}`);
                wheelchairGroup.style.display = this.value === 'yes' ? 'block' : 'none';
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validateForm()) return;

        const bookingDetails = {
            from: fromStation.value,
            to: toStation.value,
            date: document.getElementById('date').value,
            class: document.getElementById('class').value,
            compartment: document.getElementById('compartment').value,
            bookingType: bookingTypeSelect.value,
            passengers: []
        };

        const passengerCount = parseInt(passengersInput.value);
        for (let i = 1; i <= passengerCount; i++) {
            const passenger = {
                name: document.getElementById(`name${i}`).value,
                gender: document.getElementById(`gender${i}`).value,
                age: document.getElementById(`age${i}`).value,
                aadhar: document.getElementById(`aadhar${i}`).value,
                disability: document.getElementById(`disability${i}`).value,
                tatkalFare: bookingDetails.bookingType === 'tatkal' ? parseFloat(document.getElementById(`tatkalFare${i}`).value) : 0,
                seatId: generateSeatId(bookingDetails.class, bookingDetails.compartment, i)
            };
            bookingDetails.passengers.push(passenger);
        }

        displayBookingSummary(bookingDetails);
        generatePDF(bookingDetails);
    }

    function validateForm() {
        let isValid = true;
        const aadharInputs = document.querySelectorAll('input[pattern="[0-9]{12}"]');

        aadharInputs.forEach(input => {
            if (input.value.length !== 12) {
                showError(input, 'Aadhar number must be 12 digits');
                isValid = false;
            } else {
                clearError(input);
            }
        });

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        let error = formGroup.querySelector('.error');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error';
            formGroup.appendChild(error);
        }
        error.textContent = message;
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error');
        if (error) {
            formGroup.removeChild(error);
        }
    }

    function generateSeatId(classCode, compartment, passengerNumber) {
        const seatNumber = (passengerNumber < 10 ? '0' : '') + passengerNumber;
        return `${classCode}${compartment}${seatNumber}`;
    }

    function displayBookingSummary(details) {
        let summary = `
            <p><strong>From:</strong> ${details.from}</p>
            <p><strong>To:</strong> ${details.to}</p>
            <p><strong>Date:</strong> ${details.date}</p>
            <p><strong>Class:</strong> ${details.class}</p>
            <p><strong>Compartment:</strong> ${details.compartment}</p>
            <p><strong>Booking Type:</strong> ${details.bookingType}</p>
            <h3>Passengers:</h3>
        `;

        details.passengers.forEach((passenger, index) => {
            summary += `
                <div>
                    <p><strong>Passenger ${index + 1}:</strong></p>
                    <p>Name: ${passenger.name}</p>
                    <p>Gender: ${passenger.gender}</p>
                    <p>Age: ${passenger.age}</p>
                    <p>Aadhar: ${passenger.aadhar}</p>
                    <p>Disability: ${passenger.disability}</p>
                    ${passenger.disability === 'yes' ? `
                        <p>Wheelchair Needed: ${passenger.wheelchair}</p>
                    ` : ''}
                    <p>Seat ID: ${passenger.seatId}</p>
                    ${details.bookingType === 'tatkal' ? `
                        <p>Tatkal Fare: ${passenger.tatkalFare}</p>
                    ` : ''}
                </div>
            `;
        });

        bookingSummary.innerHTML = summary;
        ticketDetails.style.display = 'block';
    }

    function generatePDF(details) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(14);
        doc.text('Train Ticket Booking', 20, 20);

        doc.setFontSize(12);
        doc.text(`From: ${details.from}`, 20, 30);
        doc.text(`To: ${details.to}`, 20, 40);
        doc.text(`Date: ${details.date}`, 20, 50);
        doc.text(`Class: ${details.class}`, 20, 60);
        doc.text(`Compartment: ${details.compartment}`, 20, 70);
        doc.text(`Booking Type: ${details.bookingType}`, 20, 80);

        doc.setFontSize(14);
        doc.text('Passengers:', 20, 100);

        let y = 110;
        details.passengers.forEach((passenger, index) => {
            doc.setFontSize(12);
            doc.text(`Passenger ${index + 1}:`, 20, y);
            y += 10;
            doc.text(`Name: ${passenger.name}`, 30, y);
            y += 10;
            doc.text(`Gender: ${passenger.gender}`, 30, y);
            y += 10;
            doc.text(`Age: ${passenger.age}`, 30, y);
            y += 10;
            doc.text(`Aadhar: ${passenger.aadhar}`, 30, y);
            y += 10;
            doc.text(`Disability: ${passenger.disability}`, 30, y);
            y += 10;
            if (passenger.disability === 'yes') {
                doc.text(`Wheelchair Needed: ${passenger.wheelchair}`, 30, y);
                y += 10;
            }
            doc.text(`Seat ID: ${passenger.seatId}`, 30, y);
            y += 10;
            if (details.bookingType === 'tatkal') {
                doc.text(`Tatkal Fare: ${passenger.tatkalFare}`, 30, y);
                y += 10;
            }
            y += 10;
        });

        doc.save("indian-railway-ticket.pdf");
    }
});
