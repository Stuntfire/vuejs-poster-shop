// console.log(Vue);

const PRICE = 9.99;

// instantiate a new Vue instance in the constructor
const vm = new Vue({
// we use the element el: to define an anchor.
// So we can decide where in the DOM Vue should be anchored and displayed.
  el: '#app',
  // we create a simple data-object
  data: {
    // adding a property. This property will be accessible in the DOM.
    total: 0,
    items: [
      { id: 1, title: 'Item 1' },
      { id: 2, title: 'Item 2' },
      { id: 3, title: 'Item 3' },
    ],
    cart: [],
  },
  methods: {
    addItem(index) {
      // console.log(index);
      this.total += 9.99;
      const item = this.items[index];
      let found = false;
      for (let i = 0; i < this.cart.length; i += 1) {
        if (this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qty += 1;
        }
      }
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: PRICE,
        });
      }
    },
  },
  filters: {
    currency(price) {
      return '$'.concat(price.toFixed(2));
    },
  },
});
