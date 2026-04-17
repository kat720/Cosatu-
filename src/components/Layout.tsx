import React from 'react';
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { Home, Users, CreditCard, BookOpen, User, Bell, Search, AlertCircle, ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  hideNav?: boolean;
}

export default function Layout({ children, title = 'COSATU', showBack = false, hideNav = false }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Unions', path: '/unions' },
    { icon: CreditCard, label: 'Membership', path: '/membership' },
    { icon: BookOpen, label: 'Resources', path: '/resources' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row max-w-[1400px] mx-auto relative">
      {/* Side Navigation for Desktop */}
      {!hideNav && (
        <nav className="hidden lg:flex flex-col w-[220px] bg-white border-r border-slate-100 p-6 sticky top-0 h-screen shrink-0">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-red-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-700/20">
              C
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-lg">COSATU</span>
          </div>

          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                    isActive ? 'bg-red-50 text-red-700' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="mt-auto pt-6 border-t border-slate-50">
            <button 
              onClick={() => navigate('/report-dispute')}
              className="w-full bg-red-700 text-white p-4 rounded-2xl shadow-lg shadow-red-700/20 flex items-center justify-center gap-2 font-bold text-sm active:scale-95 transition-all"
            >
              <AlertCircle size={18} />
              Report Issue
            </button>
          </div>
        </nav>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar (Mobile Only) */}
        <header className="bg-white border-b border-slate-100 p-4 sticky top-0 z-50 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            {showBack ? (
              <button onClick={() => navigate(-1)} className="p-1 hover:bg-slate-50 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-slate-600" />
              </button>
            ) : (
              <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                C
              </div>
            )}
            <span className="font-bold text-slate-900 tracking-tight">{title}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Desktop Header (Optional, for Search/Notifications) */}
        <header className="hidden lg:flex bg-white border-b border-slate-100 p-6 sticky top-0 z-50 items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-slate-50 border border-slate-100 rounded-2xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 w-64"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
            </button>
            <Link to="/profile" className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img src="https://picsum.photos/seed/user/100/100" alt="Profile" referrerPolicy="no-referrer" />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 max-w-[1200px] w-full mx-auto p-4 lg:p-8 ${hideNav ? '' : 'pb-24 lg:pb-8'}`}>
          {children}
        </main>

        {/* Floating Action Button (Mobile Only) */}
        {!hideNav && (
          <button 
            onClick={() => navigate('/report-dispute')}
            className="lg:hidden fixed bottom-24 right-6 bg-red-700 text-white p-4 rounded-full shadow-2xl shadow-red-700/40 flex items-center justify-center z-40 active:scale-95 transition-all border-2 border-white/20"
            title="Report Workplace Issue"
          >
            <AlertCircle size={24} />
          </button>
        )}

        {/* Bottom Navigation (Mobile Only) */}
        {!hideNav && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 py-3 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] lg:hidden">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex flex-col items-center gap-1 flex-1 ${isActive ? 'text-red-700' : 'text-slate-400'}`}
                >
                  <item.icon size={22} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
}
