import type { Customer } from "@/types";

export const sampleCustomers: Customer[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "08012345678",
    state: "Lagos",
    isActive: true,
    details: "Preferred customer with frequent purchases.",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "08123456789",
    state: "Abuja",
    isActive: false,
    details: "Inactive customer. Requires follow-up.",
  },
  {
    id: "3",
    firstName: "Aliyu",
    lastName: "Garba",
    email: "aliyu.garba@example.com",
    phone: "07087654321",
    state: "Kaduna",
    isActive: true,
    details: "Long-term customer, prefers email communication.",
  },
];
