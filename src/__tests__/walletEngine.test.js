import {
  generateTransactionHistory,
  calculateNetBalance,
  calculateCashback,
  calculateTotalCashback,
  buyUSDT,
  createSavingsGoals,
  transferToSavingsGoal,
  classifyExpenses,
} from '../walletEngine';

describe('Wallet Engine Tests', () => {

  test('Debe generar exactamente 50 transacciones', () => {

    const transactions = generateTransactionHistory(50);

    expect(transactions).toHaveLength(50);

  });

  test('El monto siempre debe ser positivo y mayor que cero', () => {

    const transactions = generateTransactionHistory(100);

    transactions.forEach(transaction => {
      expect(transaction.amount).toBeGreaterThan(0);
    });

  });

  test('No deben existir campos undefined', () => {

    const transactions = generateTransactionHistory(20);

    transactions.forEach(transaction => {

      Object.values(transaction).forEach(value => {
        expect(value).not.toBeUndefined();
      });

    });

  });