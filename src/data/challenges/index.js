// Challenges Index - Exports all challenges
import { javascriptChallenges } from './javascript';
import { htmlCssChallenges } from './htmlcss';

export const allChallenges = {
    javascript: javascriptChallenges,
    html: htmlCssChallenges,
    css: htmlCssChallenges,
};

export const getLevelIcon = (level) => {
    const icons = {
        novato: '🌱',
        intermedio: '🔥',
        avanzado: '⚡',
        legendario: '💀'
    };
    return icons[level] || '📝';
};

export const getLevelName = (level) => {
    const names = {
        novato: 'Novato',
        intermedio: 'Intermedio',
        avanzado: 'Avanzado',
        legendario: 'Legendario'
    };
    return names[level] || level;
};

export const getLanguageIcon = (lang) => {
    const icons = {
        javascript: '🟨',
        html: '🟧',
        css: '🟦',
        python: '🐍'
    };
    return icons[lang] || '📄';
};

export const getChallengesByLevel = (challenges, level) => {
    return challenges.filter(c => c.level === level);
};

export const getChallengesByLanguage = (language) => {
    return allChallenges[language] || [];
};

export { javascriptChallenges, htmlCssChallenges };
