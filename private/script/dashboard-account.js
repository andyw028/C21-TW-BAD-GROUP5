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
function loadAccountPage() {
const panel = document.querySelector('#dashboard-panel')
panel.innerHTML = `<div id= "AccountPage" class= "row">
<div class= "col-md-3">Username</div>
<div class= "col-md-3">Email</div>

`}


eventListenerOfAccountButton()