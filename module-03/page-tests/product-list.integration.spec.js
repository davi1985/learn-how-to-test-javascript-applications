import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '../pages/index';
import { makeServer } from '../miragejs/server';
import Response from 'miragejs';
import userEvent from '@testing-library/user-event';

const renderPage = () => render(<Home />);

describe('Home', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should render product list', () => {
    renderPage();

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  it('should render the ProductCard component 10 times', async () => {
    server.createList('product', 10);
    renderPage();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(10);
    });
  });

  it('should render the "no products message"', async () => {
    renderPage();

    await waitFor(() =>
      expect(screen.getByTestId('no-products')).toBeInTheDocument(),
    );
  });

  it('should display error message when promise rejects', async () => {
    server.get('products', () => {
      return new Response(500, {}, '');
    });

    renderPage();

    await waitFor(() => {
      expect(screen.queryByTestId('server-error')).toBeInTheDocument();

      expect(screen.queryByTestId('no-products')).toBeNull();
      expect(screen.queryAllByTestId('product-card')).toHaveLength(0);
    });
  });

  it('should filter the product list when a search is performed', async () => {
    const searchTerm = 'Beautiful Clock';
    server.createList('product', 2);

    server.create('product', {
      title: searchTerm,
    });

    renderPage();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(3);
    });

    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, searchTerm);
    await fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(1);
    });
  });

  it('should display the total quantity of products', async () => {
    server.createList('product', 10);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/10 Products/i)).toBeInTheDocument();
    });
  });

  it('should display product (singular) when there is only 1 product', async () => {
    server.create('product', 1);

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/1 Product$/i)).toBeInTheDocument();
    });
  });

  it('should display proper quantity when list is filtered', async () => {
    const searchTerm = 'Beautiful Clock';
    server.createList('product', 2);

    server.create('product', {
      title: searchTerm,
    });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText(/3 Products/i)).toBeInTheDocument();
    });

    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, searchTerm);
    await fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/1 Product$/i)).toBeInTheDocument();
    });
  });
});
