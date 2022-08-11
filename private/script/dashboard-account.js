function eventListenerOfAccountButton() {
	document.querySelector('#acc-btn').addEventListener('click', () => {
		console.log('1')
		loadAccountPage()
	})
	document.querySelector('#m-acc-btn').addEventListener('click', () => {
		console.log('1')
		loadAccountPage()
	})
}
async function loadAccountPage() {
	const panel = document.querySelector('#dashboard-panel')
	panel.innerHTML = `<div id= "AccountPage" class= "row">
<div id="username" class="col-md-3">Username: </div>
<div id="email" class= "col-md-3">Email: </div>
<div id="name" class= "col-md-3">Name: </div>
`

	const queryString = window.location.pathname.split('/')
	let id = queryString[queryString.length - 1]

	const user = await fetch(`/account/${id}`)
	let result = await user.json()

	document.querySelector('#username').innerHTML += result[0].username
	document.querySelector('#email').innerHTML += result[0].email
	document.querySelector('#name').innerHTML +=
		result[0].first_name + ' ' + result[0].last_name
}

eventListenerOfAccountButton()
console.log('load account')
