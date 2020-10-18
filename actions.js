const {getQuestionHash, getStrands, getIds} = require('./functions.js');


const createQuiz = function(number_of_questions, cmd) {
    if (number_of_questions <= 0) {
        console.log('Please use a valid integer greater than zero');
        return;
    }
    number_of_questions = parseInt(number_of_questions);
    if (isNaN(number_of_questions)) {
        console.log('Please use a valid integer greater than zero');
        return;
    }


    const quesitonHash = getQuestionHash();
    let availableQuestions = getStrands(quesitonHash);
    let keys = Object.keys(availableQuestions);
    const quizList = [];
    let i = 0
    while (quizList.length < number_of_questions) {
        let strandId = keys[i % keys.length];
        let nextQuestion = availableQuestions[strandId].pop();
        if (!nextQuestion) {
            // TODO: repopulate the list? pull from another strand?
            availableQuestions[strandId] = getStrands(quesitonHash)[strandId];
            continue;
        }
        quizList.push(nextQuestion);
        i++;
    }

    console.log(getIds(quizList).join(","));
}


module.exports = {
    createQuiz
};