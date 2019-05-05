import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary for 3 items', () => {
  const wrapper = shallow(<ExpensesSummary expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary for 0 items', () => {
  const wrapper = shallow(<ExpensesSummary expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});
