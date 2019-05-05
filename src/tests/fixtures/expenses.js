import moment from 'moment';
export default [
  {
    id: '1',
    description: 'gum',
    note: 'mint flavour and stuff',
    amount: 195,
    createdAt: 0
  },
  {
    id: '2',
    description: 'rent',
    note: '',
    amount: 230000,
    createdAt: moment(0)
      .subtract(5, 'days')
      .valueOf()
  },
  {
    id: '3',
    description: 'gas',
    note: "I dont't even have a car, lul",
    amount: 0,
    createdAt: moment(0)
      .add(5, 'days')
      .valueOf()
  }
];
