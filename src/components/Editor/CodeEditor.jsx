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

        // JavaScript Snippets (Context-Aware)
        monaco.languages.registerCompletionItemProvider('javascript', {
            triggerCharacters: ['.'],
            provideCompletionItems: (model, position) => {
                const textUntilPosition = model.getValueInRange({
                    startLineNumber: position.lineNumber,
                    startColumn: 1,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column
                });

                const hasDot = textUntilPosition.trim().endsWith('.');

                // 1. Structure Snippets (Top-level only)
                const structureSnippets = [
                    { label: 'clg', insertText: 'console.log(${1:value});', doc: 'Log to console' },
                    { label: 'log', insertText: 'console.log(${1:value});', doc: 'Log to console' },
                    { label: 'for', insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t$0\n}', doc: 'For Loop' },
                    { label: 'while', insertText: 'while (${1:condition}) {\n\t$0\n}', doc: 'While Loop' },
                    { label: 'dowhile', insertText: 'do {\n\t$0\n} while (${1:condition});', doc: 'Do-While Loop' },
                    { label: 'if', insertText: 'if (${1:condition}) {\n\t$0\n}', doc: 'If Statement' },
                    { label: 'ifelse', insertText: 'if (${1:condition}) {\n\t$2\n} else {\n\t$0\n}', doc: 'If-Else Statement' },
                    { label: 'switch', insertText: 'switch (${1:key}) {\n\tcase ${2:value}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}', doc: 'Switch Statement' },
                    { label: 'trycatch', insertText: 'try {\n\t$1\n} catch (error) {\n\t$0\n}', doc: 'Try-Catch Block' },
                    { label: 'fun', insertText: 'function ${1:name}(${2:params}) {\n\t$0\n}', doc: 'Function Declaration' },
                    { label: 'afn', insertText: 'const ${1:name} = (${2:params}) => {\n\t$0\n}', doc: 'Arrow Function' },
                    { label: 'arrow', insertText: '(${1:params}) => ${0:return}', doc: 'Implicit Return Arrow Function' },
                    { label: 'promise', insertText: 'new Promise((resolve, reject) => {\n\t$0\n})', doc: 'New Promise' },
                    { label: 'async', insertText: 'async function ${1:name}(${2:params}) {\n\t$0\n}', doc: 'Async Function' },
                    { label: 'class', insertText: 'class ${1:Name} {\n\tconstructor(${2:params}) {\n\t\t$0\n\t}\n}', doc: 'Class Declaration' },
                    { label: 'import', insertText: 'import ${1:module} from \'${2:path}\';', doc: 'Import Statement' },
                    { label: 'export', insertText: 'export default ${1:module};', doc: 'Export Default' }
                ];

                // 2. Member Snippets (Methods on objects)
                // insertText is for the DOT case (no prefix)
                const memberSnippets = [
                    // Array/Generics
                    { label: 'map', insertText: 'map((${1:item}) => {\n\t$0\n})', doc: 'Array Map' },
                    { label: 'filter', insertText: 'filter((${1:item}) => {\n\t$0\n})', doc: 'Array Filter' },
                    { label: 'reduce', insertText: 'reduce((acc, ${1:curr}) => {\n\t$0\n}, ${2:initial})', doc: 'Array Reduce' },
                    { label: 'forEach', insertText: 'forEach((${1:item}) => {\n\t$0\n})', doc: 'Array forEach' },
                    { label: 'find', insertText: 'find((${1:item}) => ${2:condition})', doc: 'Array Find' },
                    { label: 'reverse', insertText: 'reverse()', doc: 'Array Reverse' },
                    { label: 'join', insertText: 'join(\'${1:separator}\')', doc: 'Array Join' },
                    { label: 'push', insertText: 'push(${1:item})', doc: 'Array Push' },
                    { label: 'pop', insertText: 'pop()', doc: 'Array Pop' },
                    // String
                    { label: 'split', insertText: 'split(\'${1:separator}\')', doc: 'String Split' },
                    { label: 'substring', insertText: 'substring(${1:start}, ${2:end})', doc: 'String Substring' },
                    { label: 'toLowerCase', insertText: 'toLowerCase()', doc: 'String toLowerCase' },
                    { label: 'toUpperCase', insertText: 'toUpperCase()', doc: 'String toUpperCase' },
                    { label: 'replace', insertText: 'replace(/${1:regex}/, \'${2:replacement}\')', doc: 'String Replace' },
                    // DOM
                    { label: 'querySelector', insertText: 'querySelector(\'${1:selector}\')', doc: 'querySelector' },
                    { label: 'querySelectorAll', insertText: 'querySelectorAll(\'${1:selector}\')', doc: 'querySelectorAll' },
                    { label: 'addEventListener', insertText: 'addEventListener(\'${1:event}\', (e) => {\n\t$0\n});', doc: 'addEventListener' },
                ];

                const suggestions = [];

                if (hasDot) {
                    // Usage: myVar.| -> suggests "split(...)", "map(...)", etc.
                    memberSnippets.forEach(item => {
                        suggestions.push({
                            label: item.label,
                            kind: monaco.languages.CompletionItemKind.Method,
                            insertText: item.insertText,
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: item.doc
                        });
                    });
                } else {
                    // Usage: sp| -> suggests "string.split(...)" (generative) OR simple structure "if"
                    structureSnippets.forEach(item => {
                        suggestions.push({
                            label: item.label,
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: item.insertText,
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: item.doc
                        });
                    });

                    // Add member snippets in "Generative" mode (prefixed with typical variables)
                    memberSnippets.forEach(item => {
                        let prefix = '${1:array}';
                        if (['split', 'substring', 'toLowerCase', 'toUpperCase', 'replace'].includes(item.label)) {
                            prefix = '${1:string}';
                        } else if (['querySelector', 'querySelectorAll', 'addEventListener'].includes(item.label)) {
                            prefix = 'document';
                        }

                        // Increment placeholders for generative mode
                        let newInsertText = item.insertText
                            .replace(/\$\{(\d+):/g, (match, n) => `\$\{${parseInt(n) + 1}:`)
                            .replace(/\$\{(\d+)\}/g, (match, n) => `\$\{${parseInt(n) + 1}\}`);

                        suggestions.push({
                            label: item.label,
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: `${prefix}.${newInsertText}`,
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: item.doc
                        });
                    });
                }

                return { suggestions: suggestions };
            }
        });

        // Enhanced HTML Snippets
        monaco.languages.registerCompletionItemProvider('html', {
            provideCompletionItems: (model, position) => {
                const tags = [
                    // Structure
                    'html', 'head', 'body', 'div', 'span', 'header', 'footer', 'main', 'section', 'article', 'aside', 'nav',
                    // Text
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'strong', 'em', 'br', 'hr', 'blockquote', 'code', 'pre',
                    // Lists
                    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
                    // Forms
                    'form', 'button', 'select', 'option', 'label', 'fieldset', 'legend',
                    // Tables
                    'table', 'thead', 'tbody', 'tr', 'th', 'td',
                    // Media (non-void)
                    'video', 'audio', 'canvas', 'svg', 'iframe',
                    // Scripting
                    'script', 'style', 'title'
                ];

                const voidElements = [
                    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
                    'link', 'meta', 'param', 'source', 'track', 'wbr'
                ];

                const suggestions = [];

                // Standard open/close tags
                tags.forEach(tag => {
                    suggestions.push({
                        label: tag,
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: `<${tag}>$0</${tag}>`,
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: `<${tag}> element`
                    });
                });

                // Void tags (self-closing or just open)
                voidElements.forEach(tag => {
                    suggestions.push({
                        label: tag,
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: `<${tag} \/>`, // Self-closing style for clearer intent, though HTML5 allows just >
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: `<${tag}> void element`
                    });
                });

                // Custom complex snippets
                const customSnippets = [
                    {
                        label: '!html',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t$0\n</body>\n</html>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 Boilerplate'
                    },
                    {
                        label: 'input', // Override basic void input
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<input type="${1:text}" placeholder="${2}" />',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Input element'
                    },
                    {
                        label: 'input:c',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<input type="checkbox" id="${1}" name="${2}" />',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Checkbox Input'
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
                        label: 'link:css',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<link rel="stylesheet" href="${1:style.css}">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS Link'
                    },
                    {
                        label: 'script:src',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<script src="${1:script.js}"></script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Script with src'
                    },
                    {
                        label: 'meta:vp',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Viewport Meta'
                    }
                ];

                // Add custom snippets (filtering duplicates from basic lists if needed, but 'input' is handled by override order or filter)
                customSnippets.forEach(custom => {
                    // Remove existing entry if it exists to prioritize custom one
                    const existingIndex = suggestions.findIndex(s => s.label === custom.label);
                    if (existingIndex !== -1) {
                        suggestions.splice(existingIndex, 1);
                    }
                    suggestions.push(custom);
                });

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
