document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cancellationForm');
    const alertModal = document.getElementById('alertModal');
    const alertMessage = document.getElementById('alertMessage');
    const closeButton = document.querySelector('.close-button');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const seatId = document.getElementById('seatId').value.trim();

        if (seatId) {
            // Simulating an API call to cancel the ticket
            setTimeout(() => {
                const success = Math.random() < 0.8; // 80% success rate for demonstration
                displayAlert(success, seatId);
            }, 1500); // Simulating a 1.5 second delay

            // Show loading state
            form.querySelector('button').textContent = 'Cancelling...';
            form.querySelector('button').disabled = true;
        } else {
            shakeForm();
        }
    });

    function displayAlert(success, seatId) {
        if (success) {
            alertMessage.textContent = `Ticket with Seat ID ${seatId} has been successfully cancelled.`;
            alertModal.style.display = 'block';
        } else {
            alertMessage.textContent = `Failed to cancel ticket with Seat ID ${seatId}. Please try again or contact support.`;
            alertModal.style.display = 'block';
        }

        // Reset form
        form.reset();
        form.querySelector('button').textContent = 'Cancel Ticket';
        form.querySelector('button').disabled = false;
    }

    closeButton.addEventListener('click', () => {
        alertModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == alertModal) {
            alertModal.style.display = 'none';
        }
    });

    function shakeForm() {
        form.classList.add('shake');
        setTimeout(() => {
            form.classList.remove('shake');
        }, 500);
    }
});
