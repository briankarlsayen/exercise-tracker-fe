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
  <n-button rest>{{ name }}</n-button>
</template>
