import { Authenticator } from "remix-auth";
import { sessionStorage } from "./sessions.server";
import { User } from "./auth-types";
import { AuthStrategies } from "./auth_strategies";
import { formStrategy } from "./auth_strategies/form.strategy";
import { db } from "../database/firestore.server";
// import { db } from "../database/firestore.server";

export type AuthStrategy = (typeof AuthStrategies)[keyof typeof AuthStrategies];

export let authenticator = new Authenticator<User>(sessionStorage);

export interface StaffInfo {
  fname: string;
  lname: string;
}

export const protectedRoute = async (request: Request) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const uid = user.uid;
  const staff = await db.staff.read(uid);

  // const staffData: StaffInfo = {
  //   fname: staff ? staff.fname : "no f name",
  //   lname: staff ? staff.lname : "no l name",
  // };

  const appUser = {
    fname: staff ? staff.fname : "User",
    lname: staff ? staff.lname : "",
    email: user.email,
    id: user.uid,
  };

  return { uid: user.uid, appUser };
};

// Register your strategies below
authenticator.use(formStrategy, AuthStrategies.FORM);
