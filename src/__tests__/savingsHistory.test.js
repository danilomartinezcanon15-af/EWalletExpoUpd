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

// ── addSavingsHistoryEntry ─────────────────────────────

  test('Debe agregar la nueva entrada al inicio del historial', () => {

    const existing = [
      createSavingsHistoryEntry('g1', 'Meta A', 10000),
    ];

    const newEntry = createSavingsHistoryEntry('g2', 'Meta B', 20000);

    const updated = addSavingsHistoryEntry(existing, newEntry);

    expect(updated[0].id).toBe(newEntry.id);
    expect(updated).toHaveLength(2);

  });

  test('No debe mutar el historial original', () => {

    const original = [
      createSavingsHistoryEntry('g1', 'Meta A', 10000),
    ];

    const newEntry = createSavingsHistoryEntry('g2', 'Meta B', 20000);

    addSavingsHistoryEntry(original, newEntry);

    expect(original).toHaveLength(1);

  });

  test('Debe funcionar con historial vacío', () => {

    const entry = createSavingsHistoryEntry('g1', 'Meta A', 30000);

    const result = addSavingsHistoryEntry([], entry);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(entry.id);

  });

// ── filterHistoryByGoal ────────────────────────────────

  test('Debe retornar solo las entradas de la meta indicada', () => {

    const history = [
      createSavingsHistoryEntry('g1', 'Meta A', 10000),
      createSavingsHistoryEntry('g2', 'Meta B', 20000),
      createSavingsHistoryEntry('g1', 'Meta A', 30000),
    ];

    const result = filterHistoryByGoal(history, 'g1');

    expect(result).toHaveLength(2);
    result.forEach(entry => {
      expect(entry.goalId).toBe('g1');
    });

  });

  test('Debe retornar array vacío si la meta no tiene entradas', () => {

    const history = [
      createSavingsHistoryEntry('g1', 'Meta A', 10000),
    ];

    const result = filterHistoryByGoal(history, 'g-inexistente');

    expect(result).toHaveLength(0);

  });

  test('Debe retornar array vacío si el historial está vacío', () => {

    const result = filterHistoryByGoal([], 'g1');

    expect(result).toHaveLength(0);

  });