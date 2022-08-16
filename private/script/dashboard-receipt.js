const queryString = window.location.pathname.split('/')
let id = queryString[queryString.length - 1]

async function load_panel() {
	document.querySelector('#receipt-btn').addEventListener('click', () => {
		addPanels()
		loadReceiptRecord(id)
		loadSubmit()
		submitReceiptToAI(id)
	})
	document.querySelector('#m-receipt-btn').addEventListener('click', () => {
		addPanels()
		loadReceiptRecord(id)
		loadSubmit()
		submitReceiptToAI(id)
	})
}

const TypeMapping = {
	1: 'Clothing',
	2: 'Food',
	3: 'Housing',
	4: 'Travel',
	5: 'Shopping',
	6: 'Others'
}

const TypeMappings = new Map([
	['Clothing', 1],
	['Food', 2],
	['Housing', 3],
	['Travel', 4],
	['Shopping', 5],
	['Others', 6]
])

async function addPanels() {
	const panelHtmlSTR = `
    <div id="submit-panel"></div>

    <div id="receipt-panel"></div>
    `
	document.querySelector('#dashboard-panel').innerHTML = panelHtmlSTR
}

//async function confirmFunction(id) {
// const result = confirm("Would you like to edit your receipt?")
// if (result) {
// document.querySelector(`#receipt-venue-${id}`).getAttribute('contenteditable') = True
// document.querySelector(`#receipt-date-${id}`).getAttribute('contenteditable') = True
//document.querySelector(`#receipt-amount-${id}`).getAttribute('contenteditable') = True
//document.querySelector(`#receipt-type-${id}`).getAttribute('contenteditable') = True}}

async function editConfirmFunction() {
	const result = await Swal.fire({
		title: 'Do you want to save the changes?',
		showDenyButton: true,
		showCancelButton: true,
		confirmButtonText: 'Save',
		denyButtonText: `Don't save`
	}).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
			return true
		} else if (result.isDenied) {
			return false
		}
	})
	return result
}

async function deleteConfirmFunction() {
	const result = await Swal.fire({
		title: 'Do you want to delete this receipt?',
		showDenyButton: true,
		showCancelButton: true,
		confirmButtonText: 'Delete',
		denyButtonText: `Don't delete`
	}).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
			return true
		} else if (result.isDenied) {
			return false
		}
	})
	return result
}

