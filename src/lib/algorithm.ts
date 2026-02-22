import { Department, departments, RiasecType } from './data/departments';
import { Question } from './data/questions';

export interface RiasecScore {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
}

/**
 * Kullanıcı cevaplarına göre RIASEC skorlarını hesaplar.
 * @param answers - Kullanıcının verdiği cevaplar (Soru ID -> Puan 1-5 arası varsayalım veya Evet=1, Hayır=0)
 * Şimdilik MVP için: Seçilenler listesi (string[]) alalım, her seçilen = 1 puan.
 */
export function calculateRiasecScore(selectedOptionIds: string[], questions: Question[]): RiasecScore {
    const scores: RiasecScore = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    // ---------------------------------------------------------
    // 1. Calculate Raw Scores
    // ---------------------------------------------------------
    selectedOptionIds.forEach((optId) => {
        for (const q of questions) {
            const option = q.options.find(o => o.id === optId);
            if (option) {
                scores.R += option.weights.R;
                scores.I += option.weights.I;
                scores.A += option.weights.A;
                scores.S += option.weights.S;
                scores.E += option.weights.E;
                scores.C += option.weights.C;
                break;
            }
        }
    });

    // ---------------------------------------------------------
    // 2. Normalize Scores (0-100)
    // ---------------------------------------------------------
    // Strategy: Find the highest raw score and scale it to ~90-100.
    // This ensures every user has at least one "dominant" trait.

    const rawScores = Object.values(scores);
    const maxRaw = Math.max(...rawScores) || 1; // avoid div by zero

    for (const key in scores) {
        // Linear scaling based on max score
        // If maxRaw is 200, and R is 200 -> R becomes 95.
        // If I is 100 -> I becomes 47.5.
        // We use 95 as the target top score to leave room for error or perfect 100 later.

        scores[key as RiasecType] = Math.round((scores[key as RiasecType] / maxRaw) * 95);

        // Fallback cap
        if (scores[key as RiasecType] > 100) scores[key as RiasecType] = 100;
    }

    return scores;
}

export function findBestMatches(userScore: RiasecScore, customDepartments?: Department[]): { department: Department; matchScore: number }[] {
    const targetList = customDepartments || departments;
    const results = targetList.map((dept) => {
        let totalDiff = 0;
        const types: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

        types.forEach((type) => {
            const u = userScore[type]; // 0-100 (Scaled)
            const d = dept.scores[type]; // 0-100
            totalDiff += Math.pow(u - d, 2);
        });
        const rmse = Math.sqrt(totalDiff / 6);

        // Calibrated Match Score: 
        // RMSE 0 -> 100% match
        // RMSE 10 -> 88% match
        // RMSE 20 -> 76% match
        // RMSE 30 -> 64% match
        // RMSE 50 -> 40% match
        // Penalty factor reduced to 1.2
        let score = 100 - (rmse * 1.2);

        // Boost high scores slightly (curve)
        // If score > 60, add +5 bonus
        if (score > 60) score += 5;

        // Ensure bounds
        if (score < 0) score = 0;
        if (score > 100) score = 100;

        return { department: dept, matchScore: Math.round(score) };
    });
    return results.sort((a, b) => b.matchScore - a.matchScore);
}
