import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/build/v14-appRouter";
import CssBaseLine from "@mui/material/CssBaseline";
import { NavigationBar } from "@/ui/ComponentExporter.js";

export const metadata = {
  title: "VidX",
  description: "VidX",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-black">
        <AppRouterCacheProvider>
          <StyledEngineProvider injectFirst>
            <CssBaseLine />
            <NavigationBar />
            {children}
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
