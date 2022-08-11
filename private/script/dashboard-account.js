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
<style>
  table, th, td {
    border:1px solid black;
  }
</style>
<body>
  
<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Change user name</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Change password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>


<div id="divWrap">
      <table id="userTable">
      <table style="width:40%">
        <tr>
        <td>username</td>
        <td>name</td>
        <td>email</td>
        </tr>
        <tr>
          <td>hellboy</td>
          <td>roy</td>
          <td>rr@rr.com</td>
          </tr>
         
      </table>
</div>


`}


eventListenerOfAccountButton()