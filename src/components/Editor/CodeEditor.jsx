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
                    // Console
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
                    // Loops
                    {
                        label: 'for',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'For Loop'
                    },
                    {
                        label: 'while',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'while (${1:condition}) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'While Loop'
                    },
                    {
                        label: 'dowhile',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'do {\n\t$0\n} while (${1:condition});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Do-While Loop'
                    },
                    // Conditionals
                    {
                        label: 'if',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'if (${1:condition}) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If Statement'
                    },
                    {
                        label: 'ifelse',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'if (${1:condition}) {\n\t$2\n} else {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement'
                    },
                    {
                        label: 'switch',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'switch (${1:key}) {\n\tcase ${2:value}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Switch Statement'
                    },
                    {
                        label: 'trycatch',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'try {\n\t$1\n} catch (error) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Try-Catch Block'
                    },
                    // Functions
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
                    },
                    {
                        label: 'arrow',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '(${1:params}) => ${0:return}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Implicit Return Arrow Function'
                    },
                    // Async
                    {
                        label: 'promise',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'new Promise((resolve, reject) => {\n\t$0\n})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'New Promise'
                    },
                    {
                        label: 'async',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'async function ${1:name}(${2:params}) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Async Function'
                    },
                    // Array Methods
                    {
                        label: 'map',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.map((${2:item}) => {\n\t$0\n})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array Map'
                    },
                    {
                        label: 'filter',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.filter((${2:item}) => {\n\t$0\n})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array Filter'
                    },
                    {
                        label: 'reduce',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.reduce((acc, ${2:curr}) => {\n\t$0\n}, ${3:initial})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array Reduce'
                    },
                    // More Array Methods
                    {
                        label: 'forEach',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.forEach((${2:item}) => {\n\t$0\n})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array forEach'
                    },
                    {
                        label: 'find',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.find((${2:item}) => ${3:condition})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array Find'
                    },
                    {
                        label: 'reverse',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.reverse()',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array Reverse'
                    },
                    {
                        label: 'join',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.join(\'${2:separator}\')',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array Join'
                    },
                    {
                        label: 'push',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.push(${2:item})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array Push'
                    },
                    {
                        label: 'pop',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.pop()',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array Pop'
                    },
                    // String Methods
                    {
                        label: 'split',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:string}.split(\'${2:separator}\')',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'String Split'
                    },
                    {
                        label: 'substring',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:string}.substring(${2:start}, ${3:end})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'String Substring'
                    },
                    {
                        label: 'toLowerCase',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:string}.toLowerCase()',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'String toLowerCase'
                    },
                    {
                        label: 'toUpperCase',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:string}.toUpperCase()',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'String toUpperCase'
                    },
                    {
                        label: 'replace',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:string}.replace(/${2:regex}/, \'${3:replacement}\')',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'String Replace'
                    },
                    // DOM
                    {
                        label: 'query',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'document.querySelector(\'${1:selector}\')',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'querySelector'
                    },
                    {
                        label: 'queryAll',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'document.querySelectorAll(\'${1:selector}\')',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'querySelectorAll'
                    },
                    {
                        label: 'addEvent',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:element}.addEventListener(\'${2:event}\', (e) => {\n\t$0\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'addEventListener'
                    },
                    // Classes
                    {
                        label: 'class',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'class ${1:Name} {\n\tconstructor(${2:params}) {\n\t\t$0\n\t}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Class Declaration'
                    },
                    // Modules
                    {
                        label: 'import',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'import ${1:module} from \'${2:path}\';',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Import Statement'
                    },
                    {
                        label: 'export',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'export default ${1:module};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Export Default'
                    }
                ];
                return { suggestions: suggestions };
            }
        });

        // Enhanced HTML Snippets (Emmet-like)
        monaco.languages.registerCompletionItemProvider('html', {
            provideCompletionItems: (model, position) => {
                const tags = [
                    // Structure
                    'html', 'head', 'body', 'div', 'span', 'header', 'footer', 'main', 'section', 'article', 'aside', 'nav',
                    // Text
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'strong', 'em', 'br', 'hr',
                    // Lists
                    'ul', 'ol', 'li', 'dl', 'dt', 'dd',
                    // Forms
                    'form', 'input', 'textarea', 'button', 'select', 'option', 'label', 'fieldset', 'legend',
                    // Tables
                    'table', 'thead', 'tbody', 'tr', 'th', 'td',
                    // Media
                    'img', 'video', 'audio', 'source', 'canvas', 'svg',
                    // Scripting
                    'script', 'style', 'link', 'meta'
                ];

                const suggestions = tags.map(tag => ({
                    label: tag,
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: `<${tag}>$0</${tag}>`,
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: `<${tag}> element`
                }));

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
                        label: '!',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t$0\n</body>\n</html>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 Boilerplate'
                    },
                    {
                        label: 'doc',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t$0\n</body>\n</html>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 Boilerplate'
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
                        label: 'script:src',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<script src="${1:script.js}"></script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Script with src'
                    },
                    {
                        label: 'input',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<input type="${1:text}" placeholder="${2}" />',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Input element'
                    },
                    {
                        label: 'meta:vp',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Viewport Meta'
                    }
                ];

                // Merge auto-generated and custom snippets (custom overrides if needed, but here we just append)
                // Filter out tags that have custom snippets to avoid duplicates if necessary, or just rely on label uniqueness
                const finalSuggestions = [
                    ...suggestions.filter(s => !customSnippets.find(c => c.label === s.label)),
                    ...customSnippets
                ];

                return { suggestions: finalSuggestions };
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
