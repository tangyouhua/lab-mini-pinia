<script setup>
// import { ref } from 'vue'

import { computed, reactive, toRefs } from 'vue';

// import { useCounterStore } from '../../store/counter';

function useCounterStore() {
  const state = reactive({
    count: 0
  })

  const store = reactive({
    ...toRefs(state),
    doubleCounter: computed(() => state.count * 2),
    inc() {
      state.count++
    },
    $patch(partialStateOrMutator) {
      if (typeof partialStateOrMutator === 'object') {
        Object.keys(partialStateOrMutator).forEach(key => {
          state[key] = partialStateOrMutator[key]
        })
      } else {
        // function 
        partialStateOrMutator(state)
      }
    }
  })
  return store
}

defineProps({
  msg: String,
})

// const count = ref(0)

const counter = useCounterStore()
</script>

<template>
  <h1>{{ counter.count }} - {{ counter.doubleCounter }} </h1>
  <button @click="counter.count++">counter.count++</button>
  <button @click="counter.inc()">counter.inc()</button>
  <button @click="counter.$patch({count: counter.count + 1})">counter.$patch({count: counter.count + 1})</button>
  <button @click="counter.$patch((state) => state.count++)">counter.$patch(state.count++)</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
