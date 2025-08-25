document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const notification = document.getElementById('notification');
    
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const service = document.getElementById('service');
    const budget = document.getElementById('budget');
    const budgetValue = document.querySelector('.budget-value');
    const message = document.getElementById('message');
    
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const serviceError = document.getElementById('serviceError');
    const messageError = document.getElementById('messageError');
    
    budget.addEventListener('input', function() {
        const value = parseInt(budget.value).toLocaleString();
        budgetValue.textContent = `$${value}`;
    });
    
    firstName.addEventListener('input', () => validateName(firstName, firstNameError));
    lastName.addEventListener('input', () => validateName(lastName, lastNameError));
    email.addEventListener('input', validateEmail);
    service.addEventListener('change', validateService);
    message.addEventListener('input', validateMessage);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isFirstNameValid = validateName(firstName, firstNameError);
        const isLastNameValid = validateName(lastName, lastNameError);
        const isEmailValid = validateEmail();
        const isServiceValid = validateService();
        const isMessageValid = validateMessage();
        
        if (isFirstNameValid && isLastNameValid && isEmailValid && isServiceValid && isMessageValid) {
            submitForm();
        }
    });
    
    function validateName(input, errorElement) {
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, errorElement, 'This field is required');
            return false;
        } else if (value.length < 2) {
            showError(input, errorElement, 'Must be at least 2 characters');
            return false;
        } else {
            showSuccess(input, errorElement);
            return true;
        }
    }
    
    function validateEmail() {
        const value = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showError(email, emailError, 'Email is required');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(email, emailError, 'Please enter a valid email');
            return false;
        } else {
            showSuccess(email, emailError);
            return true;
        }
    }
    
    function validateService() {
        const value = service.value;
        
        if (value === '' || value === null) {
            showError(service, serviceError, 'Please select a service');
            return false;
        } else {
            showSuccess(service, serviceError);
            return true;
        }
    }
    
    function validateMessage() {
        const value = message.value.trim();
        
        if (value === '') {
            showError(message, messageError, 'Message is required');
            return false;
        } else if (value.length < 20) {
            showError(message, messageError, 'Message must be at least 20 characters');
            return false;
        } else {
            showSuccess(message, messageError);
            return true;
        }
    }
    
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        input.classList.add('error');
        input.classList.remove('success');
    }
    
    function showSuccess(input, errorElement) {
        errorElement.classList.remove('show');
        input.classList.remove('error');
        input.classList.add('success');
    }
    
    function showNotification(type, message) {
        const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
        notification.innerHTML = `${icon} ${message}`;
        notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    function submitForm() {

        submitBtn.classList.add('loading');
        
        setTimeout(() => {
            showNotification('success', 'Your message has been sent successfully!');
            form.reset();
            resetValidationStates();
            budgetValue.textContent = '$10,000';
            
            submitBtn.classList.remove('loading');
        }, 2000);
    }
    
    function resetValidationStates() {
        const inputs = [firstName, lastName, email, service, message];
        const errors = [firstNameError, lastNameError, emailError, serviceError, messageError];
        
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
        
        errors.forEach(error => {
            error.classList.remove('show');
        });
    }
});