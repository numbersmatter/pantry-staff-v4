import { db } from "~/lib/database/firestore.server";
import { dollarValueConverter } from "~/lib/utils";

export const getServiceTransactionData = async ({
  serviceId,
}: {
  serviceId: string;
}) => {
  const service = await db.service_transactions.read(serviceId);
  if (!service) {
    throw new Error("Service not found");
  }

  const seat_id = service.delivered_to;

  const seat = await db.seats.read(seat_id);

  if (!seat) {
    throw new Error("Seat not found");
  }

  const family_id = seat.family_id;

  return {
    serviceId,
    family_id: seat.family_id,
    familyName: seat.family_name,
    service: {},
    service_period_id: service.service_period_id,
    address: seat.address,
    createdOnDate: service.service_created_data,
    dollarValue: dollarValueConverter(service.value),
    service_completed_date: service.service_completed_date,
    invoiceItems: [
      {
        item_id: "invoice_item_id",
        item_name: "Food Box",
        quantity: 1,
        unitPrice: dollarValueConverter(service.value),
        value: dollarValueConverter(service.value),
        memo: service.memo ?? service.service_type,
        type: "food box",
      },
    ],
    status: "pending",
  };
};
