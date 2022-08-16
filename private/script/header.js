function loadLogout() {
	document.querySelector('#logout').addEventListener('click', async () => {
		const logout = await fetch('/logout')
		if ((await logout.json()).logout) {
			window.location.href = '/'
		}
	})
}

loadLogout()
