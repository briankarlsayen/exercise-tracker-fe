<script lang="ts">
import type { FormRules, FormItemRule } from "naive-ui";
import { ref } from "vue";

interface ModelType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default {
  setup() {
    const fieldRef = ref<ModelType>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const rules: FormRules = {
      firstName: [
        {
          required: true,
          trigger: ["input", "blur"],
        },
      ],
      lastName: [
        {
          required: true,
          trigger: ["input", "blur"],
        },
      ],
      email: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value) return false;
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              return new Error("Invalid email");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      password: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value) return true;
            else if (!/.{8,}/.test(value)) {
              return new Error("Should be 8 characters long");
            } else if (!/(?=.*[a-z])/.test(value)) {
              return new Error("At least 1 lowercase letter");
            } else if (!/(?=.*[A-Z])/.test(value)) {
              return new Error("At least 1 uppercase letter");
            } else if (!/(?=.*\d)/.test(value)) {
              return new Error("At least 1 number");
            } else if (!/(?=.*[!@#$%^&*...])/.test(value)) {
              return new Error("At least 1 special character");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      confirmPassword: [
        {
          required: true,
          trigger: ["input", "blur"],
          validator(rule: FormItemRule, value: string) {
            if (value === fieldRef.value.password) return true;
            return false;
          },
        },
      ],
    };

    const handleSubmit = () => {
      alert("weee!");
    };

    return {
      field: fieldRef,
      rules,
      handleSubmit,
    };
  },
};
</script>
<template>
  <div class="container">
    <div class="form-container">
      <h1>Register</h1>
      <n-form
        ref="formRef"
        :model="field"
        :rules="rules"
        @submit.prevent="handleSubmit"
      >
        <n-form-item path="firstName" label="First Name">
          <n-input
            v-model:value="field.firstName"
            @keydown.enter.prevent
            placeholder="First Name"
          />
        </n-form-item>
        <n-form-item path="lastName" label="Last Name">
          <n-input
            v-model:value="field.lastName"
            @keydown.enter.prevent
            placeholder="Last Name"
          />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input
            v-model:value="field.email"
            @keydown.enter.prevent
            placeholder="Email"
          />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            v-model:value="field.password"
            @keydown.enter.prevent
            placeholder="Password"
          />
        </n-form-item>
        <n-form-item path="confirmPassword" label="Confirm Password">
          <n-input
            v-model:value="field.confirmPassword"
            @keydown.enter.prevent
            placeholder="Confirm Password"
          />
        </n-form-item>
        <div class="btn-container">
          <n-button type="error" sumbit ghost @click="handleSubmit"
            >Cancel</n-button
          >
          <n-button type="info" ghost @click="handleSubmit" attr-type="submit"
            >Submit</n-button
          >
        </div>
      </n-form>
    </div>
  </div>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  width: 100%;
  align-items: center;
  height: 100vh;
  justify-content: center;
}
.form-container {
  width: 500px;
  border-width: 2px;
  border-style: solid;
  padding: 1rem;
}

.btn-container {
  display: flex;
  justify-content: space-between;
}
</style>
