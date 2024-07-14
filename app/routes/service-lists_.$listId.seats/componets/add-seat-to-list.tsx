import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";





export default function AddSeatToList({
  seatId, onList
}: {
  seatId: string, onList: boolean
}) {
  let fetcher = useFetcher();
  const isFetching = fetcher.state !== "idle";

  return (
    <fetcher.Form method="post">
      <input type="hidden" name="seatId" value={seatId} readOnly />
      <Button
        type="submit"
        name="type"
        value={onList ? "removeSeat" : "addSeat"}
        variant={onList ? "destructive" : "secondary"}
        disabled={isFetching}
      >
        {onList ? "Remove" : "Add"}
      </Button>
    </fetcher.Form>
  )

}