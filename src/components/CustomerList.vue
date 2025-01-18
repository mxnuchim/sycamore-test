<template>
  <div class="bg-white rounded px-0 md:px-8 pt-0 lg:pt-6 pb-8 max-w-full">
    <div class="w-full flex flex-col items-start mb-4">
      <h3 class="text-base lg:text-xl text-black font-semibold">Customers</h3>
      <h3 class="text-sm lg:text-base text-gray-500 font-normal">
        List of available customers
      </h3>
    </div>
    <div class="flex justify-between items-center mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search customers by name, email, phone, state, or status"
        class="appearance-none border rounded-full w-full py-2 px-4 text-sm text-gray-700 leading-tight h-12"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      <div
        v-for="customer in filteredCustomers"
        :key="customer.id"
        class="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col justify-between"
      >
        <div>
          <h2 class="text-lg font-medium text-gray-800 mb-2">
            {{ customer.firstName }} {{ customer.lastName }}
          </h2>
          <p class="text-gray-600 mb-1 text-sm">Email: {{ customer.email }}</p>
          <p class="text-gray-600 mb-1 text-sm">Phone: {{ customer.phone }}</p>
          <p class="text-gray-600 mb-1 text-sm">State: {{ customer.state }}</p>
        </div>
        <div class="flex justify-between items-center mt-4">
          <span
            :class="
              customer.isActive
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            "
            class="px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ customer.isActive ? "Active" : "Inactive" }}
          </span>
          <button
            @click="deleteCustomer(customer.id)"
            class="bg-red-500 text-white px-5 py-1 rounded-full text-sm hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useCustomerStore } from "../stores/customer.ts";

export default {
  setup() {
    const customerStore = useCustomerStore();
    const searchQuery = ref("");

    const filteredCustomers = computed(() =>
      searchQuery.value
        ? customerStore.searchCustomers(searchQuery.value)
        : customerStore.customers
    );

    const deleteCustomer = (id: string) => {
      if (confirm("Are you sure you want to delete this customer?")) {
        customerStore.deleteCustomer(id);
      }
    };

    return { searchQuery, filteredCustomers, deleteCustomer };
  },
};
</script>

<style scoped>
/**** Tailwind-based styles ensure the layout is modern and clean ****/
</style>
