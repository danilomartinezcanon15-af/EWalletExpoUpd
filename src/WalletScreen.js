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

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
    >

      <Text style={styles.title}>
        Saldo Neto Total
      </Text>

      <Text style={styles.balance}>
        ${netBalance.toLocaleString('es-CO')}
      </Text>

      <Text style={styles.cashback}>
        Puntos ADSO:
        {' '}
        {totalCashback.toLocaleString('es-CO')}
      </Text>

      {/* BOTONES FILTRO */}

      <View style={styles.buttons}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setFilter('Ingreso')}
        >

          <Text style={styles.buttonText}>
            Ver solo Ingresos
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setFilter('Retiro')}
        >

          <Text style={styles.buttonText}>
            Ver solo Retiros
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setFilter('Todos')}
        >

          <Text style={styles.buttonText}>
            Ver Todos
          </Text>

        </TouchableOpacity>

      </View>

       {/* USDT */}

       <View style={styles.section}>

<Text style={styles.sectionTitle}>
  Compra USDT
</Text>

<Text>
  Saldo Wallet:
  {' '}
  ${walletBalance.toLocaleString('es-CO')}
</Text>

<TouchableOpacity
  style={styles.button}
  onPress={handleBuyUSDT}
>

  <Text style={styles.buttonText}>
    Comprar 100000 COP en USDT
  </Text>

</TouchableOpacity>

{usdtPurchase && (

  <View>

    <Text>
      Tasa:
      {' '}
      ${usdtPurchase.exchangeRate}
    </Text>

    <Text>
      USDT:
      {' '}
      {usdtPurchase.usdt.toFixed(2)}
    </Text>

  </View>

)}

</View>

 {/* METAS */}

 <View style={styles.section}>

<Text style={styles.sectionTitle}>
  Metas de ahorro
</Text>

{goals.map(goal => (

  <View
    key={goal.id}
    style={styles.goalCard}
  >

    <Text>
      {goal.name}
    </Text>

    <Text>
      Ahorrado:
      {' '}
      ${goal.saved.toLocaleString('es-CO')}
    </Text>

    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        handleTransfer(goal.id)
      }
    >

      <Text style={styles.buttonText}>
        Transferir 50000
      </Text>

    </TouchableOpacity>

  </View>

))}

</View>

 {/* ALERTA */}

 <View style={styles.section}>

<Text style={styles.sectionTitle}>
  Estado financiero
</Text>

{expenseStatus === 'Gasto Crítico' ? (

  <Text style={styles.critical}>
    ⚠ Gasto Crítico
  </Text>

) : (

  <Text style={styles.stable}>
    ✅ Estable
  </Text>

)}

</View>
