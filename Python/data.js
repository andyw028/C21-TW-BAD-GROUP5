document.querySelector("#submitReceipt").addEventListener("submit" , async function (event){

    event.preventDefault()
    const form = event.target
    const formData = new FormData()
    formData.append("Name", form.image.files[0].name)

    const res = await fetch("submitReceipt", {
        method: "Post",
        body: formData,
        content: form.image.files[0]
    })
    

    


})