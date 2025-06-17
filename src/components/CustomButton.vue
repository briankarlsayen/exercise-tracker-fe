<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "CustomButton",
  props: {
    name: String,
  },
  setup(props) {
    const name = props?.name;
    return {
      name,
      rest: { ...props },
    };
  },
});
</script>
<template>
  <!-- <h1>haha</h1> -->
  <n-button rest>{{ name }}</n-button>
</template>
