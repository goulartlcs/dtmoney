import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

import './App.css';
import { DashBoard } from './components/Dashboard';

import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';

function App() {
  const [transactionsTable, setTransactionsTable] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  const [isNewTransactionModalOpen, SetIsNewTransactionModalOpen] = useState(false);

  useEffect(() => {
    setTransactionsTable(transactions);
  }, [transactions]);

  function handleOpenNewTransactionModal() {
    SetIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    SetIsNewTransactionModalOpen(false);
  }

  const summary = transactionsTable.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      transaction.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      transaction.total -= transaction.amount;
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  });
  
  return (
    <div className="bg-background min-h-screen">
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <DashBoard transactionsTable={transactionsTable} summary={summary} />
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        setTransactions={setTransactions}
        transactions={transactions}
      />
    </div>
  );
}

export default App;
