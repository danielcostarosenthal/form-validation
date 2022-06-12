// Get form & form elements
const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const passwordConfirmation = document.querySelector('#password2')
const inputs = document.querySelectorAll('input')
const message = document.querySelector('#message')
let isError = true

// Show input error
const showError = (input, error) => {
	const formControl = input.parentElement
	formControl.className = 'form-control error'
	const small = formControl.querySelector('small')
	small.innerText = error
	message.className = 'message active'
	message.innerText = error
}

// Show input success
const showSuccess = (input) => {
	const formControl = input.parentElement
	formControl.className = 'form-control success'
	const small = formControl.querySelector('small')
	small.innerText = ''
	message.className = 'message hidden'
	message.innerText = ''
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
	message.style.display = 'none'
}

// Check email
const checkEmail = () => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (email.value === '') {
		showError(email, 'Email is required')
		email.focus()
	} else if (!regex.test(email.value)) {
		showError(email, 'Email is not valid')
		email.focus()
	} else {
		showSuccess(email)
	}
	message.style.display = 'none'
}

// Check password
const checkPassword = () => {
	if (password.value === '') {
		showError(password, 'Password is required')
		password.focus()
	} else if (password.value.length < 6) {
		showError(password, 'Password must be at least 6 characters')
		password.focus()
	} else if (password.value.length > 25) {
		showError(password, 'Password must be less than 25 characters')
		password.focus()
	} else {
		showSuccess(password)
		checkPasswordsMatch()
	}
	message.style.display = 'none'
}

// Check password confirmation
const checkPasswordConfirmation = () => {
	if (passwordConfirmation.value === '') {
		showError(passwordConfirmation, 'Password confirmation is required')
		passwordConfirmation.focus()
	} else if (passwordConfirmation.value.length < 6) {
		showError(
			passwordConfirmation,
			'Password confirmation must be at least 6 characters'
		)
		passwordConfirmation.focus()
	} else if (passwordConfirmation.value.length > 25) {
		showError(
			passwordConfirmation,
			'Password confirmation must be less than 25 characters'
		)
		passwordConfirmation.focus()
	} else {
		showSuccess(passwordConfirmation)
		checkPasswordsMatch()
	}
	message.style.display = 'none'
}

// Check passwords match
const checkPasswordsMatch = () => {
	if (password.value !== passwordConfirmation.value) {
		showError(passwordConfirmation, 'Passwords do not match')
		isError = true
	} else {
		showSuccess(passwordConfirmation)
		isError = false
	}
	message.style.display = 'none'
}

// Clean form
const clearForm = () => {
	message.className = 'message active'
	message.innerText = 'Form submitted!'

	setTimeout(() => {
		inputs.forEach((input) => {
			input.parentElement.className = 'form-control'
			input.value = ''
			input.blur()
			isError = true
		})
		message.className = 'message hidden'
	}, 1500)
	message.style.display = 'block'
}

// Handle submit
const handleSubmit = (e) => {
	e.preventDefault()
	checkPasswordConfirmation()
	checkPassword()
	checkEmail()
	checkUsername()
	if (!isError) {
		clearForm()
	}
}

// Event listeners
username.addEventListener('input', checkUsername)
email.addEventListener('input', checkEmail)
password.addEventListener('input', checkPassword)
passwordConfirmation.addEventListener('input', checkPasswordConfirmation)
form.addEventListener('submit', handleSubmit)
