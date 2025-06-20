<script lang="ts">
import { Delete20Filled, Edit20Filled } from "@vicons/fluent";
import { defineComponent, ref, type PropType } from "vue";
import { useExerciseStore, type IExercise } from "../stores/exerciseStore";
import { useDialog } from "naive-ui";
import { deleteExercise } from "../api/api";
import { formatDate } from "../utils";

export default defineComponent({
  name: "ExerciseCard",
  components: {
    Edit20Filled,
    Delete20Filled,
  },
  model: {
    prop: "isOpen",
    event: "change",
  },
  emits: ["update:modelValue"],
  props: {
    exercise: {
      type: {} as PropType<IExercise>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const storeExercise = useExerciseStore();
    const showModal = ref(false);
    const handleEdit = () => {
      storeExercise.editExercise({ ...props.exercise });
      emit("update:modelValue", true);
    };

    const dialog = useDialog();
    const handleDelete = async () => {
      try {
        const res = await deleteExercise(props?.exercise?.id);
        if (res?.success) {
          const currDate = formatDate(new Date());
          storeExercise.fetchExercises(currDate);
          return;
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    return {
      handleEdit,
      handleDelete,
      showModal,
      openModal() {
        // showModal.value = true;
        dialog.warning({
          title: "Delete Exercise",
          content: () => "Are you sure",
          // action: () => "Action",
          negativeText: "Cancel",
          onNegativeClick: () => {
            console.log("cancel");
          },
          positiveText: "Confirm",
          onPositiveClick: () => {
            handleDelete();
          },
        });
      },
    };
  },
});
</script>

<template>
  <div class="card">
    <!-- <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      preset="dialog"
      title="Delete exercise"
      content="Are you sure?"
      positive-text="Confirm"
      negative-text="Cancel"
      @positive-click="handleDelete"
      @negative-click="closeModal"
    /> -->
    <!-- <n-dialog-provider>
      <content />
    </n-dialog-provider> -->
    <div class="card-content">
      <h4>{{ exercise?.name }}</h4>
      <p><span>Intensity: </span> {{ exercise?.intensity }}</p>
      <p><span>Duration: </span> {{ exercise?.duration }} minutes</p>
    </div>
    <div class="btn-container">
      <n-button class="btn" type="warning" @click="handleEdit">
        <n-icon size="18">
          <Edit20Filled />
        </n-icon>
      </n-button>
      <n-button class="btn" type="error" @click="openModal">
        <n-icon size="18">
          <Delete20Filled />
        </n-icon>
      </n-button>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  padding-top: 1rem;
  padding-bottom: 1rem;
  justify-content: space-between;
}
.card-content {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}
.btn-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.btn {
  padding: 5px;
  width: 36px;
  height: 36px;
}
</style>
