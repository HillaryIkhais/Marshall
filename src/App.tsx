import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AppWorkspace from "./pages/AppWorkspace";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-bg-primary font-sans text-foreground antialiased">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/app" element={<AppWorkspace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
