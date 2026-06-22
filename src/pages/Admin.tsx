import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import * as XLSX from 'xlsx';
import {
  Users,
  FileText,
  Download,
  GraduationCap,
  LogOut,
  Search,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  Calendar,
  Plane,
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
  Trash2,
  Briefcase,
  Eye,
  EyeOff,
  DollarSign,
  MapPin,
  Play,
  Instagram,
  Youtube,
  Plus,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  preferred_country: string;
  message: string;
  created_at: string;
  source_page?: string;
  job_title?: string;
}

interface Application {
  id: string;
  student_id: string;
  country: string;
  university: string;
  course: string;
  intake: string;
  status: string;
  created_at: string;
  students?: {
    full_name: string;
  };
}

interface BrochureDownload {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  created_at: string;
}

interface Student {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  preferred_country?: string;
  message?: string;
  created_at: string;
  source_page?: string;
}

interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

interface TouristVisaApplication {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  destination_country: string;
  travel_dates?: string;
  num_travelers?: number;
  visa_type: string;
  message: string;
  status: string;
  created_at: string;
}

interface LeadCapture {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_country: string;
  source: string;
  created_at: string;
}

interface VideoEntry {
  id: string;
  title: string;
  description: string;
  platform: 'instagram' | 'youtube';
  video_id: string;
  original_url: string;
  thumbnail_url: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

interface VideoForm {
  title: string;
  description: string;
  platform: 'instagram' | 'youtube';
  original_url: string;
  thumbnail_url: string;
  display_order: string;
}

const emptyVideoForm: VideoForm = {
  title: '',
  description: '',
  platform: 'youtube',
  original_url: '',
  thumbnail_url: '',
  display_order: '0',
};

function extractVideoId(platform: 'instagram' | 'youtube', url: string): string {
  if (platform === 'instagram') {
    const reelMatch = url.match(/\/reel\/([^/?]+)/);
    if (reelMatch) return reelMatch[1];
    const postMatch = url.match(/\/p\/([^/?]+)/);
    if (postMatch) return postMatch[1];
    return '';
  } else if (platform === 'youtube') {
    const vMatch = url.match(/[?&]v=([^&]+)/);
    if (vMatch) return vMatch[1];
    const shortsMatch = url.match(/\/shorts\/([^/?]+)/);
    if (shortsMatch) return shortsMatch[1];
    const youtubeMatch = url.match(/youtu\.be\/([^/?]+)/);
    if (youtubeMatch) return youtubeMatch[1];
    const embedMatch = url.match(/\/embed\/([^/?]+)/);
    if (embedMatch) return embedMatch[1];
    return '';
  }
  return '';
}

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [brochureDownloads, setBrochureDownloads] = useState<BrochureDownload[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [touristVisaApplications, setTouristVisaApplications] = useState<TouristVisaApplication[]>([]);
  const [leadCaptures, setLeadCaptures] = useState<LeadCapture[]>([]);
  const [videos, setVideos] = useState<VideoEntry[]>([]);

  const [activeTab, setActiveTab] = useState<
    'contacts' | 'applications' | 'brochures' | 'students' | 'jobs' | 'tourist-visa' | 'leads' | 'videos'
  >('contacts');
  const [searchTerm, setSearchTerm] = useState('');

  const [showVideoForm, setShowVideoForm] = useState(false);
  const [videoForm, setVideoForm] = useState<VideoForm>(emptyVideoForm);
  const [videoFormError, setVideoFormError] = useState('');
  const [videoFormSaving, setVideoFormSaving] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        navigate('/signin');
        return;
      }

      const { data: studentData } = await supabase
        .from('students')
        .select('is_admin')
        .eq('id', authUser.id)
        .maybeSingle();

      if (!studentData?.is_admin) {
        navigate('/dashboard');
        return;
      }

