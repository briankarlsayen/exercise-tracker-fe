<script lang="ts">
import { Subtract12Filled } from "@vicons/fluent";
import type { FormRules, FormItemRule } from "naive-ui";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { createExercise, getCategories, updateExercise } from "../api/api";
import { useExerciseStore, type IExercise } from "../stores/exerciseStore";

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
    date: String,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const store = useExerciseStore();
    const show = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    });

    const exerciseDate = computed(() => store.date);

    const loading = ref(false);
    const categoryList = ref([]);
    const errorMsg = ref();

    const handleClose = () => {
      emit("update:modelValue", false);
      loading.value = false;
    };

    const field = ref<IExercise>({
      id: 0,
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
          validator(_: FormItemRule, value: string) {
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
          validator(_: FormItemRule, value: string) {
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
          category: Number(field.value.category),
          created_at: props.date ?? "",
        };

        await fieldRef.value?.validate((errors: any) => {
          if (errors) {
            return errors;
          }
        });

        if (store.form.type === "add") {
          const createExerciseRes = await createExercise(exerciseFields);

          const formDate = new Date(exerciseDate?.value);
          const month = formDate.getMonth() + 1;
          const year = formDate.getFullYear();
          if (createExerciseRes?.success) {
            await store.fetchExercises(exerciseDate.value);
            await store.fetchCalendarExercises({ month, year });
            await store.fetchExerciseStats();

            return clearForm();
          }
        } else {
          const createExerciseRes = await updateExercise(exerciseFields);
          if (createExerciseRes?.success) {
            await store.fetchExercises(exerciseDate.value);
            return clearForm();
          }
        }

        return (errorMsg.value = "Error encountered, Please try again");
      } catch (error) {
        loading.value = false;
        console.log("create exercise err", error);
      }
    };

    const clearForm = () => {
      field.value = {
        id: 0,
        name: "",
      };
      fieldRef.value = null;
      store.clearForm();
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
      } catch (error) {
        console.log("error get categories", error);
      }
    });

    watch(props, () => {
      if (store.form.type === "edit") {
        field.value = store?.form.field;
      }
    });

    const getCardName = () => {
      return store?.form?.type === "add" ? "Add Exercise" : "Edit Exercise";
    };

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
      getCardName,
      clearForm,
    };
  },
});
</script>
<template>
  <n-modal v-model:show="show" :on-after-leave="clearForm" style="width: 100px">
    <n-card
      style="width: 90%; max-width: 400px"
      :title="getCardName()"
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
            attr-type="submit"
            :loading="loading"
            icon-placement="right"
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
