import { InvoiceItem, User } from '@prisma/client';

type InvoiceItemModel = {
  quantity: Number;
  productId: Number;
};

export type InvoiceModel = {
  userId: any;
  invoiceItems: InvoiceItemModel[];
  userRequest: String;
  user: User;
};
