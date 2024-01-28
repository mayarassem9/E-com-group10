// Fetch data from JSON file
fetch('Data/analysis.json')
  .then(response => response.json())
  .then(data => {
    const salesByDay = aggregateSalesByDay(data);
    createBarChart(salesByDay);
    createPieChart(salesByDay);
    createLineChart(salesByDay);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
// Function to aggregate sales by day for the current seller
function aggregateSalesByDay(data, currentSellerId) {
    const salesByDay = {};
    data.forEach(order => {
      // Filter orders for the current seller
      if (Array.isArray(order.items)) {
        const sellerItems = order.items.filter(item => item.sellerId === currentSellerId);
        if (sellerItems.length > 0) {
          const date = new Date(order.date).toLocaleDateString();
          if (!salesByDay[date]) {
            salesByDay[date] = {};
          }
          sellerItems.forEach(item => {
            if (!salesByDay[date][currentSellerId]) {
              salesByDay[date][currentSellerId] = 0;
            }
            salesByDay[date][currentSellerId] += item.price * item.quantity;
          });
        }
      } else {
        if (order.items.sellerId === currentSellerId) {
          const date = new Date(order.date).toLocaleDateString();
          if (!salesByDay[date]) {
            salesByDay[date] = {};
          }
          if (!salesByDay[date][currentSellerId]) {
            salesByDay[date][currentSellerId] = 0;
          }
          salesByDay[date][currentSellerId] += order.total;
        }
      }
    });
    return salesByDay;
  }

// Function to create bar chart
function createBarChart(data) {
    const labels = Object.keys(data);
    const sellerIds = [...new Set(Object.values(data).flatMap(Object.keys))];
    const datasets = sellerIds.map(sellerId => ({
      label: `Sales for Seller ${sellerId}`,
      data: labels.map(date => data[date][sellerId] || 0),
      backgroundColor: getRandomColor(),
      borderColor: getRandomColor(),
      borderWidth: 1
    }));
  
    const ctx = document.getElementById('barChart').getContext('2d');
  
    const chartData = {
      labels: labels,
      datasets: datasets
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      onClick: ( chartElement) => {
        if (chartElement.length > 0) {
          const datasetIndex = chartElement[0].datasetIndex;
          const dataIndex = chartElement[0].index;
          const sellerId = sellerIds[datasetIndex];
          const date = labels[dataIndex];
          const sales = data[date][sellerId];
          console.log("Seller ID:", sellerId);
          console.log("Date:", date);
          console.log("Sales:", sales);
          alert(`Sales for Seller ${sellerId} on ${date}: $${sales}`);
        }
      }
    };
  
    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: options
    });
  }
  
  // Function to create pie chart
  function createPieChart(data) {
    const labels = Object.keys(data);
    const totalSales = labels.reduce((total, date) => {
      return total + Object.values(data[date]).reduce((acc, curr) => acc + curr, 0);
    }, 0);
  
    const sellerIds = [...new Set(Object.values(data).flatMap(Object.keys))];
    const datasets = sellerIds.map(sellerId => ({
      label: `Sales for Seller ${sellerId}`,
      data: labels.map(date => (data[date][sellerId] || 0) / totalSales * 100),
      backgroundColor: getRandomColor(),
      borderColor: getRandomColor(),
      borderWidth: 1
    }));
  
    const ctx = document.getElementById('pieChart').getContext('2d');
  
    const chartData = {
      labels: labels,
      datasets: datasets
    };
  
    const options = {
      onClick: (event, chartElement) => {
        if (chartElement.length > 0) {
          const datasetIndex = chartElement[0].datasetIndex;
          const dataIndex = chartElement[0].index;
          const sellerId = sellerIds[datasetIndex];
          const date = labels[dataIndex];
          const sales = data[date][sellerId];
          alert(`Sales for Seller ${sellerId} on ${date}: $${sales}`);
        }
      }
    };
  
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: options
    });
  }
  
  // Function to create line chart
  function createLineChart(data) {
    const labels = Object.keys(data);
    const sellerIds = [...new Set(Object.values(data).flatMap(Object.keys))];
    const datasets = sellerIds.map(sellerId => ({
      label: `Sales for Seller ${sellerId}`,
      data: labels.map(date => data[date][sellerId] || 0),
      fill: false,
      borderColor: getRandomColor(),
      borderWidth: 2
    }));
  
    const ctx = document.getElementById('lineChart').getContext('2d');
  
    const chartData = {
      labels: labels,
      datasets: datasets
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      onClick: (event, chartElement) => {
        if (chartElement.length > 0) {
          const datasetIndex = chartElement[0].datasetIndex;
          const dataIndex = chartElement[0].index;
          const sellerId = sellerIds[datasetIndex];
          const date = labels[dataIndex];
          const sales = data[date][sellerId] || 0; // Ensure sales is not undefined
          alert(`Sales for Seller ${sellerId} on ${date}: $${sales.toFixed(2)}`);
        }
      }
    };
  
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: options
    });
  }
  
// Function to get a random color
function getRandomColor() {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
}
