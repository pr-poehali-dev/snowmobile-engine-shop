
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import CRM from "./pages/CRM";
import CRMLogin from "./pages/CRMLogin";
import CreateAdmin from "./pages/CreateAdmin";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Catalog from "./pages/Catalog";
import BuranDvigatel from "./pages/BuranDvigatel";
import BuranLifan from "./pages/BuranLifan";
import BuranLoncin from "./pages/BuranLoncin";
import TaigaDvigatel from "./pages/TaigaDvigatel";
import RysDvigatel from "./pages/RysDvigatel";
import BuranReversReduktor from "./pages/BuranReversReduktor";
import LifanDvigateli from "./pages/LifanDvigateli";
import UslugiUstanovka from "./pages/UslugiUstanovka";
import UslugiUstanovkaLifan from "./pages/UslugiUstanovkaLifan";
import UslugiUstanovkaLoncin from "./pages/UslugiUstanovkaLoncin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogArticle />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/buran/dvigatel" element={<BuranDvigatel />} />
          <Route path="/buran/dvigatel-lifan" element={<BuranLifan />} />
          <Route path="/buran/dvigatel-loncin" element={<BuranLoncin />} />
          <Route path="/buran/revers-reduktor" element={<BuranReversReduktor />} />
          <Route path="/taiga/dvigatel" element={<TaigaDvigatel />} />
          <Route path="/rys/dvigatel" element={<RysDvigatel />} />
          <Route path="/lifan/dvigateli-dlya-snegohodov" element={<LifanDvigateli />} />
          <Route path="/uslugi/ustanovka-dvigatelya-buran" element={<UslugiUstanovka />} />
          <Route path="/uslugi/ustanovka-lifan-buran" element={<UslugiUstanovkaLifan />} />
          <Route path="/uslugi/ustanovka-loncin-buran" element={<UslugiUstanovkaLoncin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/crm-login" element={<CRMLogin />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/create-admin" element={<CreateAdmin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;