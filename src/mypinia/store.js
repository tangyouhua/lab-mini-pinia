import { computed, reactive, toRefs } from "vue";

const stores = new Map();

export function defineStore(id, options) {
  const { state: stateFn, getters, actions } = options;

  const state = reactive(stateFn());

  function useStore() {
    // create a store if not exists
    if (!stores.has(id)) {
      stores.set(
        id,
        reactive({
          ...toRefs(state),
          ...Object.keys(getters || {}).reduce((computedGetters, name) => {
            computedGetters[name] = computed(() => {
              return getters[name].call(store, store);
            });
            return computedGetters;
          }, {}),
          ...Object.keys(actions || {}).reduce((wrapActions, actionName) => {
            // todo: add try-catch
            // todo: add action listener
            wrapActions[name] = () => actions[acitonName].call(store);
            return wrapActions;
          }, {}),
          doubleCounter: computed(() => state.count * 2),
          inc() {
            state.count++;
          },
          $patch(partialStateOrMutator) {
            if (typeof partialStateOrMutator === "object") {
              Object.keys(partialStateOrMutator).forEach((key) => {
                state[key] = partialStateOrMutator[key];
              });
            } else {
              // function
              partialStateOrMutator(state);
            }
          },
        })
      );
    }
    const store = stores.get(id);
    return store;
  }
  return useStore;
}
