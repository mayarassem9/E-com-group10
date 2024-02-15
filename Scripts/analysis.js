$(document).ready(function () {
  //    debugger

  let links = document.querySelectorAll(".sidebar-nav a");
  const currentTab = 0;
  links.forEach(function (link) {
    link.addEventListener("click", activateTab);
  });

  // this is the toggle collapse script
  const $button = document.querySelector("#sidebar-toggle");
  const $wrapper = document.querySelector("#wrapper");

  $("#logout").click(function (e) {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.href = "./index.html";
  });

  $button.addEventListener("click", (e) => {
    e.preventDefault();
    $wrapper.classList.toggle("toggled");
  });
  function activateTab(event) {
    links.forEach(function (l) {
      l.parentElement.classList.remove("active");
    });

    event.currentTarget.parentElement.classList.add("active");

    currentTab = parseInt(event.currentTarget.getAttribute("data-tab"));
    console.log(currentTab);

    window.location.href = event.currentTarget.getAttribute("href");
  }
  window.navigateToPage = function (pageUrl) {
    window.location.href = pageUrl;
  };
});
function getLoggedInSellerId() {
  // Retrieve currentUser data from local storage
  const currentUserData = JSON.parse(localStorage.getItem("currentUser"));

  // Check if currentUser data exists and if the role is "seller"
  if (
    currentUserData &&
    currentUserData.length > 0 &&
    currentUserData[0].role === "seller"
  ) {
    // Return the seller's ID from currentUser data
    return currentUserData[0].id;
  } else {
    // Handle the case where currentUser data is not found or the role is not "seller"
    console.error(
      "Error: Seller ID not found or current user is not a seller."
    );
    // You might redirect the user to the appropriate page or take other actions based on your application's logic
    return null; // or throw an error, depending on your requirements
  }
}

// Retrieve allOrders from local storage
function analyzeSellerOrders() {
  // Retrieve allOrders from local storage
  const allOrders = JSON.parse(localStorage.getItem("allOrders"));

  // Proceed with the analysis if allOrders exists
  if (allOrders) {
    // Filter orders based on the seller's ID
    const sellerId = getLoggedInSellerId();
    //debugger;
    const sellerOrders = allOrders.filter((order) =>
      order.items.some((item) => item.sellerId === sellerId)
    );

    // Aggregate sales by month and week for the seller's orders
    const salesByMonth = aggregateSalesByMonth(sellerOrders);
    const salesByWeek = aggregateSalesByWeek(sellerOrders);

    // Create charts
    createBarChart(salesByMonth, "barChart", "Monthly Sales");
    createPieChart(salesByWeek, "pieChart", "Weekly Sales");
    createLineChartForPastSevenDays(sellerOrders); // Call the function for creating line chart for past seven days

    // Calculate the number of books sold and number of orders
    const numberOfBooksSold = sellerOrders.reduce((acc, order) => {
      return (
        acc +
        order.items.reduce(
          (totalQuantity, item) => totalQuantity + item.quantity,
          0
        )
      );
    }, 0);
    const numberOfOrders = sellerOrders.length;

    // Update the HTML to display the numbers
    document.getElementById("numberOfBooksSold").textContent =
      numberOfBooksSold;
    document.getElementById("numberOfOrders").textContent = numberOfOrders;
  } else {
    console.error("Error: No data found in local storage.");
  }
}

// Call the analyzeSellerOrders function
analyzeSellerOrders();

// Function to aggregate sales by month
function aggregateSalesByMonth(data) {
  debugger;
  const salesByMonth = {};
  data.forEach((order) => {
    const date = new Date(order.date);
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();
    const monthKey = `${year}-${month}`;
    if (!salesByMonth[monthKey]) {
      salesByMonth[monthKey] = 0;
    }
    salesByMonth[monthKey] += order.total;
  });
  return salesByMonth;
}

// Function to aggregate sales by week
function aggregateSalesByWeek(data) {
  const salesByWeek = {};
  data.forEach((order) => {
    const date = new Date(order.date);
    const year = date.getFullYear();
    const week = getWeekNumber(date);
    const weekKey = `${year}-W${week}`;
    if (!salesByWeek[weekKey]) {
      salesByWeek[weekKey] = 0;
    }
    salesByWeek[weekKey] += order.total;
  });
  return salesByWeek;
}

// Function to get week number of the year
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Function to create bar chart or pie chart based on chartType
function createChart(data, chartType, chartId, chartLabel) {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const backgroundColors = labels.map(() => getRandomColor());

  const ctx = document.getElementById(chartId).getContext("2d");

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: chartLabel,
        data: values,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    onClick: (event, chartElement) => {
      if (chartElement.length > 0) {
        const index = chartElement[0].index;
        const label = labels[index];
        const sales = values[index];
        Swal.fire(`${chartLabel} for ${label}: $${sales.toFixed(2)}`);
      }
    },
  };

  const config = {
    type: chartType,
    data: chartData,
    options: options,
  };

  new Chart(ctx, config);
}

// Call createChart function with appropriate parameters
function createBarChart(data, chartId, chartLabel) {
  createChart(data, "bar", chartId, chartLabel);
}

function createPieChart(data, chartId, chartLabel) {
  createChart(data, "pie", chartId, chartLabel);
}

// Function to create line chart for the past seven days
function createLineChartForPastSevenDays(data) {
  const labels = [];
  const salesData = {};

  // Get date for seven days ago
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6); // Subtract 6 to account for today

  // Initialize salesData object with zeros for each day
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setDate(sevenDaysAgo.getDate() + i); // Add i to get each day within the past seven days
    const formattedDate = formatDate(date);
    labels.push(formattedDate);
    salesData[formattedDate] = 0;
  }

  // Aggregate total sales for each day
  data.forEach((order) => {
    const date = new Date(order.date);
    const formattedDate = formatDate(date);
    if (salesData[formattedDate] !== undefined) {
      salesData[formattedDate] += order.total;
    }
  });

  const ctx = document.getElementById("lineChart").getContext("2d");

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Sales",
        data: Object.values(salesData),
        fill: false,
        borderColor: getRandomColor(),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    onClick: (event, chartElement) => {
      if (chartElement.length > 0) {
        const index = chartElement[0].index;
        const date = labels[index];
        const sales = salesData[date] || 0;
        Swal.fire(`Total sales for ${date}: $${sales.toFixed(2)}`);
      }
    },
  };

  const myLineChart = new Chart(ctx, {
    type: "line",
    data: chartData,
    options: options,
  });
}

// Function to format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Function to get a random color
function getRandomColor() {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 0.2)`;
}
