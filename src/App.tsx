
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Suspense, useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showGsapWarnings, setShowGsapWarnings] = useState(true);
  
  // Suppress GSAP console warnings in development
  useEffect(() => {
    if (showGsapWarnings === false) {
      const originalConsoleWarn = console.warn;
      console.warn = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('GSAP')) {
          return;
        }
        originalConsoleWarn.apply(console, args);
      };
      
      return () => {
        console.warn = originalConsoleWarn;
      };
    }
  }, [showGsapWarnings]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Index />} />
              <Route path="/about" element={<Index />} />
              <Route path="/contact" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
