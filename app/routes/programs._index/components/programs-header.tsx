import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { AddProgramDialog } from "./add-program-dialog";



export function ProgramsHeader() {

  return (
    <>
      <Card
        className="border-0"
      >
        <CardHeader className="pb-3">
          <CardTitle>Programs List</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Programs offer services to families.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AddProgramDialog />
        </CardFooter>
      </Card>
    </>
  )
}