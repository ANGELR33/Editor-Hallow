import React from 'react';
import { CheckCircle, Leaf, Flame, Zap, Skull, Braces, FileCode } from 'lucide-react';
import { getLevelName, getChallengesByLevel } from '../../data/challenges';
import './ChallengeList.css';

const ChallengeList = ({
    challenges,
    selectedChallenge,
    onSelectChallenge,
    completedChallenges = [],
    selectedLanguage,
    onLanguageChange
}) => {
    const levels = [
        { id: 'novato', icon: Leaf },
        { id: 'intermedio', icon: Flame },
        { id: 'avanzado', icon: Zap },
        { id: 'legendario', icon: Skull }
    ];

    const languages = [
        { id: 'javascript', name: 'JavaScript', icon: Braces },
        { id: 'html', name: 'HTML/CSS', icon: FileCode },
    ];

    return (
        <div className="challenge-list">
            {/* Language Selector */}
            <div className="language-selector">
                {languages.map(lang => (
                    <button
                        key={lang.id}
                        className={`lang-btn ${selectedLanguage === lang.id ? 'active' : ''}`}
                        onClick={() => onLanguageChange(lang.id)}
                    >
                        <lang.icon size={18} strokeWidth={1.5} />
                        <span className="lang-name">{lang.name}</span>
                    </button>
                ))}
            </div>

            {/* Levels */}
            <div className="levels-container">
                {levels.map(level => {
                    const levelChallenges = getChallengesByLevel(challenges, level.id);
                    if (levelChallenges.length === 0) return null;

                    const LevelIcon = level.icon;

                    return (
                        <div key={level.id} className="level-section">
                            <div className={`level-header level-${level.id}`}>
                                <LevelIcon size={18} strokeWidth={1.5} />
                                <span className="level-name">{getLevelName(level.id)}</span>
                                <span className="level-count">{levelChallenges.length}</span>
                            </div>

                            <div className="challenges">
                                {levelChallenges.map((challenge, idx) => {
                                    const isCompleted = completedChallenges.includes(challenge.id);
                                    const isSelected = selectedChallenge?.id === challenge.id;

                                    return (
                                        <button
                                            key={challenge.id}
                                            className={`challenge-item ${isSelected ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`}
                                            onClick={() => onSelectChallenge(challenge)}
                                        >
                                            <span className="challenge-number">#{idx + 1}</span>
                                            <span className="challenge-name">{challenge.title}</span>
                                            {isCompleted && (
                                                <CheckCircle size={16} className="completed-icon" strokeWidth={1.5} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChallengeList;
