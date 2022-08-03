export const formatPrice = (price) =>
  new Intl.NumberFormat('us', { currency: 'USD', style: 'currency' }).format(
    price,
  );
