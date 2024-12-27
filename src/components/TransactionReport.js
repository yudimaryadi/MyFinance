import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function TransactionReport({ transactions }) {
  // Process transactions for the donut chart
  const processTransactionData = () => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      const category = transaction.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + Math.abs(parseFloat(transaction.amount));
      return acc;
    }, {});

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF99CC',
            '#66FF99',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF99CC',
            '#66FF99',
          ],
        },
      ],
    };
  };

  const chartData = processTransactionData();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Transaction Report</h2>
      <div className="max-w-md mx-auto">
        <Doughnut data={chartData} />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Category Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chartData.labels.map((category, index) => (
            <div key={category} className="flex items-center justify-between p-2 bg-white rounded shadow">
              <span className="font-medium">{category}</span>
              <span className="text-gray-600">
                ${chartData.datasets[0].data[index].toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionReport;