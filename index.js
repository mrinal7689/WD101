function checkEmailValidity() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(email)) {
        document.getElementById('emailValidationMessage').textContent = "";
    } else {
        document.getElementById('emailValidationMessage').textContent = "Please enter a valid email address.";
    }
}

function formatDate(inputDate) {
    const [day, month, year] = inputDate.split('/');
    const date = new Date(year, month - 1, day);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
}

function restrictDateRange() {
    var dateInput = document.getElementById("dob");
    var selectedDate = new Date(dateInput.value);

    var maxDate = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
    var minDate = new Date(new Date().getFullYear() - 55, new Date().getMonth(), new Date().getDate());

    if (selectedDate < minDate || selectedDate > maxDate) {
        document.getElementById('dob').textContent = "Age should be between " + formatDate(minDate.toLocaleDateString()) + " and " + formatDate(maxDate.toLocaleDateString());
    } else {
        document.getElementById('dob').textContent = "";
    }
}

function setInitialDateRange() {
    var dateInput = document.getElementById("dob");
    var today = new Date();
    var maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    var minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

    dateInput.setAttribute("min", formatDate(minDate.toLocaleDateString()));
    dateInput.setAttribute("max", formatDate(maxDate.toLocaleDateString()));
}

window.onload = setInitialDateRange;

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const userTableBody = document.getElementById("userTableBody");

    loadUserEntries();

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = getValue("name");
        const email = getValue("email");
        const password = getValue("password");
        const termsAccepted = document.getElementById("terms").checked;
        const dateOfBirth = getValue("dob");

        const newRow = userTableBody.insertRow();
        newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${password}</td><td>${dateOfBirth}</td><td>${termsAccepted}</td>`;
        clearFormFields();

        saveUserEntry(name, email, password, dateOfBirth, termsAccepted);
    });

    function getValue(id) {
        return document.getElementById(id).value;
    }

    function clearFormFields() {
        registrationForm.reset();
    }

    function loadUserEntries() {
        const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
        clearTable();

        userEntries.forEach(({ name, email, password, dateOfBirth, termsAccepted }) => {
            const newRow = userTableBody.insertRow();
            newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${password}</td><td>${dateOfBirth}</td><td>${termsAccepted}</td>`;
        });
    }

    function clearTable() {
        while (userTableBody.firstChild) {
            userTableBody.removeChild(userTableBody.firstChild);
        }
    }

    function saveUserEntry(name, email, password, dateOfBirth, termsAccepted) {
        const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
        userEntries.push({ name, email, password, dateOfBirth, termsAccepted });
        localStorage.setItem("userEntries", JSON.stringify(userEntries));

        loadUserEntries();
    }
});
