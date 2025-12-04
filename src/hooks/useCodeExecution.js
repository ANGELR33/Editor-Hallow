// Hook for executing JavaScript code safely
import { useState, useCallback } from 'react';

const useCodeExecution = () => {
    const [output, setOutput] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const addOutput = (text, type = 'log') => {
        setOutput(prev => [...prev, { text: String(text), type, timestamp: Date.now() }]);
    };

    const clearOutput = useCallback(() => {
        setOutput([]);
    }, []);

    const executeJavaScript = useCallback((code) => {
        setIsRunning(true);
        clearOutput();

        try {
            // Create a custom console
            const customConsole = {
                log: (...args) => addOutput(args.map(a =>
                    typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
                ).join(' '), 'log'),
                error: (...args) => addOutput(args.join(' '), 'error'),
                warn: (...args) => addOutput(args.join(' '), 'warn'),
                info: (...args) => addOutput(args.join(' '), 'info'),
            };

            // Wrap code to capture console
            const wrappedCode = `
        (function(console) {
          ${code}
        })
      `;

            // Execute
            const fn = eval(wrappedCode);
            const result = fn(customConsole);

            if (result !== undefined) {
                addOutput(`→ ${typeof result === 'object' ? JSON.stringify(result, null, 2) : result}`, 'success');
            }

        } catch (error) {
            addOutput(`Error: ${error.message}`, 'error');
        } finally {
            setIsRunning(false);
        }
    }, [clearOutput]);

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

    return {
        output,
        isRunning,
        executeJavaScript,
        runTests,
        clearOutput,
        addOutput
    };
};

export default useCodeExecution;
