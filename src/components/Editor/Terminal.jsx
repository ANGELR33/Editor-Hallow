import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Trash2, Copy, Check } from 'lucide-react';
import './Terminal.css';

const Terminal = ({ output, onClear, isRunning }) => {
    const [copied, setCopied] = useState(false);
    const terminalRef = useRef(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);

    const handleCopy = () => {
        navigator.clipboard.writeText(output.map(o => o.text).join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="terminal-container">
            <div className="terminal-header">
                <div className="terminal-title">
                    <TerminalIcon size={16} strokeWidth={1.5} />
                    <span>Terminal</span>
                    {isRunning && <span className="running-indicator">Running</span>}
                </div>
                <div className="terminal-actions">
                    <button
                        className="terminal-btn"
                        onClick={handleCopy}
                        title="Copiar output"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    <button
                        className="terminal-btn"
                        onClick={onClear}
                        title="Limpiar terminal"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            <div className="terminal-output" ref={terminalRef}>
                {output.length === 0 ? (
                    <div className="terminal-empty">
                        <TerminalIcon size={18} />
                        <span className="terminal-muted">Ejecuta tu código para ver el output...</span>
                    </div>
                ) : (
                    output.map((line, index) => (
                        <div key={index} className={`terminal-line ${line.type}`}>
                            <span className="terminal-prompt">›</span>
                            <span className="terminal-text">{line.text}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Terminal;
