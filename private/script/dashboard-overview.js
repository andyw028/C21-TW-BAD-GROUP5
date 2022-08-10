async function loadDashboardOverview() {
	document.querySelector('#overview-btn').addEventListener('click', () => {
		loadOverview()
	})
}

function loadOverview() {

    const overviewBoard = document.querySelector('#dashboard-panel')
    overviewBoard.innerHTML = ``


}

loadDashboardOverview()
