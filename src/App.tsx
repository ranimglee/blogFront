import { useEffect, useRef } from "react";
import { useLocation, BrowserRouter, Routes, Route , useParams} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { LanguageProvider } from "./contexts/LanguageContext";

import CookieBanner from "./components/CookieBanner";
import { trackEvent } from "./analytics/events"; // 👈 IMPORTANT

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
import Sitemap from "./pages/Sitemap";
import TermsOfUse from "./pages/TermsOfUse";
import { extractPageInfo } from "./analytics/helpers";

const queryClient = new QueryClient();

function AnalyticsTracker() {
  const location = useLocation();
  const prevPathRef = useRef<string | null>(null);
 useEffect(() => {
  const timeout = setTimeout(() => {
    const path = location.pathname;

    const { category, pageId } = extractPageInfo(path);

    trackEvent("PAGE_VIEW", {
      path,
      referrer: prevPathRef.current || document.referrer,
      pageId,
      category

    });

    prevPathRef.current = path;
  }, 150);

  return () => clearTimeout(timeout);
}, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AnalyticsTracker />

            <CookieBanner />

            <Toaster />
            <Sonner />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/article" element={<Blog />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/terms" element={<TermsOfUse />} />
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
}