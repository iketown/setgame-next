import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { FirebaseCtxProvider } from "../context/firebase/firebaseCtx";
import { UserCtxProvider } from "../context/user/UserCtx";
import theme from "../src/theme";
// Custom App to wrap it with context provider

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <FirebaseCtxProvider>
      <UserCtxProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UserCtxProvider>
    </FirebaseCtxProvider>
  );
}
