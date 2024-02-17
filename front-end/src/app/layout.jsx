import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/build/v14-appRouter";
import CssBaseLine from "@mui/material/CssBaseline";
import { AuthProvider, NavigationBar } from "@/ui/ComponentExporter.js";
import { getServerSession } from "next-auth";
import CustomMiniPlayer from "@/ui/Player/CustomMiniPlayer";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "VidX",
  description: "VidX",
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession();

  return (
    <StoreProvider>
      <html lang="en">
        <body className="bg-black">
          <AuthProvider session={session}>
            <AppRouterCacheProvider>
              <StyledEngineProvider injectFirst>
                <CssBaseLine />
                <NavigationBar />
                <CustomMiniPlayer />
                {children}
              </StyledEngineProvider>
            </AppRouterCacheProvider>
          </AuthProvider>
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
