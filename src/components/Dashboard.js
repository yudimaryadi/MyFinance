import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import MonthlySummary from './MonthlySummary';
import TransactionReport from './TransactionReport';

function Dashboard({ session, reportMode = false }) {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    if (editingTransaction) {
      setEditingTransaction(null);
    }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setTransactions(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">MyFinance</h1>
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {reportMode ? (
          <TransactionReport transactions={transactions} />
        ) : (
          <>
            <div className="mb-8">
              <MonthlySummary transactions={transactions} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <TransactionForm 
                  session={session}
                  onTransactionAdded={getTransactions}
                  editingTransaction={editingTransaction}
                  onTransactionUpdated={() => {
                    getTransactions();
                    setEditingTransaction(null);
                  }}
                />
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <TransactionList
                  transactions={transactions}
                  loading={loading}
                  onEditTransaction={setEditingTransaction}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;