export default {
  routes: [
    {
     method: 'POST',
     path: '/buy',
     handler: 'balance.buyProduct',
    },
    {
      method: 'POST',
      path: '/credit',
      handler: 'balance.creditAccount',
     },
  ],
};
