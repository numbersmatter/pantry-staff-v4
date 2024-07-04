import { FormTextField } from "~/components/forms/textfield";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export function UpdateFieldDialog() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <FormTextField
          label="Program Name"
          id="value"
        />
      </DialogContent>
    </Dialog>
  )

}