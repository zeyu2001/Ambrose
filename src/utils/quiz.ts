const quizAnswers = require('../data/answers.json');

const levenshteinDistance = (str1: string, str2: string) => {
    const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
       track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
       track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
       for (let i = 1; i <= str1.length; i += 1) {
          const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
          track[j][i] = Math.min(
             track[j][i - 1] + 1,
             track[j - 1][i] + 1,
             track[j - 1][i - 1] + indicator,
          );
       }
    }
    return track[str2.length][str1.length];
 };

const getConfidence = (str1: string, str2: string): number => {
    return 1 - levenshteinDistance(str1, str2) / Math.max(str1.length, str2.length);
}

const solveQuiz = (quiz: string, quizQuestion:string, quizOptionsElements:Array<HTMLElement>) => {

    let topMatch = { quiz: '', question: '', answer: quizOptionsElements[0], confidence: 0 };

    for (let quizName in quizAnswers) {
        let quizQuestions:Array<Array<string>> = quizAnswers[quizName];
        let quizNameConfidence = getConfidence(quizName, quiz);

        for (let quizQuestionAnswer of quizQuestions) {
            let quizQuestionConfidence = getConfidence(quizQuestionAnswer[0], quizQuestion);
            
            for (let quizOption of quizOptionsElements) {
                let quizOptionConfidence = getConfidence(quizQuestionAnswer[1], quizOption.innerText.trim());
                let confidence = (quizNameConfidence + quizQuestionConfidence + quizOptionConfidence) / 3 * 100;
                if (confidence > topMatch.confidence) {
                    topMatch = {
                        quiz: quizName,
                        question: quizQuestionAnswer[0],
                        answer: quizOption,
                        confidence: confidence
                    }
                }
            }
        }
    }

    if (topMatch.confidence > 0.5)
        return topMatch;
    
    return null;
};

export { solveQuiz, getConfidence };