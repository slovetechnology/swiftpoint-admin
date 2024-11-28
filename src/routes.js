import ForgotPassword from "./forms/ForgotPassword";
import Login from "./forms/Login";
import ResetPassword from "./forms/ResetPassword";
import VerifyEmail from "./forms/VerifyEmail";
import Board from "./pages/Board";
import Home from "./pages/Home";
import Notifications from "./pages/Notifications";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import EditStreak from "./pages/streak/EditStreak";
import NewStreak from "./pages/streak/NewStreak";
import Streaks from "./pages/streak/Streaks";



export const AuthRoutes = [
    {path: '/home', element: Board},
    {path: '/settings', element: Settings},
    {path: '/streaks', element: Streaks},
    {path: '/streaks/new', element: NewStreak},
    {path: '/streaks/edit/:id', element: EditStreak},
    {path: '/users', element: Users},
    {path: '/notifications', element: Notifications},
]

export const FormRoutes = [
    {path: '/login', element: Login},
    {path: '/forgot-password', element: ForgotPassword},
    {path: '/verify-email', element: VerifyEmail},
    {path: '/reset-password', element: ResetPassword},
]

export const GeneralRoutes = [
    {path: '/', element: Home},
]