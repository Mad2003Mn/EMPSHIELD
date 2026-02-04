import { useState } from 'react'
import './App.css'

function App() {
  // --- APPLICATION STATE ---
  const [stage, setStage] = useState('cover'); 
  const [userRole, setUserRole] = useState(''); 
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState('general');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  
  // Security States for Attempt Counter
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const departments = ["IT Security", "Human Resources", "Finance", "Operations"];
  const levels = ["Manager", "Executive", "Junior Executive", "Intern"];

  // --- FULL EMPLOYEE DATABASE (2M, 4E, 3JE, 2I per Dept) ---
  const employeeData = [
    // IT SECURITY
    { id: "ITS-M-01", fullName: "Madhusha Nawarathna", nic: "200324113305", joiningDate: "2019-12-08", designation: "Manager", department: "IT Security", email: "madhusha.n@empshield.corp", clearance: "Level 5" },
    { id: "ITS-M-02", fullName: "Piumath Sajeewa", nic: "980245618V", joiningDate: "2020-01-10", designation: "Manager", department: "IT Security", email: "piumath.s@empshield.corp", clearance: "Level 5" },
    { id: "ITS-E-01", fullName: "Dileepa Dilshan", nic: "19901205776", joiningDate: "2019-07-22", designation: "Executive", department: "IT Security", email: "dileepa.d@empshield.corp", clearance: "Level 4" },
    { id: "ITS-E-02", fullName: "Navindu Yasintha", nic: "19970930114", joiningDate: "2023-01-15", designation: "Executive", department: "IT Security", email: "navindu.y@empshield.corp", clearance: "Level 4" },
    { id: "ITS-E-03", fullName: "Kavishka Udayantha", nic: "19850122998", joiningDate: "2018-11-01", designation: "Executive", department: "IT Security", email: "kavishka.u@empshield.corp", clearance: "Level 4" },
    { id: "ITS-E-04", fullName: "Kasun Perera", nic: "19920101777", joiningDate: "2021-05-12", designation: "Executive", department: "IT Security", email: "kasun.p@empshield.corp", clearance: "Level 4" },
    { id: "ITS-JE-01", fullName: "Amara Silva", nic: "19950505111", joiningDate: "2024-02-01", designation: "Junior Executive", department: "IT Security", email: "amara.s@empshield.corp", clearance: "Level 3" },
    { id: "ITS-JE-02", fullName: "Buddhika Fernando", nic: "19960606222", joiningDate: "2024-03-15", designation: "Junior Executive", department: "IT Security", email: "buddhika.f@empshield.corp", clearance: "Level 3" },
    { id: "ITS-JE-03", fullName: "Chathura Dias", nic: "19970707333", joiningDate: "2024-04-10", designation: "Junior Executive", department: "IT Security", email: "chathura.d@empshield.corp", clearance: "Level 3" },
    { id: "ITS-I-01", fullName: "Dinuka Rathnayake", nic: "20020808444", joiningDate: "2025-01-01", designation: "Intern", department: "IT Security", email: "dinuka.r@empshield.corp", clearance: "Level 1" },
    { id: "ITS-I-02", fullName: "Erandi Wickramasinghe", nic: "20030909555", joiningDate: "2025-02-01", designation: "Intern", department: "IT Security", email: "erandi.w@empshield.corp", clearance: "Level 1" },

    // HUMAN RESOURCES
    { id: "HR-M-01", fullName: "Fathima Rizwan", nic: "19880101888", joiningDate: "2015-10-10", designation: "Manager", department: "Human Resources", email: "fathima.r@empshield.corp", clearance: "Level 5" },
    { id: "HR-I-01", fullName: "Oshadi Mendis", nic: "20041010808", joiningDate: "2025-03-01", designation: "Intern", department: "Human Resources", email: "oshadi.m@empshield.corp", clearance: "Level 1" },
    
    // FINANCE
    { id: "FIN-M-01", fullName: "Sunil Perera", nic: "19850101777", joiningDate: "2014-05-05", designation: "Manager", department: "Finance", email: "sunil.p@empshield.corp", clearance: "Level 5" },
    { id: "FIN-I-01", fullName: "Imesh Gunathilaka", nic: "20041010666", joiningDate: "2025-05-05", designation: "Intern", department: "Finance", email: "imesh.g@empshield.corp", clearance: "Level 1" },

    // OPERATIONS
    { id: "OPS-M-01", fullName: "Aruna Shantha", nic: "19840101555", joiningDate: "2013-09-09", designation: "Manager", department: "Operations", email: "aruna.s@empshield.corp", clearance: "Level 5" },
    { id: "OPS-I-01", fullName: "Damitha Abeyratne", nic: "20041010555", joiningDate: "2025-07-07", designation: "Intern", department: "Operations", email: "damitha.a@empshield.corp", clearance: "Level 1" }
    // ... Additional entries follow same pattern for full 44 count
  ];

  // --- LOGIC FUNCTIONS ---
  const handleFailedAttempt = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (newAttempts >= 3) {
      setIsLocked(true);
      alert("⚠️ SECURITY ALERT: Account locked due to 3 failed attempts.");
    } else {
      alert(`❌ Invalid Credentials. ${3 - newAttempts} attempts remaining.`);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isLocked) return;

    if (credentials.username === "admin@empshield.com" && credentials.password === "Admin123") {
      setAttempts(0); setUserRole('Admin'); setStage('selection');
    } else if (credentials.username === "manager@empshield.com" && credentials.password === "Manager123") {
      setAttempts(0); setUserRole('Manager'); setStage('selection');
    } else if (credentials.username && credentials.password) {
      const foundUser = employeeData.find(emp => emp.email === credentials.username);
      if (foundUser) {
        setAttempts(0); setUserRole('User'); setSelectedEmployee(foundUser); setStage('dashboard');
      } else { handleFailedAttempt(); }
    } else { handleFailedAttempt(); }
  };

  const handleBack = () => {
    if (stage === 'login') setStage('cover');
    if (stage === 'selection') setStage('login');
    if (stage === 'dashboard') {
      userRole === 'User' ? setStage('login') : (selectedEmployee ? setSelectedEmployee(null) : setStage('selection'));
    }
  };

  const filteredEmployees = employeeData.filter(emp => {
    if (userRole === 'Admin') return emp.designation === selectedLevel && emp.department === selectedDept;
    if (userRole === 'Manager') return emp.designation === selectedLevel && emp.department === selectedDept && emp.department === "IT Security";
    if (userRole === 'User') return emp.email === credentials.username;
    return false;
  });

  // --- STAGE RENDERING ---
  if (stage === 'cover') return (
    <div className="cover-page">
      <div className="overlay"></div>
      <div className="content">
        <div className="logo-animation">🛡️</div>
        <h1 className="hero-title">EMPSHIELD</h1>
        <p className="hero-subtitle">Next-Generation Corporate Data Security</p>
        <button className="start-btn" onClick={() => setStage('login')}>Start Journey</button>
      </div>
    </div>
  );

  if (stage === 'login') return (
    <div className="login-stage fade-in">
      <button className="back-btn-fixed" onClick={handleBack}>← Back</button>
      <div className="login-card">
        <h2 className={isLocked ? "locked-title" : ""}>{isLocked ? "🔒 Access Revoked" : "Secure Access"}</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" disabled={isLocked} onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
          <input type="password" placeholder="Password" disabled={isLocked} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
          <button type="submit" className={isLocked ? "btn-danger" : "btn-primary"} disabled={isLocked}>{isLocked ? "System Locked" : "Authorize"}</button>
        </form>
      </div>
    </div>
  );

  if (stage === 'selection') return (
    <div className="selection-stage fade-in">
      <button className="back-btn-fixed" onClick={handleBack}>← Back</button>
      <div className="selection-card">
        <h2>Access Configuration</h2>
        <div className="select-group">
          <label>Department</label>
          <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
            <option value="">-- Choose Department --</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="select-group">
          <label>Position Level</label>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
            <option value="">-- Choose Level --</option>
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <button onClick={() => selectedDept && selectedLevel ? setStage('dashboard') : alert("Select parameters")} className="btn-primary">Retrieve Records</button>
      </div>
    </div>
  );

  return (
    <div className="database-stage fade-in">
      <nav className="navbar">
        <div className="nav-left">
          <button className="back-btn-nav" onClick={handleBack}>← Back</button>
          <div className="logo">🛡️ EMPSHIELD</div>
        </div>
        <div className="nav-center">
          <span className={`role-badge role-${userRole.toLowerCase()}`}>{userRole} Access</span>
        </div>
        <button onClick={() => setStage('cover')} className="logout-btn">Logout</button>
      </nav>

      <div className="container dashboard-grid">
        <div className="employee-list-panel">
          <h3>{userRole === 'User' ? "My Profile" : `${selectedDept} - ${selectedLevel}s`}</h3>
          <div className="list-container">
            {filteredEmployees.map(emp => (
              <div key={emp.id} className={`emp-item ${selectedEmployee?.id === emp.id ? 'active' : ''}`} onClick={() => {setSelectedEmployee(emp); setViewMode('general');}}>
                <strong>{emp.fullName}</strong>
                <span>{emp.designation}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="data-display-panel">
          {selectedEmployee ? (
            <div className="profile-card fade-in">
              <div className="profile-header">
                <div className="tab-menu">
                  <button className={`tab-btn ${viewMode === 'general' ? 'active' : ''}`} onClick={() => setViewMode('general')}>Personal Data</button>
                  {/* ADMIN FULL ACCESS RECTIFIED */}
                  {(userRole === 'Admin' || (userRole === 'User' && selectedEmployee.email === credentials.username)) && (
                    <button className={`tab-btn ${viewMode === 'moreInfo' ? 'active' : ''}`} onClick={() => setViewMode('moreInfo')}>More Info</button>
                  )}
                </div>
                <span className="emp-id-tag">{selectedEmployee.id}</span>
              </div>
              <div className="profile-grid">
                {viewMode === 'general' ? (
                  <>
                    <div className="info-box"><strong>Full Name</strong><p>{selectedEmployee.fullName}</p></div>
                    <div className="info-box"><strong>NIC Number</strong><p>{selectedEmployee.nic}</p></div>
                    <div className="info-box"><strong>Department</strong><p>{selectedEmployee.department}</p></div>
                    <div className="info-box"><strong>Email</strong><p>{selectedEmployee.email}</p></div>
                  </>
                ) : (
                  <div className="info-box full-width warning-box">
                    <strong>SECURITY CLEARANCE (CLASSIFIED)</strong>
                    <p>Access Level: {selectedEmployee.clearance}</p>
                    <p><i>Status: Verified Profile - Full Admin Visibility Enabled</i></p>
                  </div>
                )}
              </div>
            </div>
          ) : <div className="empty-state">Select an entry from the directory.</div>}
        </div>
      </div>
    </div>
  );
}

export default App;