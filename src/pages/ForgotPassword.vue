<script lang="ts">
import { PresenceAvailable10Regular } from "@vicons/fluent";
import type { FormRules, FormItemRule } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";

interface ModelType {
  email: string;
  password: string;
}

export default {
  setup() {
    const router = useRouter();
    const fieldRef = ref<ModelType>({
      email: "",
      password: "",
    });
    const showFPForm = ref(true);

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
    };

    const handleSubmit = () => {
      // TODO handle forgot password api
      showFPForm.value = false;
    };

    const goToLogin = () => {
      router.push("/login");
    };

    return {
      field: fieldRef,
      rules,
      handleSubmit,
      showFPForm,
      goToLogin,
    };
  },
  components: {
    PresenceAvailable10Regular,
  },
};
</script>
<template>
  <div class="container">
    <div class="form-container">
      <h1>Forgot Password</h1>
      <br />
      <n-form
        v-if="showFPForm"
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

        <div class="btn-container">
          <n-button type="info" @click="handleSubmit" attr-type="submit"
            >Submit</n-button
          >
        </div>
        <div style="padding-top: 0.5rem">
          <p>
            Remembered your password?
            <RouterLink to="/login">Login</RouterLink>
          </p>
        </div>
      </n-form>
      <div
        v-else
        style="
          display: flex;
          align-items: center;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        "
      >
        <div class="logo">
          <PresenceAvailable10Regular />
        </div>
        <!-- <br /> -->
        <p style="text-align: center">
          Request has been submitted. Please check your email.
        </p>
        <br />
        <br />
        <div class="btn-container">
          <n-button type="info" @click="goToLogin" attr-type="submit"
            >Back to login</n-button
          >
        </div>
      </div>
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
  width: 100%;
}

.logo {
  height: 70px;
  width: 70px;
  flex: 1;
  align-items: center;
  align-content: center;
}
</style>
