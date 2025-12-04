import React from 'react';
import {
    Code2,
    Trophy,
    Home,
    Github,
    Sparkles
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeMode, onModeChange }) => {
    const menuItems = [
        { id: 'home', icon: Home, label: 'Inicio' },
        { id: 'editor', icon: Code2, label: 'Editor Libre' },
        { id: 'challenges', icon: Trophy, label: 'Retos' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon">
                        <Sparkles size={18} />
                    </div>
                    <span className="logo-text">Halloween<br />Code</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeMode === item.id ? 'active' : ''}`}
                        onClick={() => onModeChange(item.id)}
                    >
                        <item.icon size={20} strokeWidth={1.5} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    <Github size={18} strokeWidth={1.5} />
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
