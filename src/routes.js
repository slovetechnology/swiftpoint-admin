import ForgotPassword from "./forms/ForgotPassword";
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
import Banners from "./pages/banner/Banners";
import NewBanner from "./pages/banner/NewBanner";
import EditBanner from "./pages/banner/EditBanner";
import Achievements from "./pages/Achievements";



export const AuthRoutes = [
    {path: '/home', element: Board},
    {path: '/settings', element: Settings},
    {path: '/streaks', element: Streaks},
    {path: '/streaks/new', element: NewStreak},
    {path: '/streaks/edit/:id', element: EditStreak},
    {path: '/users', element: Users},
    {path: '/notifications', element: Notifications},
    {path: '/banners', element: Banners},
    {path: '/banners/new', element: NewBanner},
    {path: '/banners/edit/:id', element: EditBanner},
    {path: '/achievements', element: Achievements},
]

export const FormRoutes = [
    {path: '/forgot-password', element: ForgotPassword},
    {path: '/verify-email', element: VerifyEmail},
    {path: '/reset-password', element: ResetPassword},
]

export const GeneralRoutes = [
    {path: '/', element: Home},
]