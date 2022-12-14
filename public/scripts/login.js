async function logIn() {
	const logIn = document.querySelector('#login')

	logIn.addEventListener('submit', async function (event) {
		event.preventDefault()

		const form = event.target

		const username = form.username.value
		const password = form.password.value

		if (username && password) {
			const resp = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			})

			const result = await resp.json()
			if (!result.success) {
				// alert(result.message)
				await Swal.fire('OOPS!', result.message, 'error')
				window.location.href = '/login'
			} else {
				// alert(result.message)
				await Swal.fire('Nice!', result.message, 'success')
				window.location.href = `/dashboard/${result.id}`
			}
		}
	})
}

async function signUp() {
	const signUp = document.querySelector('.signup-form')
	if (!signUp) {
		return
	}

	signUp.addEventListener('submit', async function (event) {
		event.preventDefault()

		const form = event.target

		const username = form.username.value
		const firstName = form.firstName.value
		const lastName = form.lastName.value
		const password = form.password.value
		const email = form.email.value

		const resp = await fetch('/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				firstName,
				lastName,
				password,
				email
			})
		})

		const result = await resp.json()
		const UserID = result.userID
		if (!result.success) {
			// alert('Create Account Failed ')
			await Swal.fire('OOPS!', 'Failed To Create Account', 'error')
			window.location.href = '/signup'
		} else {
			await Swal.fire('Nice!', 'Registered!', 'success')
			window.location.href = `/dashboard/${UserID}`
		}
	})
}
//##################################################
logIn()
signUp()
