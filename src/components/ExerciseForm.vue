<script lang="ts">
import { Subtract12Filled } from "@vicons/fluent";
import type { FormRules, FormItemRule } from "naive-ui";
import { computed, defineComponent, ref } from "vue";

interface ModelType {
  name?: string;
  intensity: number | null;
  duration: number | null;
  date: string | null;
  category?: number;
}

export default defineComponent({
  name: "ExerciseForm",
  components: {
    Subtract12Filled,
  },
  model: {
    prop: "isOpen",
    event: "change",
  },
  props: {
    modelValue: Boolean,
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const show = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    });
    const handleClose = () => {
      emit("update:modelValue", false);
    };

    const fieldRef = ref<ModelType>({
      intensity: null,
      duration: null,
      date: null,
    });

    const rules: FormRules = {
      name: [
        {
          required: true,
          trigger: ["input", "blur"],
        },
      ],
      intensity: [
        {
          validator(rule: FormItemRule, value: string) {
            if (!value) return true;
            else if (!/^\d*$/.test(value)) {
              return new Error("Age should be an integer");
            } else if (Number(value) > 10) {
              return new Error("Age should be >= 10");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      duration: [
        {
          validator(rule: FormItemRule, value: string) {
            if (!value) return true;
            else if (!/^\d*$/.test(value)) {
              return new Error("Age should be an integer");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      date: [
        {
          trigger: ["input", "blur"],
        },
      ],
    };

    const handleSubmit = () => {
      console.log("submit");
      handleClose();
    };

    return {
      show,
      field: fieldRef,
      rules,
      handleClose,
      handleSubmit,
    };
  },
});
</script>
<template>
  <n-modal v-model:show="show">
    <n-card
      style="width: 400px"
      title="Add Exercise"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form
        ref="formRef"
        :model="field"
        :rules="rules"
        @submit.prevent="handleSubmit"
      >
        <n-form-item path="name" label="Name">
          <n-input
            v-model:value="field.name"
            @keydown.enter.prevent
            placeholder="name"
          />
        </n-form-item>
        <n-form-item path="intensity" label="Intensity">
          <n-input
            v-model:value="field.intensity"
            @keydown.enter.prevent
            placeholder="1-10"
          />
        </n-form-item>
        <n-form-item path="duration" label="Duration">
          <n-input
            v-model:value="field.duration"
            @keydown.enter.prevent
            placeholder="minutes"
          />
        </n-form-item>
        <n-form-item path="date" label="Date">
          <n-input
            v-model:value="field.date"
            @keydown.enter.prevent
            placeholder="date"
          />
        </n-form-item>
        <div class="btn-container">
          <n-button type="error" sumbit ghost @click="handleClose"
            >Cancel</n-button
          >
          <n-button type="info" ghost @click="handleSubmit" attr-type="submit"
            >Save</n-button
          >
        </div>
      </n-form>
    </n-card>
  </n-modal>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.btn-container {
  display: flex;
  justify-content: space-between;
}
</style>
