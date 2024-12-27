import React, { useMemo } from 'react';
import { formatToRupiah } from '../utils/currencyFormatter';

function MonthlySummary({ transactions }) {
  const summary = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthlyTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === currentMonth &&
             transactionDate.getFullYear() === currentYear;
    });

    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenditure = monthlyTransactions
      .filter(t => t.type === 'expenditure')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenditure,
      balance: totalIncome - totalExpenditure
    };
  }, [transactions]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Month Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">{formatToRupiah(summary.totalIncome)}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Expenditure</h3>
          <p className="text-2xl font-bold text-red-600">{formatToRupiah(summary.totalExpenditure)}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Balance</h3>
          <p className={`text-2xl font-bold ${summary.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
            {formatToRupiah(summary.balance)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MonthlySummary;