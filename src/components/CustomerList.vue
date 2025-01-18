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
        <div class="w-full flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-800 mb-2">
            {{ customer.firstName }} {{ customer.lastName }}
          </h2>

          <div class="relative">
            <button
              @click="toggleDropdown(customer.id)"
              class="text-black font-bold pb-6"
            >
              . . .
            </button>
            <div
              v-if="dropdownOpen === customer.id"
              class="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10"
            >
              <button
                @click="openEditModal(customer)"
                class="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
              >
                Edit
              </button>
              <button
                @click="deleteCustomer(customer.id)"
                class="block px-4 py-2 text-left text-red-700 hover:bg-gray-100 w-full"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div>
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
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-20"
    >
      <div class="bg-white rounded-lg p-6 w-96">
        <h3 class="text-lg font-medium text-gray-800 mb-4">Edit Customer</h3>
        <form @submit.prevent="saveCustomer">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700"
              >First Name</label
            >
            <input
              v-model="editCustomer.firstName"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700"
              >Last Name</label
            >
            <input
              v-model="editCustomer.lastName"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="editCustomer.email"
              type="email"
              class="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              v-model="editCustomer.phone"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">State</label>
            <input
              v-model="editCustomer.state"
              type="text"
              class="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="closeEditModal"
              class="mr-4 bg-gray-200 px-4 py-2 rounded-lg text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 px-4 py-2 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
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
    const dropdownOpen = ref<string | null>(null);
    const isEditModalOpen = ref(false);
    const editCustomer = ref({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      state: "",
      isActive: false,
    });

    const filteredCustomers = computed(() =>
      searchQuery.value
        ? customerStore.searchCustomers(searchQuery.value)
        : customerStore.customers
    );

    const toggleDropdown = (id: string) => {
      dropdownOpen.value = dropdownOpen.value === id ? null : id;
    };

    const openEditModal = (customer: any) => {
      editCustomer.value = { ...customer };
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
    };

    const saveCustomer = () => {
      customerStore.updateCustomer(editCustomer.value.id, editCustomer.value);
      closeEditModal();
    };

    const deleteCustomer = (id: string) => {
      if (confirm("Are you sure you want to delete this customer?")) {
        customerStore.deleteCustomer(id);
      }
    };

    return {
      searchQuery,
      filteredCustomers,
      dropdownOpen,
      isEditModalOpen,
      editCustomer,
      toggleDropdown,
      openEditModal,
      closeEditModal,
      saveCustomer,
      deleteCustomer,
    };
  },
};
</script>
