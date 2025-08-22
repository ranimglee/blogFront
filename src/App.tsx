
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import ArticleDetail from "./pages/ArticleDetail";
import ProjectDetail from "./pages/ProjectDetail";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import ForgotPassword from "./pages/ForgotPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/article" element={<Blog />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ Add this here */}

            <Route path="/projects" element={<Projects />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />


            <Route path="/projects/:id" element={<ProjectDetail />} />

            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
