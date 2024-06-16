import { AuthProvider } from "./components/providers/auth-provider";
import { Toaster } from "./components/ui/sonner";
import { fetcher } from "./lib/axios";
import { RouterRouterDom } from "./router";
import { SWRConfig } from "swr";

function App() {
  return (
    <AuthProvider>
      <SWRConfig value={{ fetcher: fetcher }}>
        <Toaster />
        <RouterRouterDom />
      </SWRConfig>
    </AuthProvider>
  );
}

export default App;
