function mainEventListener() {
	document.querySelector('#sign-in-btn').addEventListener('click', () => {
		console.log('clicked sign in')
	})
}

window.onload = () => {
	mainEventListener()
}
