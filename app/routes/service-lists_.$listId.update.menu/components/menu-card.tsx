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
import { dollarValueConverter } from "~/lib/utils";


export function MenuCard() {
  const { menuCardData, listId } = useLoaderData<typeof loader>();

  const menuTotal = dollarValueConverter(menuCardData.listTotalValues);


  return (
    <ContainerPadded className="py-0 sm:py-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {menuCardData?.name ?? "Service List"}
          </CardTitle>
          <CardDescription>
            There are {menuCardData.listTotal.quantity} items in this list totaling {menuTotal}.
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