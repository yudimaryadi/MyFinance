import React from 'react';
import { formatToRupiah } from '../utils/currencyFormatter';

function CategoryReport({ transactions }) {
  // Process transactions for the category report
  const processCategoryData = () => {
    const categoryDetails = transactions.reduce((acc, transaction) => {
      const category = transaction.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = {
          total: 0,
          items: []
        };
      }
      
      const amount = Math.abs(parseFloat(transaction.amount));
      acc[category].total += amount;
      acc[category].items.push({
        description: transaction.description,
        amount: amount
      });
      
      return acc;
    }, {});

    return categoryDetails;
  };

  const categoryData = processCategoryData();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Category Report</h2>
      {Object.entries(categoryData).map(([category, data]) => (
        <div key={category} className="mb-6 border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">
            {category} - Total: {formatToRupiah(data.total)}
          </h3>
          <div className="pl-4">
            {data.items.map((item, index) => (
              <div key={index} className="mb-1 flex justify-between">
                <span>{item.description}</span>
                <span className="font-medium">{formatToRupiah(item.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryReport;