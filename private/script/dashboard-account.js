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
	panel.innerHTML = `<div id="acc-board" class="container d-flex justify-content-around flex-wrap"></div>`
	const accPanel = document.querySelector('#acc-board')
	accPanel.innerHTML = `
	<div id= "card-ac" class="col-md-6">  
    <div class="card card-ac" style="width:30rem;">
	<img class="card-img-top" src="/img/coffee.jpg" alt="Card image cap">
	<div class="card-body";>
	<div id= "AccountPage" class= "row">
<div id="username"col-md-7">Username: </div>
<div id="email" class= "col-md-7">Email: </div>
<div id="name" class= "col-md-7">Name: </div></div></div></div>
`

	accPanel.innerHTML += `
	
	<div class="col-md-6" ><form id="changeUserinfo"  >
	<div class="form-group">
  <label for="exampleInputUsername1">Change first name</label>
  <input name="firstName " class="form-control" id="firstName" aria-describedby="userName Help" placeholder="firstName" required>
  <small id="userNameHelp" class="form-text text-muted">Change user name if you want.</small>
</div>
<div id="form-group">
<div class="form-group">
  <label for="lastName">lastName</label>
  <input name="lastName" class="form-control" id="lastName" placeholder="lastName"  required>
</div>
<div class="form-group">
  <label for="email">email</label>
  <input name="email" type="email" class="form-control" id="email" placeholder="email" required>
</div>
<div class="form-group">
  <label for="exampleInputPassword1">Password</label>
  <input name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
</div>
<button type="submit" class="btn btn-primary">Submit</button>
</form></div></div></div>`

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
		console.log(formObject)
		  const res = await fetch(`/account/${id}`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(formObject),
		  })
		  const result = await res.json()
		  console.log(result)
		  await loadAccountPage()
		form.firstName.value = ""
		form.lastName.value = ""
		form.email.value = ""
		form.password.value = ""
		})
}

eventListenerOfAccountButton()
