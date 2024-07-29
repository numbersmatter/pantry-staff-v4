import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";




export function FamilyHeader() {

  return (
    <>
      <Card
        className="border-0"
      >
        <CardHeader className="pb-3">
          <CardTitle>Families List</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Families in the nonprofit&apos;s service population.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link to="/families/add">
            <Button>Add Family</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}