      setUser(authUser);
      setIsAdmin(true);
      fetchAllData();
    } catch (error) {
      console.error('Admin access check failed:', error);
      navigate('/signin');
    }
  };

  const fetchAllData = async () => {
    try {
      const [
        contactsRes,
        applicationsRes,
        brochuresRes,
        studentsRes,
        jobsRes,
        touristVisaRes,
        leadsRes,
        videosRes,
      ] = await Promise.all([
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase
          .from('applications')
          .select('*, students(full_name)')
          .order('created_at', { ascending: false }),
        supabase.from('brochure_downloads').select('*').order('created_at', { ascending: false }),
        supabase.from('students').select('*').order('created_at', { ascending: false }),
        supabase.from('job_openings').select('*').order('display_order', { ascending: true }),
        supabase
          .from('tourist_visa_applications')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase.from('lead_captures').select('*').order('created_at', { ascending: false }),
        supabase.from('videos').select('*').order('display_order', { ascending: true }),
      ]);

      if (contactsRes.data) setContactSubmissions(contactsRes.data);
      if (applicationsRes.data) setApplications(applicationsRes.data);
      if (brochuresRes.data) setBrochureDownloads(brochuresRes.data);
      if (studentsRes.data) setStudents(studentsRes.data);
      if (jobsRes.data) setJobOpenings(jobsRes.data);
      if (touristVisaRes.data) setTouristVisaApplications(touristVisaRes.data);
      if (leadsRes.data) setLeadCaptures(leadsRes.data);
      if (videosRes.data) setVideos(videosRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  const deleteContact = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
      if (!error) {
        setContactSubmissions(prev => prev.filter(c => c.id !== id));
      }
    }
  };

  const deleteStudent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const { error } = await supabase.from('students').delete().eq('id', id);
      if (!error) {
        setStudents(prev => prev.filter(s => s.id !== id));
      }
    }
  };

  const deleteApplication = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      const { error } = await supabase.from('applications').delete().eq('id', id);
      if (!error) {
        setApplications(prev => prev.filter(a => a.id !== id));
      }
    }
  };

  const deleteBrochureDownload = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const { error } = await supabase.from('brochure_downloads').delete().eq('id', id);
      if (!error) {
        setBrochureDownloads(prev => prev.filter(b => b.id !== id));
      }
    }
  };

  const deleteTouristVisaApplication = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      const { error } = await supabase.from('tourist_visa_applications').delete().eq('id', id);
      if (!error) {
        setTouristVisaApplications(prev => prev.filter(a => a.id !== id));
      }
    }
  };

  const deleteLeadCapture = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const { error } = await supabase.from('lead_captures').delete().eq('id', id);
      if (!error) {
        setLeadCaptures(prev => prev.filter(l => l.id !== id));
      }
    }
  };

  const saveVideo = async () => {
    setVideoFormError('');

    if (!videoForm.title.trim() || !videoForm.description.trim() || !videoForm.original_url.trim()) {
      setVideoFormError('Please fill in all required fields');
      return;
    }

    const videoId = extractVideoId(videoForm.platform, videoForm.original_url);
    if (!videoId) {
      setVideoFormError('Invalid video URL for the selected platform');
      return;
    }

    setVideoFormSaving(true);

    try {
      const { error } = await supabase.from('videos').insert({
        title: videoForm.title,
        description: videoForm.description,
        platform: videoForm.platform,
        video_id: videoId,
        original_url: videoForm.original_url,
        thumbnail_url: videoForm.thumbnail_url,
        is_active: true,
        display_order: parseInt(videoForm.display_order) || 0,
      });

      if (error) throw error;

      setVideoForm(emptyVideoForm);
      setShowVideoForm(false);
      fetchAllData();
    } catch (error) {
      console.error('Error saving video:', error);
      setVideoFormError('Error saving video. Please try again.');
    } finally {
      setVideoFormSaving(false);
    }
  };

  const toggleVideoStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('videos')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchAllData();
    } catch (error) {
      console.error('Error toggling video status:', error);
    }
  };

  const deleteVideo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        const { error } = await supabase.from('videos').delete().eq('id', id);
        if (error) throw error;
        fetchAllData();
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  const exportToExcel = (data: any[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportContactsToExcel = () => {
    const exportData = contactSubmissions.map(c => ({
      'Full Name': c.full_name,
      Email: c.email,
      Phone: c.phone_number,
      Country: c.preferred_country,
      Message: c.message,
      'Source Page': c.source_page || '',
      'Job Title': c.job_title || '',
      'Created At': c.created_at,
    }));
    exportToExcel(exportData, 'contact-submissions');
  };

  const exportApplicationsToExcel = () => {
    const exportData = applications.map(a => ({
      'Student Name': a.students?.full_name || 'Unknown',
      Country: a.country,
      University: a.university,
      Course: a.course,
      Intake: a.intake,
      Status: a.status,
      'Created At': a.created_at,
    }));
    exportToExcel(exportData, 'applications');
  };

  const exportBrochuresToExcel = () => {
    const exportData = brochureDownloads.map(b => ({
      Name: b.name,
      Email: b.email,
      Phone: b.phone,
      Country: b.country,
      'Downloaded At': b.created_at,
    }));
    exportToExcel(exportData, 'brochure-downloads');
  };

  const exportLeadsToExcel = () => {
    const exportData = leadCaptures.map(l => ({
      Name: l.name,
      Email: l.email,
      Phone: l.phone,
      Country: l.preferred_country,
      Source: l.source,
      'Captured At': l.created_at,
    }));
    exportToExcel(exportData, 'lead-captures');
  };

  const exportTouristVisaToExcel = () => {
    const exportData = touristVisaApplications.map(a => ({
      'Full Name': a.full_name,
      Email: a.email,
      Phone: a.phone_number,
      'Destination Country': a.destination_country,
      'Travel Dates': a.travel_dates || '',
      'Number of Travelers': a.num_travelers || '',
      'Visa Type': a.visa_type,
      Status: a.status,
      Message: a.message,
      'Created At': a.created_at,
    }));
    exportToExcel(exportData, 'tourist-visa-applications');
  };

  const filteredContactSubmissions = contactSubmissions.filter(c =>
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone_number.includes(searchTerm)
  );

  const filteredApplications = applications.filter(a =>
    (a.students?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBrochureDownloads = brochureDownloads.filter(b =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(s =>
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.phone || '').includes(searchTerm)
  );

  const filteredLeadCaptures = leadCaptures.filter(l =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm)
  );

  const filteredTouristVisaApplications = touristVisaApplications.filter(a =>
    a.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.destination_country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghost-green">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <section className="min-h-screen pt-24 pb-12 bg-ghost-green">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-gray-200">
              {[
                { id: 'contacts', label: 'Contacts', icon: Mail },
                { id: 'applications', label: 'Applications', icon: FileText },
                { id: 'brochures', label: 'Brochures', icon: Download },
                { id: 'students', label: 'Students', icon: Users },
                { id: 'jobs', label: 'Jobs', icon: Briefcase },
                { id: 'tourist-visa', label: 'Visa Apps', icon: Plane },
                { id: 'leads', label: 'Leads', icon: MessageSquare },
                { id: 'videos', label: 'Videos', icon: Play },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSearchTerm('');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-turquoise text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            {activeTab !== 'jobs' && activeTab !== 'videos' && (
              <div className="mb-6 flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                  />
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Contact Submissions ({filteredContactSubmissions.length})</h2>
                  <button
                    onClick={exportContactsToExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-turquoise text-white rounded-lg hover:bg-turquoise-dark transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Phone</th>
                        <th className="px-4 py-2 text-left">Country</th>
                        <th className="px-4 py-2 text-left">Message</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContactSubmissions.map(contact => (
                        <tr key={contact.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{contact.full_name}</td>
                          <td className="px-4 py-2">{contact.email}</td>
                          <td className="px-4 py-2">{contact.phone_number}</td>
                          <td className="px-4 py-2">{contact.preferred_country}</td>
                          <td className="px-4 py-2 truncate max-w-xs">{contact.message}</td>
                          <td className="px-4 py-2">{new Date(contact.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => deleteContact(contact.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Applications ({filteredApplications.length})</h2>
                  <button
                    onClick={exportApplicationsToExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-turquoise text-white rounded-lg hover:bg-turquoise-dark transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Student</th>
                        <th className="px-4 py-2 text-left">Country</th>
                        <th className="px-4 py-2 text-left">University</th>
                        <th className="px-4 py-2 text-left">Course</th>
                        <th className="px-4 py-2 text-left">Intake</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map(app => (
                        <tr key={app.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{app.students?.full_name || 'Unknown'}</td>
                          <td className="px-4 py-2">{app.country}</td>
                          <td className="px-4 py-2">{app.university}</td>
                          <td className="px-4 py-2 truncate max-w-xs">{app.course}</td>
                          <td className="px-4 py-2">{app.intake}</td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                app.status === 'applied'
                                  ? 'bg-blue-100 text-blue-700'
                                  : app.status === 'offer'
                                    ? 'bg-green-100 text-green-700'
                                    : app.status === 'visa'
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{new Date(app.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => deleteApplication(app.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Brochures Tab */}
            {activeTab === 'brochures' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Brochure Downloads ({filteredBrochureDownloads.length})</h2>
                  <button
                    onClick={exportBrochuresToExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-turquoise text-white rounded-lg hover:bg-turquoise-dark transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Phone</th>
                        <th className="px-4 py-2 text-left">Country</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBrochureDownloads.map(brochure => (
                        <tr key={brochure.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{brochure.name}</td>
                          <td className="px-4 py-2">{brochure.email}</td>
                          <td className="px-4 py-2">{brochure.phone}</td>
                          <td className="px-4 py-2">{brochure.country}</td>
                          <td className="px-4 py-2">{new Date(brochure.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => deleteBrochureDownload(brochure.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Students ({filteredStudents.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Phone</th>
                        <th className="px-4 py-2 text-left">Country</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map(student => (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{student.full_name}</td>
                          <td className="px-4 py-2">{student.email || '-'}</td>
                          <td className="px-4 py-2">{student.phone || '-'}</td>
                          <td className="px-4 py-2">{student.preferred_country || '-'}</td>
                          <td className="px-4 py-2">{new Date(student.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => deleteStudent(student.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Job Openings ({jobOpenings.length})</h2>
                <div className="grid gap-6">
                  {jobOpenings.map(job => (
                    <div
                      key={job.id}
                      className={`border rounded-lg p-6 ${
                        job.is_active
                          ? 'border-turquoise bg-blue-50'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {job.location}
                            </span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            job.is_active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {job.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{job.description}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Requirements:</strong> {job.requirements}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tourist Visa Tab */}
            {activeTab === 'tourist-visa' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    Tourist Visa Applications ({filteredTouristVisaApplications.length})
                  </h2>
                  <button
                    onClick={exportTouristVisaToExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-turquoise text-white rounded-lg hover:bg-turquoise-dark transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Destination</th>
                        <th className="px-4 py-2 text-left">Visa Type</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTouristVisaApplications.map(app => (
                        <tr key={app.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{app.full_name}</td>
                          <td className="px-4 py-2">{app.email}</td>
                          <td className="px-4 py-2">{app.destination_country}</td>
                          <td className="px-4 py-2">{app.visa_type}</td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                app.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : app.status === 'approved'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{new Date(app.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => deleteTouristVisaApplication(app.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Leads Tab */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Lead Captures ({filteredLeadCaptures.length})</h2>
                  <button
                    onClick={exportLeadsToExcel}
                    className="flex items-center gap-2 px-4 py-2 bg-turquoise text-white rounded-lg hover:bg-turquoise-dark transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Phone</th>
                        <th className="px-4 py-2 text-left">Country</th>
                        <th className="px-4 py-2 text-left">Source</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeadCaptures.map(lead => (
                        <tr key={lead.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{lead.name}</td>
                          <td className="px-4 py-2">{lead.email}</td>
                          <td className="px-4 py-2">{lead.phone}</td>
                          <td className="px-4 py-2">{lead.preferred_country}</td>
                          <td className="px-4 py-2">{lead.source}</td>
                          <td className="px-4 py-2">{new Date(lead.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => deleteLeadCapture(lead.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Videos ({videos.length})</h2>
                  <button
                    onClick={() => setShowVideoForm(!showVideoForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-turquoise text-white rounded-lg hover:bg-turquoise-dark transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Video
                  </button>
                </div>

                {/* Video Form */}
                <AnimatePresence>
                  {showVideoForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-blue-50 border border-turquoise rounded-lg p-6 mb-6"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Add New Video</h3>
                        <button
                          onClick={() => {
                            setShowVideoForm(false);
                            setVideoForm(emptyVideoForm);
                            setVideoFormError('');
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {videoFormError && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{videoFormError}</div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Title *</label>
                          <input
                            type="text"
                            value={videoForm.title}
                            onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                            placeholder="Video title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Description *</label>
                          <textarea
                            value={videoForm.description}
                            onChange={e => setVideoForm({ ...videoForm, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                            placeholder="Video description"
                            rows={3}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Platform *</label>
                          <select
                            value={videoForm.platform}
                            onChange={e =>
                              setVideoForm({
                                ...videoForm,
                                platform: e.target.value as 'instagram' | 'youtube',
                              })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                          >
                            <option value="youtube">YouTube</option>
                            <option value="instagram">Instagram</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Video URL *</label>
                          <input
                            type="url"
                            value={videoForm.original_url}
                            onChange={e => setVideoForm({ ...videoForm, original_url: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                            placeholder="https://youtube.com/watch?v=... or https://instagram.com/reel/..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Thumbnail URL</label>
                          <input
                            type="url"
                            value={videoForm.thumbnail_url}
                            onChange={e => setVideoForm({ ...videoForm, thumbnail_url: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                            placeholder="https://..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Display Order</label>
                          <input
                            type="number"
                            value={videoForm.display_order}
                            onChange={e => setVideoForm({ ...videoForm, display_order: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                            placeholder="0"
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={saveVideo}
                            disabled={videoFormSaving}
                            className="flex-1 px-4 py-2 bg-turquoise text-white rounded-lg hover:bg-turquoise-dark transition-colors disabled:opacity-50"
                          >
                            {videoFormSaving ? 'Saving...' : 'Save Video'}
                          </button>
                          <button
                            onClick={() => {
                              setShowVideoForm(false);
                              setVideoForm(emptyVideoForm);
                              setVideoFormError('');
                            }}
                            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Videos Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map(video => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-gray-200 flex items-center justify-center relative">
                        {video.thumbnail_url ? (
                          <img
                            src={video.thumbnail_url}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400">
                            {video.platform === 'youtube' ? (
                              <Youtube className="w-12 h-12" />
                            ) : (
                              <Instagram className="w-12 h-12" />
                            )}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center transition-all">
                          <Play className="w-12 h-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-sm mb-2 line-clamp-2">{video.title}</h3>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{video.description}</p>

                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              video.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {video.is_active ? 'Active' : 'Inactive'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {video.platform === 'youtube' ? (
                              <Youtube className="w-4 h-4 inline" />
                            ) : (
                              <Instagram className="w-4 h-4 inline" />
                            )}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleVideoStatus(video.id, video.is_active)}
                            className={`flex-1 px-2 py-1 rounded text-xs font-semibold transition-colors ${
                              video.is_active
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                : 'bg-turquoise text-white hover:bg-turquoise-dark'
                            }`}
                          >
                            {video.is_active ? (
                              <>
                                <EyeOff className="w-3 h-3 inline mr-1" />
                                Hide
                              </>
                            ) : (
                              <>
                                <Eye className="w-3 h-3 inline mr-1" />
                                Show
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => deleteVideo(video.id)}
                            className="flex-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-3 h-3 inline mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {videos.length === 0 && !showVideoForm && (
                  <div className="text-center py-12 text-gray-500">
                    <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No videos yet. Add one to get started!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
