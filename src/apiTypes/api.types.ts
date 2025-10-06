// Define types for API responses

// src/apiTypes/api.types.ts
export interface APIUserResponse {
  token: string;
  error?: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

export interface CartResponse {
  items: InventoryItem[];
  total?: number;
}


