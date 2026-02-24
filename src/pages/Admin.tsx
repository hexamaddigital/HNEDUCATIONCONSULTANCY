import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import * as XLSX from "xlsx";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(data.user);
      fetchData();
    }
  };

  const login = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({ email, password });
    checkUser();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setData(data || []);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, "leads.xlsx");
  };

  if (!user) {
    return (
      <div style={{ padding: 50 }}>
        <h2>Admin Login</h2>
        <button
          onClick={() =>
            login("youradmin@email.com", "yourpassword")
          }
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 50 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <button onClick={downloadExcel} style={{ marginLeft: 10 }}>
        Download Excel
      </button>

      <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.preferred_country}</td>
              <td>{item.message}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}