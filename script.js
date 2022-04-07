// Get form & form elements
const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const passwordConfirmation = document.querySelector('#password2')

// Show input error
const showError = (input, message) => {
	const formControl = input.parentElement
	formControl.className = 'form-control error'
	const small = formControl.querySelector('small')
	small.innerText = message
}

// Show input success
const showSuccess = (input) => {
	const formControl = input.parentElement
	formControl.className = 'form-control success'
	const small = formControl.querySelector('small')
	small.innerText = ''
}

// Check username
const checkUsername = () => {
	if (username.value.trim() === '') {
		showError(username, 'Username is required')
		username.focus()
	} else if (username.value.length < 6) {
		showError(username, 'Username must be at least 6 characters')
		username.focus()
	} else if (username.value.length > 25) {
		showError(username, 'Username must be less than 25 characters')
		username.focus()
	} else {
		showSuccess(username)
	}
}

// Check email
const checkEmail = () => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (email.value === '') {
		showError(email, 'Email is required')
	} else if (!regex.test(email.value)) {
		showError(email, 'Email is not valid')
	} else {
		showSuccess(email)
	}
}

// Check password
const checkPassword = () => {
	if (password.value === '') {
		showError(password, 'Password is required')
	} else if (password.value.length < 6) {
		showError(password, 'Password must be at least 6 characters')
	} else if (password.value.length > 25) {
		showError(password, 'Password must be less than 25 characters')
	} else {
		showSuccess(password)
		checkPasswordsMatch()
	}
}

// Check password confirmation
const checkPasswordConfirmation = () => {
	if (passwordConfirmation.value === '') {
		showError(passwordConfirmation, 'Password confirmation is required')
	} else if (passwordConfirmation.value.length < 6) {
		showError(
			passwordConfirmation,
			'Password confirmation must be at least 6 characters'
		)
	} else if (passwordConfirmation.value.length > 25) {
		showError(
			passwordConfirmation,
			'Password confirmation must be less than 25 characters'
		)
	} else {
		showSuccess(passwordConfirmation)
		checkPasswordsMatch()
	}
}

// Check passwords match
const checkPasswordsMatch = () => {
	if (password.value !== passwordConfirmation.value) {
		showError(passwordConfirmation, 'Passwords do not match')
	} else {
		showSuccess(passwordConfirmation)
	}
}

// Clean form
const clearForm = () => {
	inputs.forEach((input) => (input.value = ''))
}

// Handle submit
const handleSubmit = (e) => {
	e.preventDefault()
	checkUsername()
	checkEmail()
	checkPassword()
	checkPasswordConfirmation()
}

username.addEventListener('input', checkUsername)
email.addEventListener('input', checkEmail)
password.addEventListener('input', checkPassword)
passwordConfirmation.addEventListener('input', checkPasswordConfirmation)
form.addEventListener('submit', handleSubmit)
