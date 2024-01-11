import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/build/v14-appRouter";
import CssBaseLine from "@mui/material/CssBaseline";

export const metadata = {
  title: "VidX",
  description: "VidX",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <StyledEngineProvider injectFirst>
            <CssBaseLine />
            {children}
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
