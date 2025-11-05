import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { BackToTop } from "@/components/layout/BackToTop";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <BackToTop />
    </BrowserRouter>
  );
}

export default App;
