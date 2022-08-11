function eventListenerOfOverviewButton() {
    document.querySelector('#overview-btn').addEventListener('click', () => {
        loadOverview()
    });
}

function loadOverview() {
    const overviewBoard = document.querySelector('#dashboard-panel')

    overviewBoard.innerHTML = `
<main>
    <section class="middle">
        <div class="header">
            <h1>Overview</h1>
        </div>

        <div class="insights">
            <div class="sales">
              <span class="material-icons-sharp">analytics</span>
              <div class="middle">
                <div class="left">
                  <h3>Last Month's Expenses</h3>
                  <h1>$25,000</h1>
                </div>
                <div class="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div class="number">
                    <p>70%</p>
                  </div>
                </div>
              </div>
              <small class="text-muted">Last 30 Days</small>
            </div>

            <!------------ END OF EXPENSES -------------->
            <div class="income">
            <span class="material-icons-sharp">stacked_line_chart</span>
            <div class="middle">
              <div class="left">
                <h3>Total Income</h3>
                <h1>$10,864</h1>
              </div>
              <div class="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div class="number">
                  <p>44%</p>
                </div>
              </div>
            </div>
            <small class="text-muted">Last 24 Hours</small>
            </div>

            <!------------ END OF EXPENSES -------------->

            <div class="expenses">
            <span class="material-icons-sharp">bar_chart</span>
            <div class="middle">
            <div class="left">
              <h3>Total Expenses</h3>
              <h1>$14,160</h1>
            </div>
            <div class="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div class="number">
                <p>62%</p>
              </div>
            </div>
            </div>
            <small class="text-muted">Last 24 Hours</small>
            </div>
        </div>

        <!------------ END OF INSIGHTS -------------->

        <!-- END OF CHART -->

    </section>
    <!-- END OF MIDDLE -->

</main>`
}

eventListenerOfOverviewButton()
loadOverview()