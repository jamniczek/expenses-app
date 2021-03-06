import configureMockStore from 'redux-mock-store';
import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import thunk from 'redux-thunk';
import db from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expensesData[id] = { description, amount, note, createdAt };
  });
  db.ref('expenses')
    .set(expensesData)
    .then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with default values', () => {
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  });
});

test('should add expense to db and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'car',
    amount: 12345,
    note: 'jk, still no car',
    createdAt: 12344
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          ...expenseData,
          id: expect.any(String)
        }
      });
      return db.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('should add expense to db and store with default values', (done) => {
  const store = createMockStore({});
  const defaultExpenseData = {
    description: '',
    amount: 0,
    createdAt: 0,
    note: ''
  };
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          ...defaultExpenseData,
          id: expect.any(String)
        }
      });
      return db.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(defaultExpenseData);
      done();
    });
});

test('should create setExpenses object', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch expenses and make a list', (done) => {
  const store = createMockStore();
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should remove expense from db', (done) => {
  const store = createMockStore();
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });
      return db.ref(`expenses/${id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('should update expense in db and store', (done) => {
  const store = createMockStore({});
  const updates = {
    description: 'bike'
  };

  store
    .dispatch(startEditExpense(expenses[0].id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        updates,
        id: expenses[0].id
      });
      return db.ref(`expenses/${expenses[0].id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val().description).toEqual('bike');
      done();
    });
});
