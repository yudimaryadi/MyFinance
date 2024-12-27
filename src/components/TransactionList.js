import React, { useState } from 'react';
import { formatToRupiah } from '../utils/currencyFormatter';
import Modal from './Modal';
import TransactionForm from './TransactionForm';

function TransactionList({ transactions, loading, onEditTransaction, session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleTransactionUpdated = () => {
    onEditTransaction();
    handleClose();
  };
  if (loading) {
    return <div className="text-gray-600 text-center py-4">Loading transactions...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Transactions</h2>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id}
            className={`flex items-center justify-between p-4 rounded-lg bg-white border ${
              transaction.type === 'income' ? 'border-green-200' : 'border-red-200'
            } hover:shadow-md transition-shadow`}
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </div>
              <div className="font-medium text-gray-900 truncate">
                {transaction.description}
              </div>
            </div>
            <div className={`px-4 font-semibold ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatToRupiah(transaction.amount)}
            </div>
            <button 
              onClick={() => handleEdit(transaction)}
              className="ml-4 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        {editingTransaction && (
          <TransactionForm
            session={session}
            editingTransaction={editingTransaction}
            onTransactionUpdated={handleTransactionUpdated}
          />
        )}
      </Modal>
    </div>
  );
}

export default TransactionList;