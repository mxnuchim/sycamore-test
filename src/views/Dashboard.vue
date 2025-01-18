<template>
  <div class="flex justify-center flex-wrap px-4 bg-white min-h-screen">
    <!-- Left Section: Form and Table -->
    <div class="w-full lg:w-3/5 pr-4">
      <!-- Add Customer Button -->
      <div class="mb-4">
        <button
          @click="toggleForm"
          class="bg-black hover:bg-gray-800 text-white font-medium text-sm py-2 px-6 rounded-full"
        >
          {{ showForm ? "Close Form" : "Add Customer" }}
        </button>
      </div>

      <!-- Animated Form -->
      <div
        class="overflow-hidden transition-all duration-300 ease-in-out"
        :style="{
          maxHeight: showForm ? '1000px' : '0px',
          opacity: showForm ? '1' : '0',
        }"
      >
        <CustomerForm @customer-added="handleCustomerAdded" />
      </div>

      <div class="mt-6">
        <CustomerList />
      </div>
    </div>

    <!-- Right Section: About Info -->
    <ProfileCard />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import CustomerForm from "../components/CustomerForm.vue";
import CustomerList from "@/components/CustomerList.vue";
import ProfileCard from "@/components/ProfileCard.vue";

export default {
  components: { CustomerForm, CustomerList, ProfileCard },
  setup() {
    const showForm = ref(false);

    const toggleForm = () => {
      showForm.value = !showForm.value;
    };

    const handleCustomerAdded = () => {
      showForm.value = false; // Close form after successful submission
    };

    return {
      showForm,
      toggleForm,
      handleCustomerAdded,
    };
  },
};
</script>
