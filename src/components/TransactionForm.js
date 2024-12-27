import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function TransactionForm({ session, onTransactionAdded, editingTransaction = null, onTransactionUpdated }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    editingTransaction ? {
      type: editingTransaction.type,
      amount: editingTransaction.amount,
      description: editingTransaction.description,
      date: editingTransaction.date.split('T')[0]
    } : {
      type: 'income',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let result;
      if (editingTransaction) {
        result = await supabase
          .from('transactions')
          .update({
            type: formData.type,
            amount: parseFloat(formData.amount),
            description: formData.description,
            date: formData.date
          })
          .eq('id', editingTransaction.id);
      } else {
        result = await supabase
          .from('transactions')
          .insert([{
            user_id: session.user.id,
            type: formData.type,
            amount: parseFloat(formData.amount),
            description: formData.description,
            date: formData.date
          }]);
      }
      const { error } = result;

      if (error) throw error;
      
      setFormData({
        type: 'income',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      if (editingTransaction) {
        onTransactionUpdated();
      } else {
        onTransactionAdded();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="income">Income</option>
          <option value="expenditure">Expenditure</option>
        </select>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300">
          {loading ? (editingTransaction ? 'Updating...' : 'Adding...') : (editingTransaction ? 'Update Transaction' : 'Add Transaction')}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;