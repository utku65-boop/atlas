// Verification Script with Embedded Logic
// This avoids TS compilation issues by copying the core logic here.

// ---------------- DATA ----------------
const questions = [
    {
        id: "13ec9af0-552d-43d5-8425-6dc24cebfc8d",
        text: "Bir spor kulübünde gönüllüsün...",
        options: [
            { id: "0ba379ce-...", text: "Takım...", weights: { R: 5, I: 5, A: 5, S: 25, E: 45, C: 10 } },
            { id: "7e64caab-...", text: "Eksik...", weights: { R: 70, I: 5, A: 5, S: 5, E: 5, C: 10 } }, // High R
            { id: "85c6ca14-...", text: "Eksik...", weights: { R: 5, I: 50, A: 5, S: 5, E: 5, C: 10 } },
            { id: "b50faf33-...", text: "Antren...", weights: { R: 10, I: 5, A: 20, S: 5, E: 5, C: 25 } },
        ]
    },
    // Add a few more mock questions to simulate a partial test
    {
        id: "q2",
        options: [
            { id: "o2a", weights: { R: 70, I: 5, A: 5, S: 5, E: 5, C: 10 } }, // High R
            { id: "o2b", weights: { R: 5, I: 5, A: 5, S: 5, E: 5, C: 5 } }
        ]
    }
];

const departments = [
    {
        name: "Makine Mühendisliği",
        riasecScores: { R: 80, I: 60, A: 10, S: 10, E: 30, C: 40 }
    }
];

// ---------------- LOGIC ----------------
function calculateRiasecScore(selectedOptionIds, questions) {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

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

    const questionCount = selectedOptionIds.length || 1;
    for (const key in scores) {
        scores[key] = Math.round(scores[key] / questionCount * 1.5);
        if (scores[key] > 100) scores[key] = 100;
    }
    return scores;
}

function findBestMatches(userScore) {
    return departments.map((dept) => {
        let totalDiff = 0;
        const types = ['R', 'I', 'A', 'S', 'E', 'C'];
        types.forEach((type) => {
            const u = userScore[type];
            const d = dept.riasecScores[type];
            totalDiff += Math.pow(u - d, 2);
        });

        // CURRENT LOGIC (Suspected Bug)
        // const score = Math.max(0, 100 * (1 - totalDiff / 400));
        const oldLogicScore = Math.max(0, 100 * (1 - totalDiff / 400));

        // PROPOSED LOGIC (RMSE)
        const rmse = Math.sqrt(totalDiff / 6);
        const newLogicScore = Math.max(0, 100 - rmse);

        return {
            department: dept.name,
            totalDiff,
            oldLogicScore,
            newLogicScore,
            userR: userScore.R,
            deptR: dept.riasecScores.R
        };
    });
}

// ---------------- TEST CASE ----------------
// Scenario 1: High Match
// User picks High R options (id ending in ...)
const highRIds = ["7e64caab-...", "o2a"];
const scoresHigh = calculateRiasecScore(highRIds, questions);
console.log("--- TEST 1: HIGH R USER ---");
console.log("Scores:", scoresHigh);
console.log("Matches:", findBestMatches(scoresHigh));

// Scenario 2: Low Match (User picks non-R options)
const lowRIds = ["0ba379ce-...", "o2b"]; // R=5
const scoresLow = calculateRiasecScore(lowRIds, questions);
console.log("\n--- TEST 2: LOW R USER ---");
console.log("Scores:", scoresLow);
console.log("Matches:", findBestMatches(scoresLow));
