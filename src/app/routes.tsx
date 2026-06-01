import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { AddBook } from "./components/AddBook";
import { Books } from "./components/Books";
import { Users } from "./components/Users";
import { Profile } from "./components/Profile";
import { Insights } from "./components/Insights";
import { UserRoot } from "./components/user/UserRoot";
import { UserHome } from "./components/user/UserHome";
import { UserBooks } from "./components/user/UserBooks";
import { UserReservations } from "./components/user/UserReservations";
import { UserIssues } from "./components/user/UserIssues";
import { UserReturns } from "./components/user/UserReturns";
import { UserProfile } from "./components/user/UserProfile";
import { Login } from "./components/Login";
import { ResetPassword } from "./components/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/admin",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "books", Component: Books },
      { path: "books/add", Component: AddBook },
      { path: "users", Component: Users },
      { path: "profile", Component: Profile },
      { path: "insights", Component: Insights },
    ],
  },
  {
    path: "/",
    Component: UserRoot,
    children: [
      { index: true, Component: UserHome },
      { path: "books", Component: UserBooks },
      { path: "reservations", Component: UserReservations },
      { path: "issues", Component: UserIssues },
      { path: "returns", Component: UserReturns },
      { path: "profile", Component: UserProfile },
    ],
  },
]);