import React from 'react';
import { Lightbulb, ChevronRight, CheckCircle, XCircle, Eye, BookOpen } from 'lucide-react';
import { getLevelIcon, getLevelName } from '../../data/challenges';
import './ChallengePanel.css';

const ChallengePanel = ({
    challenge,
    showHints,
    onToggleHints,
    testResults,
    onShowSolution
}) => {
    if (!challenge) {
        return (
            <div className="challenge-panel empty">
                <div className="empty-state">
                    <BookOpen size={48} strokeWidth={1} />
                    <p>Selecciona un reto para comenzar</p>
                </div>
            </div>
        );
    }

    return (
        <div className="challenge-panel">
            {/* Header */}
            <div className="challenge-header">
                <span className={`level-badge level-${challenge.level}`}>
                    {getLevelName(challenge.level)}
                </span>
                <h2 className="challenge-title">{challenge.title}</h2>
                <p className="challenge-description">{challenge.description}</p>
            </div>

            {/* Theory Section */}
            <div className="theory-section">
                <h3 className="section-title">
                    <BookOpen size={18} strokeWidth={1.5} />
                    {challenge.theory.concept}
                </h3>
                <div className="theory-content">
                    <p className="theory-explanation">
                        {challenge.theory.explanation}
                    </p>

                    <div className="key-points">
                        <h4>Puntos Clave</h4>
                        <ul>
                            {challenge.theory.keyPoints.map((point, idx) => (
                                <li key={idx}>
                                    <ChevronRight size={14} strokeWidth={2} />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="real-world">
                        <span className="tag">Uso Real:</span>
                        <span>{challenge.theory.realWorldUse}</span>
                    </div>
                </div>
            </div>

            {/* Test Results */}
            {testResults && testResults.length > 0 && (
                <div className="test-results">
                    <h3 className="section-title">
                        <CheckCircle size={18} strokeWidth={1.5} />
                        Resultados
                    </h3>
                    <div className="results-list">
                        {testResults.map((result, idx) => (
                            <div
                                key={idx}
                                className={`result-item ${result.passed ? 'passed' : 'failed'}`}
                            >
                                {result.passed ? (
                                    <CheckCircle size={16} className="result-icon success" strokeWidth={1.5} />
                                ) : (
                                    <XCircle size={16} className="result-icon error" strokeWidth={1.5} />
                                )}
                                <span className="result-text">
                                    Test {idx + 1}: {result.message}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Hints Section */}
            <div className="hints-section">
                <button className="hints-toggle" onClick={onToggleHints}>
                    <Lightbulb size={16} strokeWidth={1.5} />
                    <span>{showHints ? 'Ocultar Pistas' : 'Mostrar Pistas'}</span>
                </button>

                {showHints && challenge.hints && (
                    <div className="hints-list">
                        {challenge.hints.map((hint, idx) => (
                            <div key={idx} className="hint-item">
                                {hint}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Solution Button */}
            <button className="solution-btn" onClick={onShowSolution}>
                <Eye size={18} strokeWidth={1.5} />
                Ver Solución
            </button>
        </div>
    );
};

export default ChallengePanel;
