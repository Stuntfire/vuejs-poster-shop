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
    items: [],
    cart: [],
    newSearch: 'anime',
    lastSearch: '',
    loading: false,
    price: PRICE,
  },
  methods: {
    onSubmit() {
      this.items = [];
      this.loading = true;
      this.$http.get('/search/'
        .concat(this.newSearch))
        .then((res) => {
          this.lastSearch = this.newSearch;
          this.items = res.data;
          this.loading = false;
          // console.log(res.data);
        });
    },
    addItem(index) {
      // console.log(index);
      this.total += 9.99;
      const item = this.items[index];
      let found = false;
      for (let i = 0; i < this.cart.length; i += 1) {
        if (this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qty += 1;
          break;
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
    inc(item) {
      item.qty += 1;
      this.total += PRICE;
    },
    dec(item) {
      item.qty -= 1;
      this.total -= PRICE;
      if (item.qty <= 0) {
        for (let i = 0; i < this.cart.length; i += 1) {
          if (this.cart[i].id === item.id) {
            this.cart.splice(i, 1);
            break;
          }
        }
      }
    },
  },
  filters: {
    currency(price) {
      return '$'.concat(price.toFixed(2));
    },
  },
  mounted: function () {
    this.onSubmit();
  },
});
