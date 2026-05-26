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