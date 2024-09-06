// Select form and radio buttons
const form = document.getElementById('signupForm');
const roleDropdown = document.getElementById('role');
const roleRadios = document.querySelectorAll('input[name="role-radio"]');

// Form submit event listener
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = roleDropdown.value;

    // Simple validation check
    if (name && email && password && role) {
        alert(`Thank you for signing up, ${name}! You are registered as a ${role}.`);
        
        window.location.href = 'verifyOTP.html';
    
    }        

    else {
        alert('Please fill in all fields and select your role.');
    }
});

// Radio button click event listener
roleRadios.forEach(function(radio) {
    radio.addEventListener('click', function() {
        roleDropdown.value = radio.value;
    });
});

// Sync dropdown with radio buttons when dropdown changes
roleDropdown.addEventListener('change', function() {
    roleRadios.forEach(function(radio) {
        if (radio.value === roleDropdown.value) {
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });
});

