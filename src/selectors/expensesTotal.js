export default (expenses) => {
  return expenses.reduce((total, { amount }) => {
    return total + amount;
  }, 0);
};
