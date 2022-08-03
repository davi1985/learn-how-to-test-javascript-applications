import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useCartStore } from '../store/cart';
import CartItem from './cart-item';
import { setAutoFreeze } from 'immer';

setAutoFreeze(false);

const product = {
  title: 'Classic Watch',
  price: '22.00',
  image:
    'https://images.unsplash.com/photo-1516461240763-822a87484851?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
};

const renderCartItem = () => render(<CartItem product={product} />);

describe('CartItem', () => {
  let result;

  beforeEach(() => {
    result = renderHook(() => useCartStore()).result;
  });

  it('should render CartItem component', () => {
    renderCartItem();

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should display proper conter', () => {
    renderCartItem();

    expect(
      screen.getByText(new RegExp(product.title, 'i')),
    ).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(product.price, 'i')),
    ).toBeInTheDocument();

    expect(screen.getByTestId('image')).toHaveProperty('src', product.image);

    expect(screen.getByTestId('image')).toHaveProperty('alt', product.title);
  });

  it('should call remove() when remove button is clicked', async () => {
    const spy = jest.spyOn(result.current.actions, 'remove');

    renderCartItem();

    const button = screen.getByRole('button', { name: /remove/i });

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });

  it('should call increase() when increase button is clicked', async () => {
    const spy = jest.spyOn(result.current.actions, 'increase');

    renderCartItem();

    const button = screen.getByTestId('increase');

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });

  it('should call decrease() when increase button is clicked', async () => {
    const spy = jest.spyOn(result.current.actions, 'increase');

    renderCartItem();

    const button = screen.getByTestId('decrease');

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });
});
