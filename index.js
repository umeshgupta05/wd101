document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get values from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Validate Date of Birth for age range (18 to 55 years)
    if (!validateDOB(dob)) {
        alert('Date of Birth must be between 18 and 55 years old.');
        return; // Stop form submission
    }

    // Create an entry object
    const entry = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        termsAccepted: termsAccepted
    };

    // Get previous entries from local storage
    let entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Add the new entry to the list
    entries.push(entry);

    // Save the updated entries list to local storage
    localStorage.setItem('entries', JSON.stringify(entries));

    // Clear the form
    document.getElementById('registrationForm').reset();

    // Update the table with the new entries
    displayEntries();
});

function validateDOB(dob) {
    const dateOfBirth = new Date(dob);
    const today = new Date();
    
    // Calculate the maximum and minimum allowed dates
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    // Check if the selected date is within the valid range
    return (dateOfBirth >= minDate && dateOfBirth <= maxDate);
}

function displayEntries() {
    const entriesTableBody = document.querySelector('#entriesTable tbody');
    entriesTableBody.innerHTML = '';  // Clear the table

    // Get entries from local storage
    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Loop through the entries and create rows for the table
    entries.forEach(function (entry) {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td class="border px-4 py-2">${entry.name}</td>
            <td class="border px-4 py-2">${entry.email}</td>
            <td class="border px-4 py-2">${entry.password}</td>
            <td class="border px-4 py-2">${entry.dob}</td>
            <td class="border px-4 py-2">${entry.termsAccepted ? 'Yes' : 'No'}</td>
        `;

        entriesTableBody.appendChild(row);
    });
}

// Display existing entries on page load
document.addEventListener('DOMContentLoaded', displayEntries);
