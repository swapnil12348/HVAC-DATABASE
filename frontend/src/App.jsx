import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // --- AUTHENTICATION STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- DASHBOARD STATE ---
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the data ONLY if logged in
  useEffect(() => {
    if (isLoggedIn) {
      const fetchVendors = async () => {
        try {
          // Note: Ready for deployment using environment variables later
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          const response = await axios.get(`${apiUrl}/api/vendors`);
          setVendors(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching vendors:', error);
          setLoading(false);
        }
      };
      fetchVendors();
    }
  }, [isLoggedIn]); 

  // --- LOGIN LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    // Change your desired ID and Password here!
    if (loginId === 'hvac' && loginPass === '12345') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid ID or Password');
    }
  };

  // Global Search across ALL columns
  const filteredVendors = vendors.filter((vendor) => {
    const searchLower = searchQuery.toLowerCase();
    return Object.values(vendor).some((value) => 
      value && value.toString().toLowerCase().includes(searchLower)
    );
  });

  // ==========================================
  // SCREEN 1: LOGIN SCREEN
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4', fontFamily: 'system-ui' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '300px' }}>
          <h2 style={{ textAlign: 'center', marginTop: 0 }}>HVAC ERP Login</h2>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="Company ID" 
              value={loginId} 
              onChange={(e) => setLoginId(e.target.value)} 
              required 
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={loginPass} 
              onChange={(e) => setLoginPass(e.target.value)} 
              required 
              style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {loginError && <p style={{ color: 'red', margin: 0, fontSize: '14px', textAlign: 'center' }}>{loginError}</p>}
            
            <button type="submit" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // SCREEN 2: MAIN DASHBOARD
  // ==========================================
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🏢 HVAC vendor System </h1>
        <button onClick={() => setIsLoggedIn(false)} style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Vendor Directory</h2>
        <input 
          type="text" 
          placeholder="🔍 Search anything..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '10px', width: '350px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      {loading ? (
        <p>Loading vendors from cloud...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left', minWidth: '800px' }}>
            <thead style={{ backgroundColor: '#f4f4f4' }}>
              <tr>
                <th>Company</th>
                <th>Specialty</th>
                <th>Contact</th>
                <th>Designation</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Visiting Card</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor.vendor_id}>
                  <td><strong>{vendor.company_name}</strong></td>
                  <td>{vendor.material_specialty}</td>
                  <td>{vendor.contact_person}</td>
                  <td>{vendor.designation || '-'}</td>
                  <td>{vendor.phone || '-'}</td>
                  <td>{vendor.email || '-'}</td>
                  <td>
                    {vendor.visiting_card_url ? (
                      <a href={vendor.visiting_card_url} target="_blank" rel="noreferrer" style={{ color: 'blue' }}>View Card</a>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;