async function loadReceiptRecord(id) {
	const res = await fetch(`/receipt/${id}`)
	let receiptHTML = ``
	const receipts = await res.json()

	if (receipts.success === false) {
		await Swal.fire('You did not login', 'error')
		window.location.href = `/login`
	} else {
		for (const result of receipts) {
			const realBDay = new Date(result.date)
			let year = realBDay.getFullYear().toString()
			let month = '0' + (realBDay.getMonth() + 1).toString()
			let date = '0' + realBDay.getDate().toString()
			const finalDate =
				year +
				'-' +
				month.substring(month.length - 2) +
				'-' +
				date.substring(date.length - 2)

			imagePath = `/${result.image}`
			expensesType = TypeMapping[result.type]

			receiptHTML += `<div class="receipt">
        <div class="receiptBody">
            <div id="content" data-id = '${result.id}'>
                <img src="../..${imagePath}" class="card-img">

                <div id ="receipt-text" data-id = '${result.id}'>
                <div class = "receipt-content" contenteditable=True id="receipt-venue-${result.id}">${result.venue}</div>
                <div class = "receipt-content" contenteditable=True id="receipt-date-${result.id}">${finalDate}</div>
                <div class = "receipt-content" contenteditable=True id="receipt-amount-${result.id}">${result.price}</div>
                <select class = "receiptSelectionType" "name="selection" id="receipt-type-${result.id}">
                    <option value=0 selected>${expensesType}</option>
                    <option value=1>Clothing</option>
                    <option value=2>Food</option>
                    <option value=3>Housing</option>
                    <option value=4>Travel</option>
                    <option value=5>Shopping</option>
                    <option value=6>Others</option>
                    </select>

                    <i class="bi bi-pencil-square" id ="edit"></i>
                    <i class="bi bi-file-earmark-x-fill" id ="delete"></i>
                </div>

            </div>   
        </div>
    </div>
        `
		}

		document.querySelector('#receipt-panel').innerHTML = receiptHTML

		document.querySelectorAll('#edit').forEach((ele) => {
			ele.addEventListener('click', async (e) => {
				const receiptId = e.target.parentElement.dataset.id
				const result = await editConfirmFunction()

				if (result) {
					const revisedVenue = document.querySelector(
						`#receipt-venue-${receiptId}`
					).innerText
					const revisedDate = document.querySelector(
						`#receipt-date-${receiptId}`
					).innerText
					const revisedAmount = document.querySelector(
						`#receipt-amount-${receiptId}`
					).innerText
					const e = document.querySelector(
						`#receipt-type-${receiptId}`
					)
					const text = e.options[e.selectedIndex].text
					const revisedType = TypeMappings.get(text)

					const resp = await fetch(`/receipt/${receiptId}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							venue: revisedVenue,
							date: revisedDate,
							amount: revisedAmount,
							type: revisedType
						})
					})

					const result = await resp.json()
					if (result.success) {
						await Swal.fire('Receipt updated', 'success')
						loadReceiptRecord(id)
						loadSubmit()
						submitReceiptToAI(id)
					} else {
						await Swal.fire('Error!!! Please check', 'error')
					}
				}
			})
		})

		document.querySelectorAll('#delete').forEach((ele) => {
			ele.addEventListener('click', async (e) => {
				const receiptId = e.target.parentElement.dataset.id
				const result = await deleteConfirmFunction()
				if (result) {
					const resp = await fetch(`/receipt/${receiptId}`, {
						method: 'delete',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							receiptId
						})
					})

					const result = await resp.json()
					if (result.success) {
						await Swal.fire('Receipt deleted', 'success')
						loadReceiptRecord(id)
						loadSubmit()
						submitReceiptToAI(id)
					} else {
						await Swal.fire('Error, please check', 'error')
					}
				}
			})
		})
	}
}

async function loadSubmit() {
	htmlSTR = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Submit your receipt here!!!
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="exampleModalLabel">Upload your receipt below to our AI 🤖🤖🤖</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>

            <!-- Submit image to AI -->
            <div class="modal-body">

                <form id="receiptAI" enctype=multipart/form-data> 
                    <input type="file" name="file" required>
                    
                    <p> Please select your receipt language </p>
                    <select class="form-select" aria-label="Default select example" id="selection" name ="type">
                    
                    <option value="0">Chinese</option>
                    <option value="1">English</option>
                    <option value="2">Chinese & English</option>
                    </select>
                    
                    <div class="Submit-bar">
                    <button type="submit" class="btn btn-primary" id = "AIButton">Submit</button>
                    <button type="reset" class="btn btn-primary" id = "AIClearButton" data-bs-dismiss="modal" aria-label="Close" >Cancel</button>
                    </div>

                   </form>
            </div>


            <div class="modal-body" id ="receiptTime">
            </div>

        </div>
    </div>
</div>
`

	document.querySelector('#submit-panel').innerHTML = htmlSTR
}

async function submitReceiptToAI(userID) {
	document
		.querySelector('#receiptAI')
		.addEventListener('submit', async function (event) {
			event.preventDefault()
			const submitForm = event.target
			const formData = new FormData()
			receipt = submitForm.file.files[0]
			receiptName = submitForm.file.files[0].name
			lanType = submitForm.type.value
			if (lanType === '0') {
				lanType = 'chi_tra'
			} else if (lanType === '1') {
				lanType = 'eng'
			} else {
				lanType = 'chi_tra+eng'
			}
			receiptName = `${receiptName}-${userID}`
			receiptName = `${userID}-${receiptName}`
			formData.append(receiptName, receipt)
			formData.append(receiptName, receiptName)

			const response = await fetch('/receiptSubmit', {
				method: 'Post',
				body: formData
			})

			const receiptToAI = await response.json()

			if (!receiptToAI.success) {
				await Swal.fire(receiptToAI.message, 'error')
				return
			} else {
				const resp = await fetch(
					`//python.samor.me/upload/${receiptName}`,
					{
						method: 'POST',
						body: JSON.stringify({
							lanType
						})
					}
				)

				const AIResult = await resp.json()
				const AIdate = AIResult.date
				const AIname = AIResult.name
				const AIamount = AIResult.amount

				AIresultHtml = `
    <p>Here are the result from our AI, Please check before submit</p>
    <form id = "saveReceipt">
    
    <div class="input-group mb-3">
    <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
    <input type="text" class="form-control" aria-label="Sizing example input" 
    aria-describedby="inputGroup-sizing-default" 
    id="shopName" name="shopName" placeholder = "ShopName" required value = ${AIname}></div>

    <div class="input-group mb-3">
    <span class="input-group-text" id="inputGroup-sizing-default">Date</span>
    <input type="text" class="form-control" aria-label="Sizing example input" 
    aria-describedby="inputGroup-sizing-default" 
    id="date" name="date" placeholder = "Date" required value = ${AIdate}></div>

    <div class="input-group mb-3">
    <span class="input-group-text" id="inputGroup-sizing-default">Amount</span>
    <input type="text" class="form-control" aria-label="Sizing example input" 
    aria-describedby="inputGroup-sizing-default" 
    id="amount" name="amount" placeholder = "Amount" required value = ${AIamount}></div>

    <h5> Opps, our AI unable to detect expenses type of your receipt, please select by yourself 🙇🙇🙇</h5>
    <select class="form-select" aria-label="Default select example" id="selection" name = "type">
                    <option value="1">Clothing</option>
                    <option value="2">Food</option>
                    <option value="3">Housing</option>
                    <option value="4">Travel</option>
                    <option value="5">Shopping</option>
                    <option value="6">Others</option>
                    </select>

        <div class="Submit-bar">
            <button type="submit" class="btn btn-primary" id = "submitButton" data-bs-dismiss="modal" aria-label="Close">Submit</button>
            <button type="reset" class="btn btn-primary" id = "ResetButton" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
</div>

</form>
`

				document.querySelector('#receiptTime').innerHTML = AIresultHtml
				await submitReceipt(receiptName, userID)
			}
			// Add function to form
		})
}

async function submitReceipt(receiptName, id) {
	document
		.querySelector('#saveReceipt')
		.addEventListener('submit', async function (event) {
			event.preventDefault()
			const form = event.target
			const shopName = form.shopName.value
			const date = form.date.value
			const amount = form.amount.value
			const image = receiptName
			const expensesType = form.type.value
			const res = await fetch(`/receipt/${id}`, {
				method: 'Post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					shopName: shopName,
					date: date,
					amount: amount,
					image: image,
					expensesType: expensesType
				})
			})

			const result = await res.json()

			if (result.success) {
				await Swal.fire('Your receipt is saved successfully', 'success')
				loadReceiptRecord(id)
				loadSubmit()
				submitReceiptToAI(id)
			} else {
				await Swal.fire(result.message, 'error')
			}
		})
}

load_panel()
