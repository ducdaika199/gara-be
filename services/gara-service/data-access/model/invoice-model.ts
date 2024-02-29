import { InvoiceItem, User } from '@prisma/client';

type InvoiceItemModel = {
  quantity: number;
  productId: number;
};

export type InvoiceModel = {
  userId: number;
  invoiceItems: InvoiceItemModel[];
  userRequest: string;
  user: User;
};
