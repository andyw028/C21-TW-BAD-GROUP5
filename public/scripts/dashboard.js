const chart = document.querySelector("#chart").getContext('2d');

// create a new chart instance
new Chart(chart, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],

        datasets: [
            {
                label: 'Expenses',
                data: [30000, 33537, 49631, 59095, 57828, 36684, 33572, 39974, 48847, 48116, 61004],
                borderColor: 'green',
                borderWidth: 2
            },
            {
                label: 'Income',
                data: [50000, 50000, 50000, 55000, 52000, 51000, 50000, 55000, 50000, 50000, 50000],
                borderColor: 'pink',
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true
    }
})


// const menuBtn = document.querySelector('#menu-btn');
// const closeBtn = document.querySelector('#close-btn');
// const sidebar = document.querySelector('aside');

// menuBtn.addEventListener('click', () => {
//     sidebar.style.display = 'block';
// })

// closeBtn.addEventListener('click', () => {
//     sidebar.style.display = 'none';
// })


const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    themeBtn.querySelector('span:first-child').classList.toggle('active');
    themeBtn.querySelector('span:last-child').classList.toggle('active');
})