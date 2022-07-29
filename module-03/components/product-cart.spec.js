import { fireEvent, render, screen } from '@testing-library/react';
import ProductCard from './product-card';

const product = {
  title: 'Classic Watch',
  price: '22.00',
  url: 'https://images.unsplash.com/photo-1516461240763-822a87484851?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
};

const addToCart = jest.fn();

const renderProductCard = () =>
  render(<ProductCard product={product} addToCart={addToCart} />);

describe('ProductCard', () => {
  it('should render ProductCard component', () => {
    renderProductCard();

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('should display proper conter', () => {
    renderProductCard();

    expect(
      screen.getByText(new RegExp(product.title, 'i')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, 'i')),
    ).toBeInTheDocument();

    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.url,
    });
  });

  it('should call prop.addToCart() when button gets clicked', async () => {
    renderProductCard();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
