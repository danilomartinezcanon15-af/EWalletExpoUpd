import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  generateTransactionHistory,
  calculateNetBalance,
  calculateTotalCashback,
  buyUSDT,
  createSavingsGoals,
  transferToSavingsGoal,
  classifyExpenses,
} from './walletEngine';

const allTransactions = generateTransactionHistory(200);

export default function WalletScreen() {

  const [filter, setFilter] = useState('Todos');

  const [walletBalance, setWalletBalance] = useState(500000);

  const [usdtPurchase, setUsdtPurchase] = useState(null);

  const [goals, setGoals] = useState(
    createSavingsGoals()
  );

const filteredTransactions = useMemo(() => {

    if (filter === 'Ingreso') {

      return allTransactions.filter(
        t => t.type === 'Ingreso'
      );

    }

    if (filter === 'Retiro') {

      return allTransactions.filter(
        t => t.type === 'Retiro'
      );

    }

    return allTransactions;

  }, [filter]);

  const netBalance =
    calculateNetBalance(allTransactions);

  const totalCashback =
    calculateTotalCashback(allTransactions);

  const expenseStatus =
    classifyExpenses(allTransactions);

  const handleBuyUSDT = () => {

    const result = buyUSDT(
      walletBalance,
      100000
    );

    if (result.status === 'Rechazado') {

      alert('Saldo insuficiente');

      return;

    }

    setWalletBalance(
      walletBalance - 100000
    );

    setUsdtPurchase(result);

  };

  const handleTransfer = (goalId) => {

    const result = transferToSavingsGoal(
      walletBalance,
      goals,
      goalId,
      50000
    );

    if (result.status === 'Rechazado') {

      alert('Saldo insuficiente');

      return;

    }

    setWalletBalance(result.balance);

    setGoals(result.goals);

  };