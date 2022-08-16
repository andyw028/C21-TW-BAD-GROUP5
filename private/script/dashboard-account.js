function eventListenerOfAccountButton() {
	document.querySelector('#acc-btn').addEventListener('click', () => {
		loadAccountPage()
	})
	document.querySelector('#m-acc-btn').addEventListener('click', () => {
		loadAccountPage()
	})
}

async function loadAccountPage() {
	const panel = document.querySelector('#dashboard-panel');
	panel.innerHTML = '';
	// panel.innerHTML = `<div id="acc-board" class="container d-flex justify-content-around flex-wrap"></div>`
	// const accPanel = document.querySelector('#acc-board')
	panel.innerHTML += `<section class="account">
	<div class="account-info-container account-container">
	<aside class="account-aside">
		<div class="aside-image">
			<img src="../img/account-icon.jpg">
		</div>
		<h2>Username</h2>
		<p>
			Welcome back!
		</p>
		<p>
			<h3>Your account information:</h3>
		</p>
		<ul class="account-details">
			<li>
			<i class="uil uil-user-circle"></i>
			<h5 id="username"></h5>
			</li>
			<li>
			<i class="uil uil-user"></i>
			<h5 id="name"></h5>
			</li>
			<li>
			<i class="uil uil-envelope"></i>
			<h5 id="email"></h5>
			</li>
		</ul>
		<ul class="account-socials">
			<li> <a href="https://facebook.com"><i class="uil uil-facebook-f"></i></a> </li>
			<li> <a href="https://instagram.com"><i class="uil uil-instagram"></i></a> </li>
			<li> <a href="https://twitter.com"><i class="uil uil-twitter"></i></a> </li>
			<li> <a href="https://linkedin.com"><i class="uil uil-linkedin-alt"></i></a> </li>
		</ul>
	</aside>

		<form id="changeUserinfo" method="POST" class="account-form">
			<div class="form-name">
				<input type="text" name="firstName" placeholder="First Name" required>
				<input type="text" name="lastName" placeholder="Last Name" required>
			</div>
			<input type="email" name="email" placeholder="New Email Address" required>
			<input type="password" name="password" placeholder="New Password" required>
			<button type="submit" class="btn btn-primary">Change</button>
		</form>
	</div>
</section>`

	const queryString = window.location.pathname.split('/')
	let id = queryString[queryString.length - 1]

	const user = await fetch(`/account/${id}`)
	let result = await user.json()

	document.querySelector('#username').innerHTML += result[0].username
	document.querySelector('#email').innerHTML += result[0].email
	document.querySelector('#name').innerHTML +=
		result[0].first_name + ' ' + result[0].last_name

		document
		.querySelector('#changeUserinfo')
		.addEventListener('submit', async function (event) {
		  event.preventDefault()
	  
		  // Serialize the Form afterwards
		  const form = event.target
		  const formObject = {}
		  formObject['firstName'] = form.firstName.value
		  formObject['lastName'] = form.lastName.value
		  formObject['email'] = form.email.value
		  formObject['password'] = form.password.value

		  const res = await fetch(`/account/${id}`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(formObject),
		  })
		  const result = await res.json()
		  await loadAccountPage()
		form.firstName.value = ""
		form.lastName.value = ""
		form.email.value = ""
		form.password.value = ""
		})
}

eventListenerOfAccountButton()
