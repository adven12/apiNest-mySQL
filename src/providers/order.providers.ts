import { Order } from '../entities/order.entity';


export const OrderBooksProviders = [
  {
    provide: 'ORDER_BOOKS_REPOSITORY',
    useValue: Order,
  },
];