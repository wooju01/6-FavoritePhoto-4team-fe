"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { StateModalProvider } from "./StateModalProvider";
import { AlertModalProvider } from "./AlertModalProvider";
import AuthProvider from "./AuthProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function Providers({ children }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AlertModalProvider>
          <StateModalProvider>{children}</StateModalProvider>
        </AlertModalProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default Providers;
