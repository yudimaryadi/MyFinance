# Transaction Edit Flow Explanation

When you click the "Edit" button on a transaction in the list, here's how it works:

1. In the TransactionList component, each transaction has an "Edit" button with an onClick handler:
```jsx
<button onClick={() => onEditTransaction(transaction)} className="edit-button">
  Edit
</button>
```

2. When clicked, it calls the `onEditTransaction` function with the current transaction data.

3. In the TransactionForm component, if an `editingTransaction` is provided, it initializes the form with that data:
```jsx
const [formData, setFormData] = useState(
  editingTransaction ? {
    type: editingTransaction.type,
    amount: editingTransaction.amount,
    description: editingTransaction.description,
    date: editingTransaction.date.split('T')[0]
  } : {
    // default values if not editing
    type: 'income',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  }
);
```

This means the form automatically gets populated with the transaction data when you click Edit. The functionality is already working as expected.