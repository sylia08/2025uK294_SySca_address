import { defaultAxiosInstance } from "./Api";

export interface Address {
  id: number;
  street_number: number;
  street_name: string;
  city: string;
  country_id: number;
  importdate: string;
}

export const AddressService = {
  getAddress: async (): Promise<Address[]> => {
    const data = await defaultAxiosInstance.get("/address");
    return data.data;
  },

  getOneAddress: async (id: number): Promise<Address> => {
    const data = await defaultAxiosInstance.get(`address/${id}`);
    return data.data;
  },

  deleteAddress: async (id: number): Promise<{ message: string } | void> => {
    const data = await defaultAxiosInstance.delete(`address/${id}`);
    return data.data;
  },

  createAddress: async (
    newAddress: Omit<Address, "id" | "importdate">
  ): Promise<Address> => {
    const data = await defaultAxiosInstance.post(`address`, newAddress);
    return data.data;
  },

  updateAddress: async (
    id: number,
    updatedData: Partial<Address>
  ): Promise<Address> => {
    const data = await defaultAxiosInstance.put<Address>(
      `address/${id}`,
      updatedData
    );
    return data.data;
  },
};
