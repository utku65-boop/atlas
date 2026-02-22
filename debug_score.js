const { calculateRiasecScore, findBestMatches } = require('./src/lib/algorithm');
const { questions } = require('./src/lib/data/questions');
const { departments } = require('./src/lib/data/departments');

// Mock data: Select the first option for every question
// This simulates a user who always picks the first option (Option A)
const selectedIds = questions.map(q => q.options[0].id);

console.log(`Total Questions: ${questions.length}`);
console.log(`Selected IDs count: ${selectedIds.length}`);

// 1. Test Scoring
const scores = calculateRiasecScore(selectedIds, questions);
console.log("Calculated RIASEC Scores:", scores);

// 2. Test Matching
const matches = findBestMatches(scores);
console.log("Top 5 Matches:");
matches.slice(0, 5).forEach(m => {
    console.log(`${m.department.name}: Score ${m.matchScore}`);
});

// Check for Low Scores Issue
const allZero = Object.values(scores).every(v => v === 0);
if (allZero) {
    console.error("ERROR: All scores are zero!");
} else {
    console.log("Scores seem to be populated.");
}

// Check for 0 Match Issue
const topMatch = matches[0];
if (topMatch.matchScore === 0) {
    console.error("ERROR: Top match is 0! Algorithm divisor is likely wrong.");
}
