import { QueryStringRecord, withSchema } from "composable-functions";
import { z } from "zod";
import { db } from "~/lib/database/firestore.server";

const SeatToListSchema = z.object({
  type: z.enum(["addSeat", "removeSeat"]),
  seatId: z.string().length(20, "Seat ID must be 20 characters"),
});

const addSeatIdToList = async ({
  listId,
  seatId,
}: {
  listId: string;
  seatId: string;
}) => {
  const list = await db.service_lists.read(listId);
  if (!list) {
    throw new Error(`Service List with ID ${listId} not found`);
  }
  const seat = await db.seats.read(seatId);
  if (!seat) {
    throw new Error(`Seat with ID ${seatId} not found`);
  }

  return await db.service_lists.addSeat(listId, seatId);
};

const removeSeatIdFromList = async ({
  listId,
  seatId,
}: {
  listId: string;
  seatId: string;
}) => {
  const list = await db.service_lists.read(listId);
  if (!list) {
    throw new Error(`Service List with ID ${listId} not found`);
  }
  return await db.service_lists.removeSeat(listId, seatId);
};

const addSeat = ({
  listId,
  formInput,
}: {
  listId: string;
  formInput: QueryStringRecord;
}) => {
  const mutation = withSchema(SeatToListSchema)((values) =>
    addSeatIdToList({ listId, seatId: values.seatId })
  );

  return mutation(formInput);
};

const removeSeat = ({
  listId,
  formInput,
}: {
  listId: string;
  formInput: QueryStringRecord;
}) => {
  const mutation = withSchema(SeatToListSchema)((values) =>
    removeSeatIdFromList({ listId, seatId: values.seatId })
  );

  return mutation(formInput);
};

export { addSeat, removeSeat };
