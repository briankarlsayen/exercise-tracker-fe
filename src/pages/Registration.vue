<script lang="ts">
import type { FormRules, FormItemRule } from "naive-ui";
import { ref } from "vue";
import { registerApi } from "../api/api";

interface ModelType {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default {
  setup() {
    const field = ref<ModelType>({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const loading = ref(false);
    const errorMsg = ref();
    const successMsg = ref(false);

    const fieldRef = ref();

    const rules: FormRules = {
      firstName: [
        {
          required: true,
          trigger: ["input", "blur"],

          renderMessage() {
            return "first name is required";
          },
        },
      ],
      lastName: [
        {
          required: true,
          trigger: ["input", "blur"],
          renderMessage() {
            return "last name is required";
          },
        },
      ],
      username: [
        {
          required: true,
          trigger: ["input", "blur"],
        },
      ],
      email: [
        {
          required: true,
          validator(_rule: FormItemRule, value: string) {
            if (!value) return new Error("email is required");
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
          validator(_rule: FormItemRule, value: string) {
            if (!value) return new Error("password is required");
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
          validator(_rule: FormItemRule, value: string) {
            if (!value) return new Error("Confirm password is required");
            else if (value === field.value.password) return true;
            return new Error("Should be the same with password");
          },
        },
      ],
    };

    const handleSubmit = async () => {
      try {
        loading.value = true;
        await fieldRef.value?.validate((errors: any) => {
          if (errors) {
            return errors;
          }
        });

        const formVal = {
          ...field.value,
          first_name: field.value.firstName,
          last_name: field.value.lastName,
        };
        const res = await registerApi(formVal);
        loading.value = false;
        if (res?.success) {
          errorMsg.value = null;
          successMsg.value = true;
          return clearForm();
        } else if (res?.non_field_errors?.[0]) {
          return (errorMsg.value = res?.non_field_errors?.[0]);
        } else if (res?.username) {
          return (errorMsg.value = res?.username?.[0]);
        } else if (res?.[0]) {
          return (errorMsg.value = res?.[0]);
        }

        return (errorMsg.value = "Error encountered, Please try again");
      } catch (error) {
        loading.value = false;
      }
    };
    const clearMessages = () => {
      errorMsg.value = null;
      successMsg.value = false;
    };
    const clearForm = () => {
      field.value = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

      fieldRef.value = null;
    };

    return {
      fieldRef,
      field,
      rules,
      handleSubmit,
      loading,
      errorMsg,
      successMsg,
      clearMessages,
    };
  },
};
</script>
<template>
  <div class="container">
    <div class="form-container">
      <h2>Register</h2>
      <br />
      <n-form
        ref="fieldRef"
        :model="field"
        :rules="rules"
        @submit.prevent="handleSubmit"
      >
        <n-form-item path="firstName" label="First Name">
          <n-input
            v-model:value="field.firstName"
            @keydown.enter.prevent
            placeholder="First Name"
            :on-input="clearMessages"
          />
        </n-form-item>
        <n-form-item path="lastName" label="Last Name">
          <n-input
            v-model:value="field.lastName"
            @keydown.enter.prevent
            placeholder="Last Name"
            :on-input="clearMessages"
          />
        </n-form-item>
        <n-form-item path="username" label="Username">
          <n-input
            v-model:value="field.username"
            @keydown.enter.prevent
            placeholder="Username"
            :on-input="clearMessages"
          />
        </n-form-item>
        <n-form-item path="email" label="Email">
          <n-input
            v-model:value="field.email"
            @keydown.enter.prevent
            placeholder="Email"
            :on-input="clearMessages"
          />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input
            v-model:value="field.password"
            @keydown.enter.prevent
            placeholder="Password"
            type="password"
            show-password-on="click"
            :on-input="clearMessages"
          />
        </n-form-item>
        <n-form-item path="confirmPassword" label="Confirm Password">
          <n-input
            v-model:value="field.confirmPassword"
            @keydown.enter.prevent
            placeholder="Confirm Password"
            type="password"
            show-password-on="click"
            :on-input="clearMessages"
          />
        </n-form-item>
        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>
        <p v-else-if="successMsg" class="success-text">
          Account Successfully created
        </p>
        <div class="btn-container">
          <n-button
            type="info"
            attr-type="submit"
            :loading="loading"
            icon-placement="left"
            >Submit</n-button
          >
        </div>

        <div style="padding-top: 0.5rem">
          <p>
            You have an acount?
            <RouterLink to="/login">Login</RouterLink>
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
  padding-left: 1rem;
  padding-right: 1rem;
}
.form-container {
  width: 500px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
}
.btn-container {
  padding-top: 0.5rem;

  display: flex;
  flex-direction: column;
}
</style>
