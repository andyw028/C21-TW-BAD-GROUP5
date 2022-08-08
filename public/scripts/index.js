function mainEventListener() {
	document
		.querySelector('#sign-in-btn')
		.addEventListener('click', async () => {
			window.location.href = '/login'
		})
	document.querySelector('#reg-btn').addEventListener('click', async () => {
		window.location.href = '/register'
	})
}

window.onload = () => {
	mainEventListener()
}
