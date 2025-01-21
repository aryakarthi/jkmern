import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const Contact = lazy(() => import("./Contact"));
export const Loader = lazy(() => import("./Loader"));
export const NotFound = lazy(() => import("./NotFound"));

export const Dashboard = lazy(() => import("./admin/Dashboard"));
