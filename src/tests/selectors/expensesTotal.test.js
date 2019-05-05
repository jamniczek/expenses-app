import selectExpensesTotal from '../../selectors/expensesTotal';
import expenses from '../fixtures/expenses';

test('sum multiple expenses', () => {
  const result = selectExpensesTotal(expenses);
  expect(result).toEqual(230195);
});

test('should sum singel expense', () => {
  const result = selectExpensesTotal([expenses[0]]);
  expect(result).toEqual(195);
});

test('should return 0 for no expenses', () => {
  const result = selectExpensesTotal([]);
  expect(result).toEqual(0);
});
