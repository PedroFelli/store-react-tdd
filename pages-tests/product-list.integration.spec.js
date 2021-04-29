import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../pages';

import { makeServer } from '../miragejs/server';

const renderProductList = () => {
  render(<ProductList />);
};

describe('ProductList', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should render ProductList ', () => {
    renderProductList();

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  it('should render the ProductList component 10 times', async () => {
    server.createList('product', 10);

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(10);
    });
  });

  it.todo('should render the no product message ');
  it.todo('should render the Search component ');
  it.todo('should render the product list when a search is performed');
  it.todo('should render the error message when promise reject ');
  it.todo('should render the the total quantity of products ');
  it.todo('should render the product (singular) when there is only 1 product ');
});
