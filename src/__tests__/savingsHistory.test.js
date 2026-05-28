import {
  createSavingsHistoryEntry,
  addSavingsHistoryEntry,
  filterHistoryByGoal,
  getTotalTransferredToGoal,
} from '../walletEngine';

/* =========================
   SAVINGS HISTORY TESTS
========================= */

describe('Savings History Tests', () => {

// ── createSavingsHistoryEntry ──────────────────────────

  test('Debe crear una entrada de historial con los campos correctos', () => {

    const entry = createSavingsHistoryEntry(
      'goal-123',
      'Fondo Vacaciones',
      50000
    );

    expect(entry.goalId).toBe('goal-123');
    expect(entry.goalName).toBe('Fondo Vacaciones');
    expect(entry.amount).toBe(50000);
    expect(entry.status).toBe('Completado');
    expect(entry.id).toBeDefined();
    expect(entry.date).toBeInstanceOf(Date);

  });

  test('Cada entrada debe tener un ID único', () => {

    const entry1 = createSavingsHistoryEntry('g1', 'Meta A', 10000);
    const entry2 = createSavingsHistoryEntry('g1', 'Meta A', 10000);

    expect(entry1.id).not.toBe(entry2.id);

  });