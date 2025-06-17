<script lang="ts">
import { Subtract12Filled } from "@vicons/fluent";
import type { FormRules, FormItemRule } from "naive-ui";
import { computed, defineComponent, onMounted, ref } from "vue";
import CustomButton from "./CustomButton.vue";
import { createExercise, getCategories } from "../api/api";

interface ModelType {
  name: string;
  intensity?: number;
  duration?: number;
  category?: number;
}

export default defineComponent({
  name: "ExerciseForm",
  components: {
    Subtract12Filled,
    CustomButton,
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
    date: String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const show = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    });
    const loading = ref(false);
    const categoryList = ref([]);
    const errorMsg = ref();

    const handleClose = () => {
      emit("update:modelValue", false);
    };

    const field = ref<ModelType>({
      name: "",
    });

    const fieldRef = ref();

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
      category: [
        {
          required: true,
          trigger: ["change", "blur"],
          type: "number",
        },
      ],
    };

    // TODO reload get api
    const handleSubmit = async () => {
      try {
        loading.value = true;

        const exerciseFields = {
          ...field?.value,
          created_at: props.date ?? "",
        };

        await fieldRef.value?.validate((errors: any) => {
          if (errors) {
            return errors;
          }
        });

        const createExerciseRes = await createExercise(exerciseFields);
        loading.value = false;
        if (createExerciseRes?.success) {
          return clearForm();
        }
        return (errorMsg.value = "Error encountered, Please try again");
      } catch (error) {
        loading.value = false;
        console.log("create exercise err", error);
      }
    };

    const clearForm = () => {
      field.value = {
        name: "",
      };
      fieldRef.value = null;
      handleClose();
    };

    onMounted(async () => {
      try {
        const res = await getCategories();
        if (res?.success && res?.data) {
          categoryList.value = res?.data?.map((category: any) => {
            return {
              label: category?.name,
              value: category?.id,
            };
          });
        }
        console.log("get categories", res);
      } catch (error) {
        console.log("error get categories", error);
      }
    });

    return {
      show,
      field,
      fieldRef,
      rules,
      handleClose,
      handleSubmit,
      loading,
      categoryList,
      errorMsg,
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
        ref="fieldRef"
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
        <n-form-item path="category" label="Category">
          <n-select
            v-model:value="field.category"
            :options="categoryList"
            @keydown.enter.prevent
          />
        </n-form-item>
        <p>{{ errorMsg }}</p>
        <div class="btn-container">
          <n-button type="error" sumbit ghost @click="handleClose"
            >Cancel</n-button
          >
          <n-button
            type="info"
            ghost
            attr-type="submit"
            :loading="loading"
            icon-placement="left"
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
  padding-top: 0.5rem;
}
</style>
