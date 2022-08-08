function eventListenerOfAccountButton() {
    document.querySelector('#acc-btn').addEventListener('click', () => {
        console.log('1')
        loadAccountDb()
    })
    document.querySelector('#m-acc-btn').addEventListener('click', () => {
        console.log('1')
        loadAccountDb()
    })
}
function loadAccountPage() {
const panel = document.querySelector('#userTableName')
panel.innerHTML = `<div id= "AccountPage" class= "row">
<div class= "col-md-3">Username</div>
<div class= "col-md-3">Email</div>

`}


eventListenerOfAccountButton()