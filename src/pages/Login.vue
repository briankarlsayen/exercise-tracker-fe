<script lang="ts">
import type { FormRules, FormItemRule } from "naive-ui";
import { ref } from "vue";

interface ModelType {
  email: string;
  password: string;
}

export default {
  setup() {
    const fieldRef = ref<ModelType>({
      email: "",
      password: "",
    });

    const rules: FormRules = {
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
    };

    const handleSubmit = () => {
      // TODO handle login api
      console.log("form", fieldRef.value);
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
      <h1>Login</h1>
      <br />
      <n-form
        ref="formRef"
        :model="field"
        :rules="rules"
        @submit.prevent="handleSubmit"
      >
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
            type="password"
            show-password-on="click"
          />
        </n-form-item>
        <div
          style="
            display: flex;
            flex-direction: row-reverse;
            padding-bottom: 1rem;
          "
        >
          <p>
            <RouterLink to="/forgot-password">Forgot Password?</RouterLink>
          </p>
        </div>
        <div class="btn-container">
          <n-button type="info" @click="handleSubmit" attr-type="submit"
            >Submit</n-button
          >
        </div>
        <div style="padding-top: 0.5rem">
          <p>
            You don't have an acount?
            <RouterLink to="/register">Register</RouterLink>
          </p>
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
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
}
.btn-container {
  display: flex;
  flex-direction: column;
}
</style>
