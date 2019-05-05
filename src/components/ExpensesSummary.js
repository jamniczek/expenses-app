import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expensesTotal';
import numeral from 'numeral';

export const ExpensesSummary = ({ expenses }) => (
  <div>
    <h3>
      Viewing {expenses.length} expenses totalling{' '}
      {numeral(selectExpensesTotal(expenses) / 100).format('0.00')} PLN
    </h3>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
