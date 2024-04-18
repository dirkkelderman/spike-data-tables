import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import client from "../components/apolloClient.ts";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MuiDataTablePage from "./pages/mui-data-table.tsx";
import AgGridPage from "./pages/ag-grid.tsx";
import KaTablePage from "./pages/ka-table.tsx";
import HandsontablePage from "./pages/handsontable.tsx";
import AgGridServerPage from "./pages/ag-grid-server.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ag-grid",
    element: <AgGridPage />,
  },
  {
    path: "/ag-grid-server",
    element: <AgGridServerPage />,
  },
  {
    path: "/mui-data-table",
    element: <MuiDataTablePage />,
  },
  {
    path: "/ka-table",
    element: <KaTablePage />,
  },
  {
    path: "/handsontable",
    element: <HandsontablePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
