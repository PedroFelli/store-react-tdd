import { act, renderHook } from '@testing-library/react-hooks';
import { useCartStore } from './';
import { makeServer } from '../miragejs/server';

describe('Cart Store', () => {
  let server;
  let result;
  let add;
  let toggle;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
    add = result.current.actions.add;
    toggle = result.current.actions.toggle;
  });

  afterEach(() => {
    server.shutdown();
    act(() => result.current.actions.reset());
  });

  it('should return open equals false on initial state', async () => {
    expect(result.current.state.open).toBe(false);
  });

  it('shoud  return an empty array for products on initial state', () => {
    expect(result.current.state.products).toHaveLength(0);
    expect(Array.isArray(result.current.state.products)).toBe(true);
  });

  it('shoud  add 2 products to the cart', async () => {
    const products = server.createList('product', 2);

    const {
      actions: { add },
    } = result.current;

    for (const product of products) {
      act(() => add(product));
    }

    expect(result.current.state.products).toHaveLength(2);
  });

  it('should toggle open state', async () => {
    const {
      actions: { toggle },
    } = result.current;

    expect(result.current.state.open).toBe(false);

    act(() => toggle());
    expect(result.current.state.open).toBe(true);

    act(() => toggle());
    expect(result.current.state.open).toBe(false);
  });
});
