import React, { useState } from 'react';
import { Play, CheckCircle, RotateCcw, Code2, Eye } from 'lucide-react';
import CodeEditor from '../components/Editor/CodeEditor';
import Terminal from '../components/Editor/Terminal';
import ChallengePanel from '../components/Challenges/ChallengePanel';
import ChallengeList from '../components/Challenges/ChallengeList';
import useCodeExecution from '../hooks/useCodeExecution';
import { getChallengesByLanguage } from '../data/challenges';
import './ChallengesPage.css';

const ChallengesPage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const [code, setCode] = useState('');
    const [showHints, setShowHints] = useState(false);
    const [testResults, setTestResults] = useState([]);
    const [completedChallenges, setCompletedChallenges] = useState([]);

    const { output, isRunning, executeJavaScript, runTests, clearOutput, addOutput } = useCodeExecution();

    const challenges = getChallengesByLanguage(selectedLanguage);

    const handleSelectChallenge = (challenge) => {
        setSelectedChallenge(challenge);
        setCode(challenge.starterCode);
        setShowHints(false);
        setTestResults([]);
        clearOutput();
    };

    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);
        setSelectedChallenge(null);
        setCode('');
        setTestResults([]);
        clearOutput();
    };

    const handleRun = () => {
        clearOutput();
        if (selectedLanguage === 'javascript') {
            executeJavaScript(code);
        }
    };

    const handleTest = () => {
        if (!selectedChallenge || !selectedChallenge.tests.length) {
            addOutput('No hay tests disponibles para este reto', 'info');
            return;
        }

        const funcMatch = selectedChallenge.starterCode.match(/function\s+(\w+)/);
        if (!funcMatch) {
            addOutput('No se encontró una función para testear', 'error');
            return;
        }

        const results = runTests(code, selectedChallenge.tests, funcMatch[1]);
        setTestResults(results);

        const allPassed = results.every(r => r.passed);
        if (allPassed && !completedChallenges.includes(selectedChallenge.id)) {
            setCompletedChallenges([...completedChallenges, selectedChallenge.id]);
            addOutput('¡Todos los tests pasaron! Reto completado.', 'success');
        }
    };

    const handleShowSolution = () => {
        if (selectedChallenge?.solution) {
            setCode(selectedChallenge.solution);
        }
    };

    const handleReset = () => {
        if (selectedChallenge) {
            setCode(selectedChallenge.starterCode);
            setTestResults([]);
            clearOutput();
        }
    };

    return (
        <div className="challenges-page">
            {/* Challenge List Sidebar */}
            <div className="challenges-sidebar">
                <ChallengeList
                    challenges={challenges}
                    selectedChallenge={selectedChallenge}
                    onSelectChallenge={handleSelectChallenge}
                    completedChallenges={completedChallenges}
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={handleLanguageChange}
                />
            </div>

            {/* Main Content */}
            <div className="challenges-main">
                {selectedChallenge ? (
                    <>
                        {/* Toolbar */}
                        <div className="challenge-toolbar">
                            <div className="toolbar-info">
                                <div className="challenge-icon">
                                    <Code2 size={18} strokeWidth={1.5} />
                                </div>
                                <span className="challenge-name">{selectedChallenge.title}</span>
                            </div>
                            <div className="toolbar-actions">
                                <button className="btn btn-secondary" onClick={handleReset}>
                                    <RotateCcw size={16} strokeWidth={1.5} />
                                    Reset
                                </button>
                                <button className="btn btn-secondary" onClick={handleRun}>
                                    <Play size={16} strokeWidth={1.5} />
                                    Ejecutar
                                </button>
                                <button className="btn btn-primary" onClick={handleTest}>
                                    <CheckCircle size={16} strokeWidth={1.5} />
                                    Validar
                                </button>
                            </div>
                        </div>

                        {/* Split Layout */}
                        <div className="challenge-layout">
                            {/* Theory Panel */}
                            <div className="theory-sidebar">
                                <ChallengePanel
                                    challenge={selectedChallenge}
                                    showHints={showHints}
                                    onToggleHints={() => setShowHints(!showHints)}
                                    testResults={testResults}
                                    onShowSolution={handleShowSolution}
                                />
                            </div>

                            {/* Editor + Terminal */}
                            <div className="code-area">
                                <div className="editor-section">
                                    <CodeEditor
                                        code={code}
                                        onChange={setCode}
                                        language={selectedLanguage}
                                    />
                                </div>
                                <div className="terminal-section">
                                    <Terminal
                                        output={output}
                                        onClear={clearOutput}
                                        isRunning={isRunning}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="no-challenge">
                        <div className="no-challenge-content">
                            <Code2 size={64} strokeWidth={1} />
                            <h2>Selecciona un reto</h2>
                            <p>Elige un reto de la lista para comenzar a practicar</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengesPage;
