export interface OrderResponse {
  data: {
    orders: {
      id: string;
      orderDate: Date;
      paymentMethod: string;
      products: [];
      status: string;
      user: {
        email: string;
        name: string;
      };
    }[];
  };
}
