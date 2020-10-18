const {getQuestionHash, getStrands, getIds} = require('./functions.js');


const createQuiz = function(number_of_questions) {
    const quesitonHash = getQuestionHash();
    let availableQuestion = getStrands(quesitonHash);
    let keys = Object.keys(availableQuestion);
    const quizList = [];
    for(let i = 0; i < number_of_questions; i++) {
        let strandId = keys[i % keys.length];
        let nextQuestion = availableQuestion[strandId].pop();
        if (!nextQuestion) {
            // TODO: repopulate the list? pull from another strand?
            continue;
        }
        quizList.push(nextQuestion);
    }
    console.log(getIds(quizList).join(","));
}


module.exports = {
    createQuiz
};