import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import Index from "./pages/Index";
import { Button } from "@/components/ui/button";
// import { Switch } from "./components/ui/switch";
// import { Badge } from "./components/ui/badge";
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
    {/* <Index /> */}

  </StrictMode>
);
