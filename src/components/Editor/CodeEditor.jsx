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

        // Configure HTML auto-closing tags
        monaco.languages.html.htmlDefaults.setOptions({
            format: {
                tabSize: 2,
                insertSpaces: true,
                wrapLineLength: 120,
                unformatted: 'default',
                contentUnformatted: 'pre',
                indentInnerHtml: false,
                preserveNewLines: true,
                maxPreserveNewLines: null,
                indentHandlebars: false,
                endWithNewline: false,
                extraLiners: 'head, body, /html',
                wrapAttributes: 'auto',
            },
            suggest: {
                html5: true,
            },
        });

        // Ensure auto-closing tags works
        monaco.languages.registerCompletionItemProvider('html', {
            triggerCharacters: ['>'],
            provideCompletionItems: (model, position) => {
                const codePre = model.getValueInRange({
                    startLineNumber: position.lineNumber,
                    startColumn: 1,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                });

                const tag = codePre.match(/<(\w+)>$/);

                if (!tag) {
                    return;
                }

                const tagName = tag[1];

                // Void elements that don't need closing tags
                const voidElements = [
                    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
                    'link', 'meta', 'param', 'source', 'track', 'wbr'
                ];

                if (voidElements.includes(tagName)) {
                    return;
                }

                return {
                    suggestions: [
                        {
                            label: `</${tagName}>`,
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: `$0</${tagName}>`,
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: `Auto-close tag </${tagName}>`,
                            range: {
                                startLineNumber: position.lineNumber,
                                startColumn: position.column,
                                endLineNumber: position.lineNumber,
                                endColumn: position.column,
                            }
                        },
                    ],
                };
            },
        });

        // JavaScript Snippets
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'clg',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'console.log(${1:value});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Log to console'
                    },
                    {
                        label: 'log',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'console.log(${1:value});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Log to console'
                    },
                    {
                        label: 'for',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'For Loop'
                    },
                    {
                        label: 'if',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'if (${1:condition}) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If Statement'
                    },
                    {
                        label: 'fun',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'function ${1:name}(${2:params}) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Function Declaration'
                    },
                    {
                        label: 'afn',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const ${1:name} = (${2:params}) => {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Arrow Function'
                    }
                ];
                return { suggestions: suggestions };
            }
        });

        // Enhanced HTML Snippets
        monaco.languages.registerCompletionItemProvider('html', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'div',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<div>$0</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Div element'
                    },
                    {
                        label: 'img',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<img src="${1:url}" alt="${2:description}" />',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Image element'
                    },
                    {
                        label: 'a',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<a href="${1:url}">$0</a>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Anchor element'
                    },
                    {
                        label: 'link',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<link rel="stylesheet" href="${1:style.css}">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Link element'
                    },
                    {
                        label: '!html',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t$0\n</body>\n</html>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 Boilerplate'
                    }
                ];
                return { suggestions: suggestions };
            }
        });

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
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            autoClosingOvertype: 'always',
            autoSurround: 'languageDefined',
            acceptSuggestionOnEnter: 'on',
            tabCompletion: 'on',
            snippetSuggestions: 'top',
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
