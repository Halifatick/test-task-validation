<script setup lang="ts">
import { ref } from 'vue';
import { useValidation } from '@/composables/useValidation';
import type { ValidationSchema } from "@/types/validation.types.ts";

const successMessage = ref('');

const initialValues = {
  name: '',
  email: '',
  password: ''
};

const validationRules: ValidationSchema = {
  name: {
    required: {
      messageError: 'Имя обязательно',
      validator: (value: string) => Boolean(value)
    },
    minLength: {
      messageError: 'Минимальная длина имени 3 символа',
      validator: (value: string) => value.length >= 3
    }
  },
  email: {
    required: {
      messageError: 'Email обязателен',
      validator: (value: string) => Boolean(value)
    },
    email: {
      messageError: 'Некорректный формат email',
      validator: (value: string) => /\S+@\S+\.\S+/.test(value)
    }
  },
  password: {
    required: {
      messageError: 'Пароль обязателен',
      validator: (value: string) => Boolean(value)
    },
    minLength: {
      messageError: 'Минимальная длина пароля 6 символов',
      validator: (value: string) => value.length >= 6
    }
  }
};

const { values, errors, touched, validateForm, resetForm, markTouched, isValid } = useValidation(initialValues, validationRules);

const handleSubmit = (): void => {
  validateForm();

  if (!isValid.value) return;

  successMessage.value = 'Форма успешно отправлена!';
  setTimeout(() => (successMessage.value = ''), 3000);
};
</script>


<template>
  <h2>Задание 1</h2>
  <div>
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="form-group">
        <label for="name">Имя:</label>
        <input id="name" v-model.trim="values.name" @blur="markTouched('name')" type="text"
               :class="{ 'input-error': touched.name && errors.name.length }"
               :aria-invalid="touched.name && errors.name.length ? 'true' : 'false'"
               aria-describedby="error-name" autocomplete="name" />
        <ul v-if="touched.name && errors.name.length" class="error-list" id="error-name">
          <li v-for="(error, index) in errors.name" :key="index">{{ error }}</li>
        </ul>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model.trim="values.email" @blur="markTouched('email')" type="email"
               :class="{ 'input-error': touched.email && errors.email.length }"
               :aria-invalid="touched.email && errors.email.length ? 'true' : 'false'"
               aria-describedby="error-email" autocomplete="email" />
        <ul v-if="touched.email && errors.email.length" class="error-list" id="error-email">
          <li v-for="(error, index) in errors.email" :key="index">{{ error }}</li>
        </ul>
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <input id="password" v-model="values.password" @blur="markTouched('password')" type="password"
               :class="{ 'input-error': touched.password && errors.password.length }"
               :aria-invalid="touched.password && errors.password.length ? 'true' : 'false'"
               aria-describedby="error-password" autocomplete="new-password" />
        <ul v-if="touched.password && errors.password.length" class="error-list" id="error-password">
          <li v-for="(error, index) in errors.password" :key="index">{{ error }}</li>
        </ul>
      </div>

      <button type="submit" class="btn submit-btn" @click="handleSubmit">Отправить</button>
      <button type="button" @click="resetForm" class="btn reset-btn">Сбросить</button>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.input-error {
  border-color: red;
  background-color: #ffe5e5;
}

.error-list {
  color: red;
  font-size: 12px;
  margin: 5px 0 0;
  padding-left: 15px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
}

.submit-btn {
  background-color: #28a745;
  color: white;
}

.reset-btn {
  background-color: #dc3545;
  color: white;
}

.success-message {
  color: green;
  font-size: 14px;
  margin-top: 10px;
  font-weight: bold;
}
</style>
