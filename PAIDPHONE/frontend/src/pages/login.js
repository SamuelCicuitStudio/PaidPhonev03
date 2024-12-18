document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessageElement = document.getElementById('error-message'); // Assume an element for error messages exists

    // Reset error message before making a new request
    errorMessageElement.textContent = '';

    // Validate input fields (optional but recommended)
    if (!username || !password) {
        errorMessageElement.textContent = 'Please enter both username and password.';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {  // Ensure the correct backend URL is used
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        
        if (response.ok) {
            // Successful login, you can handle storing the token and redirecting here
            alert('Login successful!');
            console.log('Token:', data.token);
            
            // Optionally store the token in localStorage or sessionStorage
            localStorage.setItem('token', data.token);

            // Redirect to the dashboard or home page after login
            window.location.href = 'Dashboard.html'; // Change this URL as needed

        } else {
            // Display error message if response is not OK
            errorMessageElement.textContent = data.message || 'Login failed. Please try again.';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessageElement.textContent = 'An error occurred while processing your request. Please try again later.';
    }
});
