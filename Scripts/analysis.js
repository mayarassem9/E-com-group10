// Fetch data and create charts
fetch("Data/analysis.json")
  .then((response) => response.json())
  .then((data) => {
    const salesByMonth = aggregateSalesByMonth(data);
    const salesByWeek = aggregateSalesByWeek(data);
    createBarChart(salesByMonth, "barChart", "Monthly Sales");
    createPieChart(salesByWeek, "pieChart", "Weekly Sales");
    createLineChartForPastSevenDays(data); // Call the function for creating line chart for past seven days
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// Function to aggregate sales by month
function aggregateSalesByMonth(data) {
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
        alert(`${chartLabel} for ${label}: $${sales.toFixed(2)}`);
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
        alert(`Total sales for ${date}: $${sales.toFixed(2)}`);
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
