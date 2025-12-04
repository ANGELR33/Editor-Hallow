import React from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

// Cyberpunk/Neon Theme based on user reference
const halloweenTheme = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff79c6', fontStyle: 'bold' },
        { token: 'keyword.control', foreground: 'ff79c6', fontStyle: 'bold' },
        { token: 'storage', foreground: 'ff79c6' },
        { token: 'storage.type', foreground: 'ff79c6' },
        { token: 'string', foreground: 'f1fa8c' },
        { token: 'constant.numeric', foreground: 'bd93f9' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'entity.name.function', foreground: '50fa7b' },
        { token: 'function', foreground: '50fa7b' },
        { token: 'variable', foreground: 'f8f8f2' },
        { token: 'variable.parameter', foreground: 'ffb86c' },
        { token: 'variable.other.constant', foreground: 'bd93f9' },
        { token: 'entity.name.type', foreground: '8be9fd' },
        { token: 'class', foreground: '8be9fd' },
        { token: 'support.class', foreground: '8be9fd' },
        { token: 'entity.name.tag', foreground: 'ff79c6' },
        { token: 'tag', foreground: 'ff79c6' },
        { token: 'entity.other.attribute-name', foreground: '50fa7b' },
        { token: 'attribute.name', foreground: '50fa7b' },
        { token: 'punctuation', foreground: 'f8f8f2' },
        { token: 'meta.brace', foreground: 'f8f8f2' },
        { token: 'meta.delimiter', foreground: 'f8f8f2' },
    ],
    colors: {
        'editor.background': '#00000000',
        'editor.foreground': '#f8f8f2',
        'editor.lineHighlightBackground': '#ffffff05',
        'editor.selectionBackground': '#44475a',
        'editorCursor.foreground': '#ff79c6',
        'editorLineNumber.foreground': '#6272a4',
        'editorLineNumber.activeForeground': '#f8f8f2',
        'editorIndentGuide.background': '#ffffff10',
        'editorIndentGuide.activeBackground': '#ffffff30',
    }
};

const CodeEditor = ({
    code,
    onChange,
    language = 'javascript',
    readOnly = false,
    height = '100%'
}) => {

    const handleEditorDidMount = (editor, monaco) => {
        monaco.editor.defineTheme('halloween-neon', halloweenTheme);
        monaco.editor.setTheme('halloween-neon');

        editor.updateOptions({
            fontSize: 15,
            fontFamily: "'Source Code Pro', 'JetBrains Mono', monospace", // Changed to Source Code Pro
            fontLigatures: true,
            fontWeight: '500',
            lineHeight: 26,
            letterSpacing: 0.5,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            cursorStyle: 'line',
            cursorWidth: 2, // Reduced width as requested
            smoothScrolling: true,
            padding: { top: 24, bottom: 24 },
            bracketPairColorization: { enabled: true },
            guides: {
                bracketPairs: true,
                indentation: true,
            },
            scrollbar: {
                vertical: 'visible',
                horizontal: 'auto',
                useShadows: false,
                verticalScrollbarSize: 10,
            },
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            matchBrackets: 'always',
            wordWrap: 'on',
            tabSize: 2,
            insertSpaces: true,
            formatOnPaste: true,
            formatOnType: true,
        });
    };

    const getMonacoLanguage = (lang) => {
        const langMap = {
            javascript: 'javascript',
            js: 'javascript',
            html: 'html',
            css: 'css',
            python: 'python',
            py: 'python'
        };
        return langMap[lang] || 'javascript';
    };

    return (
        <div className="code-editor-wrapper">
            <Editor
                height={height}
                language={getMonacoLanguage(language)}
                value={code}
                onChange={onChange}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                loading={
                    <div className="editor-loading">
                        <div className="loading-spinner"></div>
                    </div>
                }
                options={{
                    readOnly,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
