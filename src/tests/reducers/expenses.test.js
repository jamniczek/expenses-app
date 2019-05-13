import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('shoud remove expense with given id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('shoud not remove any expense', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: 'no such id'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('shoud add new expense', () => {
  const expense = {
    id: '4',
    description: 'new expense',
    amount: 10,
    createdA: 300000,
    note: ''
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('shoud edit expense with given id', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: { description: 'changed!' }
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].description).toBe('changed!');
});

test('shoud not edit any expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'no such id',
    updates: { description: 'changed!' }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
