import React from 'react';
import {
    Code2,
    Trophy,
    Sparkles,
    Zap,
    BookOpen,
    Terminal,
    ChevronRight,
    Flame,
    Skull,
    Leaf,
    ArrowRight
} from 'lucide-react';
import './HomePage.css';

const HomePage = ({ onNavigate }) => {
    const features = [
        {
            icon: Code2,
            title: 'Editor Libre',
            description: 'Escribe y ejecuta código sin restricciones. Soporte completo para JavaScript.',
            color: 'orange',
            glow: 'rgba(255, 107, 53, 0.15)'
        },
        {
            icon: Trophy,
            title: 'Retos por Niveles',
            description: 'De Novato a Legendario. Supera desafíos progresivos y desbloquea tu potencial.',
            color: 'yellow',
            glow: 'rgba(255, 208, 0, 0.15)'
        },
        {
            icon: BookOpen,
            title: 'Aprende Teoría',
            description: 'Cada reto incluye explicaciones detalladas, claras y aplicables al mundo real.',
            color: 'purple',
            glow: 'rgba(168, 85, 247, 0.15)'
        },
        {
            icon: Terminal,
            title: 'Terminal Integrada',
            description: 'Ejecuta y valida tu código en tiempo real. Feedback instantáneo.',
            color: 'green',
            glow: 'rgba(0, 255, 136, 0.15)'
        }
    ];

    const levels = [
        { id: 'novato', icon: Leaf, name: 'Novato', color: '#00ff88' },
        { id: 'intermedio', icon: Flame, name: 'Intermedio', color: '#ffd000' },
        { id: 'avanzado', icon: Zap, name: 'Avanzado', color: '#a855f7' },
        { id: 'legendario', icon: Skull, name: 'Legendario', color: '#ff3b3b' }
    ];

    return (
        <div className="home-page">
            {/* Ambient Orbs */}
            <div className="ambient-orbs">
                <div className="orb orb-orange"></div>
                <div className="orb orb-purple"></div>
                <div className="orb orb-green"></div>
            </div>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge glass">
                        <Sparkles size={14} />
                        <span>Editor de Código Premium</span>
                    </div>

                    <h1 className="hero-title">
                        <span className="title-line">Halloween</span>
                        <span className="title-line title-gradient">Code Editor</span>
                    </h1>

                    <p className="hero-description">
                        Refuerza tus conocimientos de <strong>JavaScript</strong>, <strong>HTML</strong> y <strong>CSS</strong>
                        con retos prácticos y explicaciones teóricas que realmente te enseñan.
                    </p>

                    <div className="hero-actions">
                        <button className="btn btn-primary" onClick={() => onNavigate('challenges')}>
                            <Trophy size={18} />
                            Empezar Retos
                            <ArrowRight size={16} />
                        </button>
                        <button className="btn btn-secondary" onClick={() => onNavigate('editor')}>
                            <Code2 size={18} />
                            Editor Libre
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-value">10+</span>
                            <span className="stat-label">Retos</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-value">4</span>
                            <span className="stat-label">Niveles</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-value">3</span>
                            <span className="stat-label">Lenguajes</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="code-preview glass-strong">
                        <div className="preview-header">
                            <div className="preview-dots">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                            <span className="file-name">challenge.js</span>
                        </div>
                        <pre className="preview-code">
                            <code>
                                <span className="code-keyword">function</span>{' '}
                                <span className="code-function">translatePossessed</span>
                                <span className="code-paren">(</span>
                                <span className="code-param">message</span>
                                <span className="code-paren">)</span>{' '}
                                <span className="code-bracket">{'{'}</span>
                                {'\n'}
                                <span className="code-comment">{'  '}// Revierte cada palabra</span>
                                {'\n'}
                                <span className="code-keyword">{'  '}const</span> result = message
                                {'\n'}
                                {'    '}<span className="code-method">.split</span>(<span className="code-string">' '</span>)
                                {'\n'}
                                {'    '}<span className="code-method">.map</span>(w =&gt; [...w].<span className="code-method">reverse</span>().<span className="code-method">join</span>(<span className="code-string">''</span>))
                                {'\n'}
                                {'    '}<span className="code-method">.join</span>(<span className="code-string">' '</span>)
                                {'\n'}
                                {'  '}<span className="code-keyword">return</span> result
                                {'\n'}
                                <span className="code-bracket">{'}'}</span>
                            </code>
                        </pre>
                    </div>

                    <div className="floating-elements">
                        <div className="float-card float-1 glass">
                            <Terminal size={16} />
                            <span>Terminal Ready</span>
                        </div>
                        <div className="float-card float-2 glass">
                            <Zap size={16} />
                            <span>Fast Execution</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="features">
                <div className="section-header">
                    <h2 className="section-title">
                        <Zap size={24} />
                        Características
                    </h2>
                    <p className="section-subtitle">Todo lo que necesitas para dominar el código</p>
                </div>

                <div className="features-grid">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className={`feature-card glass`}
                            style={{ '--glow-color': feature.glow }}
                        >
                            <div className={`feature-icon icon-${feature.color}`}>
                                <feature.icon size={24} strokeWidth={1.5} />
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                            <div className="feature-arrow">
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Levels Preview */}
            <section className="levels-preview">
                <div className="section-header">
                    <h2 className="section-title">Niveles de Dificultad</h2>
                    <p className="section-subtitle">Progresa desde lo básico hasta lo legendario</p>
                </div>

                <div className="levels-row">
                    {levels.map((level, idx) => (
                        <div
                            key={level.id}
                            className={`level-card glass`}
                            style={{
                                '--level-color': level.color,
                                animationDelay: `${idx * 0.1}s`
                            }}
                        >
                            <div className="level-icon-wrapper">
                                <level.icon size={28} strokeWidth={1.5} />
                            </div>
                            <span className="level-name">{level.name}</span>
                            <div className="level-glow"></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
