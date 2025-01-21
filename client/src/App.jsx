import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { RootLayout } from "./layouts";
import { Contact, Home, NotFound } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

const App = () => {
  return (
    <Suspense fallback={"loading"}>
      <RouterProvider router={router} />
    </Suspense>
    // <div>Hello</div>
  );
};

export default App;
