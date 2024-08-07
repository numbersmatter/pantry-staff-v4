import { Button } from "../ui/button";

export default function LogoutButton() {
  return (
    <form
      method="post"
      action="/logout"
      className="'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'"
    >
      <Button variant={"outline"} type="submit">Logout</Button>
    </form>
  );
}