import create from 'zustand';
import produce from 'immer';

const initialState = {
  open: false,
  products: [],
  total: 0,
};

export const useCartStore = create((set) => {
  const setState = (fn) => set(produce(fn));

  return {
    state: {
      ...initialState,
    },

    actions: {
      toggle() {
        setState(
          produce(({ state }) => {
            state.open = !state.open;
          }),
        );
      },

      reset() {
        setState((store) => {
          store.state = initialState;
        });
      },

      add(product) {
        setState(({ state }) => {
          const doesnExist = !state.products.find(
            ({ id }) => id === product.id,
          );

          if (doesnExist) {
            if (!product.quantity) {
              product.quantity = 1;
            }

            state.total += parseFloat(product.price);
            state.products.push(product);
            state.open = true;
          }
        });
      },

      increase(product) {
        setState(({ state }) => {
          const localProduct = state.products.find(
            ({ id }) => id === product.id,
          );

          if (localProduct) {
            localProduct.quantity++;
            state.total += parseFloat(localProduct.price);
          }
        });
      },

      decrease(product) {
        setState(({ state }) => {
          const localProduct = state.products.find(
            ({ id }) => id === product.id,
          );

          if (localProduct && localProduct.quantity > 0) {
            localProduct.quantity--;
            state.total -= parseFloat(localProduct.price);
          }
        });
      },

      remove(product) {
        setState(({ state }) => {
          const exist = !!state.products.find(({ id }) => id === product.id);

          if (exist) {
            state.products = state.products.filter(
              ({ id }) => id !== product.id,
            );
          }
        });
      },

      removeAll() {
        setState(({ state }) => {
          state.products = [];
          state.total = 0;
        });
      },
    },
  };
});
