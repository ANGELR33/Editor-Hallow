// Hook for executing JavaScript code safely
import { useState, useCallback, useRef, useEffect } from 'react';

const useCodeExecution = () => {
    const [output, setOutput] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const workerRef = useRef(null);

    const addOutput = useCallback((text, type = 'log') => {
        setOutput(prev => [...prev, { text: String(text), type, timestamp: Date.now() }]);
    }, []);

    const clearOutput = useCallback(() => {
        setOutput([]);
    }, []);

    const terminateExecution = useCallback(() => {
        if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
            setIsRunning(false);
            addOutput('Ejecución detenida por el usuario.', 'info');
        }
    }, [addOutput]);

    const executeJavaScript = useCallback((code) => {
        if (workerRef.current) {
            workerRef.current.terminate();
        }

        setIsRunning(true);
        clearOutput();

        // Worker code as a string
        const workerCode = `
            self.onmessage = function(e) {
                const { code } = e.data;
                
                const formatArg = (arg) => {
                    if (typeof arg === 'undefined') return 'undefined';
                    if (arg === null) return 'null';
                    if (typeof arg === 'object') {
                        try {
                            return JSON.stringify(arg, null, 2);
                        } catch (e) {
                            return '[Circular Object]';
                        }
                    }
                    return String(arg);
                };

                const customConsole = {
                    log: (...args) => self.postMessage({ type: 'log', content: args.map(formatArg).join(' ') }),
                    error: (...args) => self.postMessage({ type: 'error', content: args.map(formatArg).join(' ') }),
                    warn: (...args) => self.postMessage({ type: 'warn', content: args.map(formatArg).join(' ') }),
                    info: (...args) => self.postMessage({ type: 'info', content: args.map(formatArg).join(' ') }),
                };

                try {
                    // Wrap code to use custom console
                    const fn = new Function('console', code);
                    const result = fn(customConsole);
                    
                    if (result !== undefined) {
                        self.postMessage({ type: 'success', content: formatArg(result) });
                    }
                } catch (error) {
                    self.postMessage({ type: 'error', content: 'Error: ' + error.message });
                } finally {
                    self.postMessage({ type: 'done' });
                }
            };
        `;

        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));
        workerRef.current = worker;

        worker.onmessage = (e) => {
            const { type, content } = e.data;

            if (type === 'done') {
                setIsRunning(false);
                workerRef.current = null;
            } else {
                addOutput(content, type);
            }
        };

        worker.onerror = (error) => {
            addOutput(`Runtime Error: ${error.message}`, 'error');
            setIsRunning(false);
            workerRef.current = null;
        };

        worker.postMessage({ code });

    }, [clearOutput, addOutput]);

    // Keep runTests synchronous for now as they are usually simple assertions
    const runTests = useCallback((code, tests, functionName) => {
        const results = [];

        try {
            // Extract function from code
            const fn = eval(`(function() { ${code}; return ${functionName}; })()`);

            if (typeof fn !== 'function') {
                return [{ passed: false, message: `${functionName} no es una función` }];
            }

            for (const test of tests) {
                try {
                    const result = fn(...test.input);
                    const passed = JSON.stringify(result) === JSON.stringify(test.expected);

                    results.push({
                        passed,
                        message: passed
                            ? `✓ ${JSON.stringify(test.input)} → ${JSON.stringify(result)}`
                            : `✗ Esperado: ${JSON.stringify(test.expected)}, Recibido: ${JSON.stringify(result)}`
                    });
                } catch (err) {
                    results.push({
                        passed: false,
                        message: `Error: ${err.message}`
                    });
                }
            }
        } catch (error) {
            results.push({
                passed: false,
                message: `Error de sintaxis: ${error.message}`
            });
        }

        return results;
    }, []);

    // Cleanup worker on unmount
    useEffect(() => {
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, []);

    return {
        output,
        isRunning,
        executeJavaScript,
        runTests,
        clearOutput,
        addOutput,
        terminateExecution
    };
};

export default useCodeExecution;
