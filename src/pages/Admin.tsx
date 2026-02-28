import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import * as XLSX from "xlsx";
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
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
  Trash2
} from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_country: string;
  message: string;
  created_at: string;
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
  email: string;
  full_name: string;
  is_admin: boolean;
  created_at: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [brochureDownloads, setBrochureDownloads] = useState<BrochureDownload[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [activeTab, setActiveTab] = useState<'contacts' | 'applications' | 'brochures' | 'students'>('contacts');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate('/signin');
      return;
    }

    const { data: studentData } = await supabase
      .from('students')
      .select('is_admin')
      .eq('id', user.id)
      .maybeSingle();

    if (!studentData?.is_admin) {
      navigate('/dashboard');
      return;
    }

    setUser(user);
    setIsAdmin(true);
    setLoading(false);
    fetchAllData();
  };

  const fetchAllData = async () => {
    const [contactsRes, applicationsRes, brochuresRes, studentsRes] = await Promise.all([
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("applications").select("*, students(full_name)").order("created_at", { ascending: false }),
      supabase.from("brochure_downloads").select("*").order("created_at", { ascending: false }),
      supabase.from("students").select("*").order("created_at", { ascending: false })
    ]);

    if (contactsRes.data) setContactSubmissions(contactsRes.data);
    if (applicationsRes.data) setApplications(applicationsRes.data);
    if (brochuresRes.data) setBrochureDownloads(brochuresRes.data);
    if (studentsRes.data) setStudents(studentsRes.data);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return;

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (!error) {
      setContactSubmissions(prev => prev.filter(item => item.id !== id));
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);

    if (!error) {
      setApplications(prev => prev.filter(item => item.id !== id));
    }
  };

  const deleteBrochure = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brochure download?')) return;

    const { error } = await supabase
      .from('brochure_downloads')
      .delete()
      .eq('id', id);

    if (!error) {
      setBrochureDownloads(prev => prev.filter(item => item.id !== id));
    }
  };

  const deleteStudent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student account? This will also delete all their applications.')) return;

    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);

    if (!error) {
      setStudents(prev => prev.filter(item => item.id !== id));
    }
  };

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();

    const contactsSheet = XLSX.utils.json_to_sheet(
      contactSubmissions.map(item => ({
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        Country: item.preferred_country,
        Message: item.message,
        Date: new Date(item.created_at).toLocaleString('en-IN')
      }))
    );
    XLSX.utils.book_append_sheet(workbook, contactsSheet, "Contact Submissions");

    const applicationsSheet = XLSX.utils.json_to_sheet(
      applications.map(item => ({
        Student: item.students?.full_name || 'N/A',
        University: item.university,
        Course: item.course,
        Country: item.country,
        Intake: item.intake,
        Status: item.status,
        Date: new Date(item.created_at).toLocaleString('en-IN')
      }))
    );
    XLSX.utils.book_append_sheet(workbook, applicationsSheet, "Applications");

    const brochuresSheet = XLSX.utils.json_to_sheet(
      brochureDownloads.map(item => ({
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        Country: item.country,
        Date: new Date(item.created_at).toLocaleString('en-IN')
      }))
    );
    XLSX.utils.book_append_sheet(workbook, brochuresSheet, "Brochure Downloads");

    const studentsSheet = XLSX.utils.json_to_sheet(
      students.map(item => ({
        Name: item.full_name,
        Email: item.email,
        'Admin Status': item.is_admin ? 'Admin' : 'User',
        'Registration Date': new Date(item.created_at).toLocaleString('en-IN')
      }))
    );
    XLSX.utils.book_append_sheet(workbook, studentsSheet, "Students");

    XLSX.writeFile(workbook, `HN_Study_Abroad_Data_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const filterData = <T extends Record<string, any>>(data: T[]): T[] => {
    if (!searchTerm) return data;

    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
      applied: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
      offer: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      visa: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      departure: { bg: 'bg-turquoise/20', text: 'text-turquoise', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig.applied;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        <Icon className="w-4 h-4 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ghost-green">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const filteredContacts = filterData(contactSubmissions);
  const filteredApplications = filterData(applications);
  const filteredBrochures = filterData(brochureDownloads);
  const filteredStudents = filterData(students);

  return (
    <section className="min-h-screen pt-24 pb-12 bg-ghost-green">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-heading mb-2">Admin Dashboard</h1>
            <p className="text-body-text">Welcome back, {user.email}</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={downloadExcel}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Export to Excel
            </button>
            <button
              onClick={logout}
              className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-text text-sm font-semibold mb-1">Contact Submissions</p>
                <p className="text-3xl font-bold text-heading">{contactSubmissions.length}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-text text-sm font-semibold mb-1">Applications</p>
                <p className="text-3xl font-bold text-heading">{applications.length}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-text text-sm font-semibold mb-1">Brochure Downloads</p>
                <p className="text-3xl font-bold text-heading">{brochureDownloads.length}</p>
              </div>
              <div className="w-14 h-14 bg-turquoise/20 rounded-full flex items-center justify-center">
                <FileText className="w-7 h-7 text-turquoise" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body-text text-sm font-semibold mb-1">Registered Students</p>
                <p className="text-3xl font-bold text-heading">{students.length}</p>
              </div>
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  activeTab === 'contacts'
                    ? 'text-turquoise border-b-2 border-turquoise'
                    : 'text-body-text hover:text-heading'
                }`}
              >
                Contact Submissions ({contactSubmissions.length})
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  activeTab === 'applications'
                    ? 'text-turquoise border-b-2 border-turquoise'
                    : 'text-body-text hover:text-heading'
                }`}
              >
                Applications ({applications.length})
              </button>
              <button
                onClick={() => setActiveTab('brochures')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  activeTab === 'brochures'
                    ? 'text-turquoise border-b-2 border-turquoise'
                    : 'text-body-text hover:text-heading'
                }`}
              >
                Brochure Downloads ({brochureDownloads.length})
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-4 py-2 font-semibold transition-colors ${
                  activeTab === 'students'
                    ? 'text-turquoise border-b-2 border-turquoise'
                    : 'text-body-text hover:text-heading'
                }`}
              >
                Students ({students.length})
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-body-text w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'contacts' && (
              <table className="w-full">
                <thead className="bg-ghost-green">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Country</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Message</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredContacts.map((item) => (
                    <tr key={item.id} className="hover:bg-ghost-green transition-colors">
                      <td className="px-6 py-4 text-sm text-heading font-semibold">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-turquoise" />
                          {item.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-turquoise" />
                          {item.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-turquoise" />
                          {item.preferred_country}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-body-text max-w-xs truncate">{item.message}</td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-turquoise" />
                          {new Date(item.created_at).toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteContact(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'applications' && (
              <table className="w-full">
                <thead className="bg-ghost-green">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Student Name</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">University</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Course</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Country</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Intake</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((item) => (
                    <tr key={item.id} className="hover:bg-ghost-green transition-colors">
                      <td className="px-6 py-4 text-sm text-heading font-semibold">{item.students?.full_name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-turquoise" />
                          {item.university}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-body-text">{item.course}</td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-turquoise" />
                          {item.country}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-body-text">{item.intake}</td>
                      <td className="px-6 py-4 text-sm">{getStatusBadge(item.status)}</td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-turquoise" />
                          {new Date(item.created_at).toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteApplication(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'brochures' && (
              <table className="w-full">
                <thead className="bg-ghost-green">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Country</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBrochures.map((item) => (
                    <tr key={item.id} className="hover:bg-ghost-green transition-colors">
                      <td className="px-6 py-4 text-sm text-heading font-semibold">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-turquoise" />
                          {item.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-turquoise" />
                          {item.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-turquoise" />
                          {item.country}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-turquoise" />
                          {new Date(item.created_at).toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteBrochure(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'students' && (
              <table className="w-full">
                <thead className="bg-ghost-green">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Full Name</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Admin Status</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Registration Date</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-heading">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((item) => (
                    <tr key={item.id} className="hover:bg-ghost-green transition-colors">
                      <td className="px-6 py-4 text-sm text-heading font-semibold">{item.full_name}</td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-turquoise" />
                          {item.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          item.is_admin
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.is_admin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-body-text">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-turquoise" />
                          {new Date(item.created_at).toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteStudent(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                          disabled={item.is_admin}
                        >
                          <Trash2 className={`w-5 h-5 ${item.is_admin ? 'opacity-30 cursor-not-allowed' : ''}`} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {((activeTab === 'contacts' && filteredContacts.length === 0) ||
            (activeTab === 'applications' && filteredApplications.length === 0) ||
            (activeTab === 'brochures' && filteredBrochures.length === 0) ||
            (activeTab === 'students' && filteredStudents.length === 0)) && (
            <div className="text-center py-12">
              <p className="text-body-text">No data found {searchTerm && 'matching your search'}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
