function mainEventListener() {
	document
		.querySelector('#sign-in-btn')
		.addEventListener('click', async () => {
			window.location.href = '/login'
		})
}

mainEventListener()
