import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CTAModal } from './components/CTAModal';
import { Home } from './pages/Home';
import { GlobalEducation } from './pages/GlobalEducation';
import { StudentSupport } from './pages/StudentSupport';
import { TrendingCourses } from './pages/TrendingCourses';
import { LoanAssistance } from './pages/LoanAssistance';
import { WorkAbroad } from './pages/WorkAbroad';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { SignIn } from './pages/SignIn';
import { Dashboard } from './pages/Dashboard';
import { FAQPage } from './pages/FAQPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />

          {/* 👇 THIS LINE FIXES THE OVERLAP ISSUE */}
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/global-education" element={<GlobalEducation />} />
              <Route path="/student-support" element={<StudentSupport />} />
              <Route path="/trending-courses" element={<TrendingCourses />} />
              <Route path="/loan-assistance" element={<LoanAssistance />} />
              <Route path="/work-abroad" element={<WorkAbroad />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppButton />
          <CTAModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
