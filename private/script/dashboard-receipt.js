async function load_panel() {
    document.querySelector('#receipt-btn').addEventListener("click", () => {
        const id = 14
        addPanels()
        loadReceiptRecord(id)
        loadSubmit()
    })

}



async function addPanels() {

    htmlSTR = `
    <div id="submit-panel"></div>

    <div id="receipt-panel"></div>
    `
    document.querySelector("#dashboard-panel").innerHTML = htmlSTR

}

async function loadReceiptRecord(id) {
    const res = await fetch(`/receipt/${id}`)

    const receipts = await res.json()

    for (const result in receipts) {
        const realBDay = new Date(result.date)
        let year = realBDay.getFullYear().toString()
        let month = "0" + (realBDay.getMonth() + 1).toString()
        let date = "0" + realBDay.getDate().toString()
        let hour = "0" + realBDay.getHours().toString()
        let mins = "0" + realBDay.getMinutes().toString()
        const finalDate =
            year +
            "-" +
            month.substring(month.length - 2) +
            "-" +
            date.substring(date.length - 2) +
            " (" +
            hour.substring(hour.length - 2) +
            ":" +
            mins.substring(mins.length - 2) +
            ")"

        
        htmlSTR = ""
        htmlSTR +=
            `<div class="receipt">
        <div class="receiptBody">
            <img src=${result.image} class="card-img">

            <div id="content">
                <p class="receipt-text">
                    Venue: ${result.venue}
                    Date: ${finalDate}
                    Amount: ${result.price}
                    type: ${result.type} 
                </p>
            </div>
        </div>
    </div>
        `
    }

    document.querySelector("#receipt-panel").innerHTML = htmlSTR

}

async function loadSubmit() {

    htmlSTR =
        `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Submit your receipt here!!!
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Upload your receipt below</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>

            <!-- Submit image to AI -->
            <div class="modal-body">
                <form id="receiptAI" enctype=multipart/form-data> 
                    <input type="file" name=file>
                    <div class="Submit-bar">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="reset" class="btn btn-primary">Clear</button>
                    
                </div>
                   </form>
            </div>

            <div class="modal-body">
                Here is the result
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
                `

document.querySelector('#submit-panel').innerHTML = htmlSTR

    document.querySelector('#receiptAI').addEventListener("submit", async function (event) {

        event.preventDefault()
        const form = event.target
        const formData = new FormData()
        formData.append("Name", form.file.files[0].name)
        console.log(form.file.files[0].name)


        //const res = await fetch("submitReceipt", {
        //    method: "Post",
        //    body: formData,
        //    content: form.image.files[0]})



    })
}



load_panel()