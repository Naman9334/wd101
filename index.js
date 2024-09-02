function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

document.getElementById('dob').addEventListener('input', function() {
    const age = calculateAge(this.value);
    if (age < 18 || age > 55) {
        this.setCustomValidity('Age must be between 18 and 55 years.');
    } else {
        this.setCustomValidity('');
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const termsAccepted = document.getElementById('terms').checked;

    const user = { name, email, password, dob, termsAccepted };
    localStorage.setItem(email, JSON.stringify(user));

 
    const tbody = document.getElementById('userTable').querySelector('tbody');
    const row = tbody.insertRow();
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = email;
    row.insertCell(2).textContent = password;
    row.insertCell(3).textContent = dob;
    row.insertCell(4).textContent = termsAccepted ? 'true' : 'false';

   
    this.reset();
});

window.addEventListener('load', function() {
    localStorage.clear();
    const tbody = document.getElementById('userTable').querySelector('tbody');
    for (let i = 0; i < localStorage.length; i++) {
        const user = JSON.parse(localStorage.getItem(localStorage.key(i)));
        const row = tbody.insertRow();
        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.email;
        row.insertCell(2).textContent = user.password;
        row.insertCell(3).textContent = user.dob;
        row.insertCell(4).textContent = user.termsAccepted ? 'true' : 'false';
    }
});
