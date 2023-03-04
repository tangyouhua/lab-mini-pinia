import { defineStore } from "../src/mypinia/store";

export const useCounterStore = defineStore({
  state() {
    return {
      count: 1,
    };
  },
  getters: {
    doubleCounter(state) {
      console.log(state);
      return state.count * 2;
    },
  },
  actions: {
    inc() {
      console.log(this);
      this.count++;
    },
  },
});
