import type { AppProps } from "next/app";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkPublishableKey } from "../providers/clerk-config";
import "../App.css";

function ApiyamApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <CssVarsProvider disableTransitionOnChange defaultColorScheme="dark">
        <CssBaseline />
        <Component {...pageProps} />
      </CssVarsProvider>
    </ClerkProvider>
  );
}

export default ApiyamApp;