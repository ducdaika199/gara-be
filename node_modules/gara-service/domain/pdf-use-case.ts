type RequestInvoiceInformation = {
  invoice: InvoiceType;
};

type InvoiceType = {
  total: number;
};

export async function renderInvoiceToPdfByInvoiceInformation(
  request: RequestInvoiceInformation
) {
  return true;
}
