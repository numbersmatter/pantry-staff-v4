import { useLoaderData } from "@remix-run/react";
import { ContainerPadded, StandardContainer } from "~/components/common/containers";
import AddMenuItemDialog from "~/components/forms/add-menu-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { loader } from "../route";
import { ItemsTable } from "./items-table";
import { AddServiceItemDialog } from "./add-service-item";


export function MenuCard() {
  const { menuCardData, listId } = useLoaderData<typeof loader>();
  return (
    <ContainerPadded className="py-0 sm:py-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {menuCardData?.name ?? "Service List"}
          </CardTitle>
          <CardDescription>
            Add food list items to this service list.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ItemsTable />
        </CardContent>
        <CardFooter className="py-2">
          <AddServiceItemDialog
            listId={listId}
          />
        </CardFooter>
      </Card>
    </ContainerPadded>
  )
}