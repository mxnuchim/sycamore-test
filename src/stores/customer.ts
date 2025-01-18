import type { Customer } from "@/types";
import { sampleCustomers } from "@/utils/data";
import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customerStore", {
  state: () => ({
    customers: sampleCustomers as Customer[],
  }),
  getters: {
    // Search customers by various fields
    searchCustomers: (state) => (query: string) => {
      const lowerQuery = query.toLowerCase();
      return state.customers.filter((customer) =>
        [
          customer.firstName.toLowerCase(),
          customer.lastName.toLowerCase(),
          customer.email.toLowerCase(),
          customer.phone,
          customer.state.toLowerCase(),
          customer.isActive ? "active" : "inactive",
        ].some((field) => field.includes(lowerQuery))
      );
    },
  },
  actions: {
    addCustomer(customer: Omit<Customer, "id">) {
      this.customers.push({
        ...customer,
        id: Date.now().toString(), // Unique ID
      });
    },
    updateCustomer(id: string, updatedCustomer: Partial<Customer>) {
      const index = this.customers.findIndex((customer) => customer.id === id);
      if (index !== -1) {
        this.customers[index] = {
          ...this.customers[index],
          ...updatedCustomer,
        };
      }
    },
    deleteCustomer(id: string) {
      this.customers = this.customers.filter((customer) => customer.id !== id);
    },
  },
});
