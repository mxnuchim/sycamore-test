<template>
  <div class="w-full flex flex-col items-start px-8 my-4">
    <h3 class="text-base lg:text-xl text-black font-semibold">New customer</h3>
    <h3 class="text-sm lg:text-base text-gray-500 font-normal">
      Add a new customer to the list
    </h3>
  </div>
  <form
    @submit.prevent="handleSubmit"
    class="bg-white rounded px-8 pt-6 pb-8 mb-4 w-full"
  >
    <div class="mb-4">
      <label
        class="block text-gray-700 text-sm font-medium mb-2"
        for="firstName"
      >
        First Name
      </label>
      <input
        id="firstName"
        v-model="customer.firstName"
        type="text"
        placeholder="Enter first name"
        @blur="touchField('firstName')"
        class="appearance-none border h-10 rounded-full w-full py-2 px-4 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
        :class="{ 'border-red-500': errors.firstName }"
      />
      <p v-if="errors.firstName" class="text-red-500 text-xs italic mt-1">
        First name is required.
      </p>
    </div>

    <div class="mb-4">
      <label
        class="block text-gray-700 text-sm font-medium mb-2"
        for="lastName"
      >
        Last Name
      </label>
      <input
        id="lastName"
        v-model="customer.lastName"
        type="text"
        placeholder="Enter last name"
        @blur="touchField('lastName')"
        class="appearance-none border rounded-full h-10 text-sm w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        :class="{ 'border-red-500': errors.lastName }"
      />
      <p v-if="errors.lastName" class="text-red-500 text-xs italic mt-1">
        Last name is required.
      </p>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2" for="email">
        Email
      </label>
      <input
        id="email"
        v-model="customer.email"
        type="email"
        placeholder="Enter email"
        @blur="touchField('email')"
        class="appearance-none border rounded-full h-10 text-sm w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        :class="{ 'border-red-500': errors.email }"
      />
      <p v-if="errors.email" class="text-red-500 text-xs italic mt-1">
        Email is required.
      </p>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2" for="phone">
        Phone Number
      </label>
      <input
        id="phone"
        v-model="customer.phone"
        type="tel"
        placeholder="Enter phone number"
        @blur="touchField('phone')"
        class="appearance-none border rounded-full h-10 text-sm w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        :class="{ 'border-red-500': errors.phone }"
      />
      <p v-if="errors.phone" class="text-red-500 text-xs italic mt-1">
        Phone number is required.
      </p>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2" for="state">
        State
      </label>
      <select
        id="state"
        v-model="customer.state"
        @blur="touchField('state')"
        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 h-10 rounded-full text-sm leading-tight focus:outline-none focus:shadow-outline"
        :class="{ 'border-red-500': errors.state }"
      >
        <option value="" disabled>Select a state</option>
        <option v-for="state in states" :key="state" :value="state">
          {{ state }}
        </option>
      </select>
      <p v-if="errors.state" class="text-red-500 text-xs italic mt-1">
        State is required.
      </p>
    </div>

    <div class="mb-4">
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="customer.isActive"
          class="form-checkbox h-5 w-5 text-black"
        />
        <span class="ml-2 text-sm text-gray-700">Active</span>
      </label>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2">
        Additional Details
      </label>
      <QuillEditor v-model="customer.details" class="border rounded-md" />
    </div>

    <div class="flex items-center justify-end">
      <button
        type="submit"
        :disabled="!isValid"
        class="bg-black text-white text-sm font-medium py-2 px-8 rounded-full h-10 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, computed, watch } from "vue";
import { useCustomerStore } from "../stores/customer.ts";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  isActive: boolean;
  details: string;
}

type FormFields = "firstName" | "lastName" | "email" | "phone" | "state";

type FieldStatus = {
  [K in FormFields]: boolean;
};

export default {
  components: { QuillEditor },
  emits: ["customer-added"],

  setup(props, { emit }) {
    const customerStore = useCustomerStore();
    const customer = ref<CustomerData>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      state: "",
      isActive: false,
      details: "",
    });

    const errors = ref<FieldStatus>({
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      state: false,
    });

    const touched = ref<FieldStatus>({
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      state: false,
    });

    const states = [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara",
      "Abuja (FCT)",
    ];

    const validateField = (field: FormFields) => {
      if (touched.value[field]) {
        errors.value[field] = !customer.value[field];
      }
    };

    const touchField = (field: FormFields) => {
      touched.value[field] = true;
      validateField(field);
    };

    watch(
      customer,
      (newVal) => {
        (Object.keys(touched.value) as FormFields[]).forEach((field) => {
          if (touched.value[field]) {
            validateField(field);
          }
        });
      },
      { deep: true }
    );

    const isValid = computed(() => {
      return (
        customer.value.firstName &&
        customer.value.lastName &&
        customer.value.email &&
        customer.value.phone &&
        customer.value.state
      );
    });

    const handleSubmit = () => {
      // Mark all fields as touched
      (Object.keys(touched.value) as FormFields[]).forEach((field) => {
        touched.value[field] = true;
        validateField(field);
      });

      if (isValid.value) {
        customerStore.addCustomer({ ...customer.value });
        // Reset form
        customer.value = {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          state: "",
          isActive: false,
          details: "",
        };
        // Reset touched and errors
        (Object.keys(touched.value) as FormFields[]).forEach((field) => {
          touched.value[field] = false;
          errors.value[field] = false;
        });

        emit("customer-added");
      }
    };

    return {
      customer,
      states,
      isValid,
      handleSubmit,
      errors,
      touchField,
    };
  },
};
</script>
