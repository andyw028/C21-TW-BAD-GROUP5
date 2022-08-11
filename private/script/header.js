function loadLogout() {
	document.querySelector('#logout').addEventListener('click', async () => {
		console.log('OK')
		const logout = await fetch('/logout')
		if ((await logout.json()).logout) {
			window.location.href = '/'
		}
	})
}

loadLogout()
console.log('load logout')
