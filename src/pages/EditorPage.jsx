import React, { useState } from 'react';
import { Play, RotateCcw, FileCode, Braces, Palette, Cpu, Layers, GitBranch, CheckCircle2, Eye, Terminal as TerminalIcon } from 'lucide-react';
import CodeEditor from '../components/Editor/CodeEditor';
import Terminal from '../components/Editor/Terminal';
import Preview from '../components/Editor/Preview';
import useCodeExecution from '../hooks/useCodeExecution';
import './EditorPage.css';

const defaultJs = `// 🎃 Halloween Code Editor
function greet(name) {
  return \`👻 Bienvenido, \${name}!\`
}
console.log(greet("Developer"))`;

const defaultHtml = `<!-- Escribe tu HTML aquí -->
<div class="card">
  <h1>🎃 Halloween</h1>
  <p>Bienvenido al editor oscuro</p>
  <button id="btn">Asustar</button>
</div>`;

const defaultCss = `/* Estilos CSS */
body {
  background: #1a1a1a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  border: 1px solid #ff6b35;
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.2);
}

h1 { color: #ff6b35; }

button {
  background: #ff6b35;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background: #ff8c00;
}`;

const EditorPage = () => {
    const [activeTab, setActiveTab] = useState('javascript');

    // Initialize state from localStorage or defaults
    const [jsCode, setJsCode] = useState(() => localStorage.getItem('halloween-editor-js') || defaultJs);
    const [htmlCode, setHtmlCode] = useState(() => localStorage.getItem('halloween-editor-html') || defaultHtml);
    const [cssCode, setCssCode] = useState(() => localStorage.getItem('halloween-editor-css') || defaultCss);
    const [showPreview, setShowPreview] = useState(false);

    // Save to localStorage whenever code changes
    React.useEffect(() => {
        localStorage.setItem('halloween-editor-js', jsCode);
    }, [jsCode]);

    React.useEffect(() => {
        localStorage.setItem('halloween-editor-html', htmlCode);
    }, [htmlCode]);

    React.useEffect(() => {
        localStorage.setItem('halloween-editor-css', cssCode);
    }, [cssCode]);

    const { output, isRunning, executeJavaScript, clearOutput } = useCodeExecution();

    const handleRun = () => {
        if (activeTab === 'javascript') {
            executeJavaScript(jsCode);
            setShowPreview(false);
        } else {
            setShowPreview(true);
        }
    };

    const handleReset = () => {
        if (activeTab === 'javascript') setJsCode(defaultJs);
        if (activeTab === 'html') setHtmlCode(defaultHtml);
        if (activeTab === 'css') setCssCode(defaultCss);
        clearOutput();
    };

    const getCode = () => {
        switch (activeTab) {
            case 'javascript': return jsCode;
            case 'html': return htmlCode;
            case 'css': return cssCode;
            default: return '';
        }
    };

    const setCode = (newCode) => {
        switch (activeTab) {
            case 'javascript': setJsCode(newCode); break;
            case 'html': setHtmlCode(newCode); break;
            case 'css': setCssCode(newCode); break;
        }
    };

    const tabs = [
        { id: 'javascript', name: 'script.js', icon: Braces },
        { id: 'html', name: 'index.html', icon: FileCode },
        { id: 'css', name: 'style.css', icon: Palette },
    ];

    return (
        <div className="editor-page">
            {/* Toolbar */}
            <div className="editor-toolbar">
                <div className="toolbar-left">
                    <div className="language-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`lang-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    if (tab.id !== 'javascript') setShowPreview(true);
                                }}
                            >
                                <tab.icon size={14} strokeWidth={2} />
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="toolbar-right">
                    <button className="btn btn-secondary" onClick={() => setShowPreview(!showPreview)}>
                        {showPreview ? <TerminalIcon size={14} /> : <Eye size={14} />}
                        {showPreview ? 'Ver Terminal' : 'Ver Preview'}
                    </button>
                    <button className="btn btn-secondary" onClick={handleReset}>
                        <RotateCcw size={14} strokeWidth={2} />
                        Reset
                    </button>
                    <button className="btn btn-primary" onClick={handleRun} disabled={isRunning}>
                        <Play size={14} strokeWidth={2} fill="currentColor" />
                        {activeTab === 'javascript' ? 'Run JS' : 'Update Preview'}
                    </button>
                </div>
            </div>

            {/* Editor Layout */}
            <div className="editor-layout">
                <div className="editor-panel">
                    <div className="editor-wrapper">
                        <CodeEditor
                            code={getCode()}
                            onChange={setCode}
                            language={activeTab}
                        />
                    </div>
                </div>

                <div className="terminal-panel">
                    {showPreview ? (
                        <Preview
                            html={htmlCode}
                            css={cssCode}
                            js={jsCode}
                        />
                    ) : (
                        <Terminal
                            output={output}
                            onClear={clearOutput}
                            isRunning={isRunning}
                        />
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <div className="status-bar">
                <div className="status-left">
                    <div className="status-item">
                        <GitBranch size={12} />
                        <span>main</span>
                    </div>
                    <div className="status-item">
                        <CheckCircle2 size={12} color="#00ff88" />
                        <span>Ready</span>
                    </div>
                </div>
                <div className="status-right">
                    <div className="status-item">
                        <Layers size={12} />
                        <span>{showPreview ? 'Preview Mode' : 'Terminal Mode'}</span>
                    </div>
                    <div className="status-item">
                        <Cpu size={12} />
                        <span>UTF-8</span>
                    </div>
                    <div className="status-item">
                        <span>{activeTab.toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPage;
