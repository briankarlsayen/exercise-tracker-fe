<script lang="ts">
import { type FormRules, type FormItemRule } from "naive-ui";
import { ref } from "vue";
import { loginApi } from "../api/api";
import { useRouter } from "vue-router";

interface ModelType {
  username: string;
  password: string;
}

export default {
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const errorMsg = ref();
    const field = ref<ModelType>({
      username: "",
      password: "",
    });

    const fieldRef = ref();

    const rules: FormRules = {
      username: [
        {
          required: true,
          trigger: ["input", "blur"],
        },
      ],
      password: [
        {
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
          required: true,

          trigger: ["input", "blur"],
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
        const res = await loginApi(field.value);
        loading.value = false;
        if (res?.success) {
          errorMsg.value = null;
          localStorage.setItem("auth", res?.data?.auth_token);
          return router.push("/app/");
        } else if (res?.non_field_errors[0]) {
          return (errorMsg.value = res?.non_field_errors[0]);
        }
        return (errorMsg.value = "Error encountered, Please try again");
      } catch (error) {
        loading.value = false;
      }
    };

    return {
      loading,
      field,
      fieldRef,
      rules,
      handleSubmit,
      errorMsg,
    };
  },
};
</script>
<template>
  <div class="container">
    <div class="form-container">
      <h2>Login</h2>
      <br />
      <n-form
        ref="fieldRef"
        :model="field"
        :rules="rules"
        @submit.prevent="handleSubmit"
      >
        <n-form-item path="username" label="Username">
          <n-input
            v-model:value="field.username"
            @keydown.enter.prevent
            placeholder="Username"
            :on-input="() => (errorMsg = null)"
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
        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>
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
          <n-button
            type="info"
            @click="handleSubmit"
            attr-type="submit"
            :loading="loading"
            :disabled="!field.password || !field?.username || !!errorMsg"
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
