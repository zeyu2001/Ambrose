import { getScriptType } from "../utils/scriptType";
import { addErrorElement, addSuccessElement } from "../utils/alerts";
import { solveQuiz, getConfidence } from "../utils/quiz";
import { autoClickEnabled } from "../utils/autoClick";

(() => {

    // Run as content script only
    console.log(getScriptType());
    if (getScriptType() !== 'CONTENT')
        return;

    let pollCount = 0;

    const pollInterval = setInterval(() => {

        const quizCompletedElement: HTMLElement|null = document.querySelector('.rewardText');
        
        if (quizCompletedElement) {
            clearInterval(pollInterval);
            addSuccessElement('Quiz completed!');
            
            const quizNameRegex = new RegExp(/You completed ([\w\s]+) Trivia./);
            const quizNameMatch = quizNameRegex.exec(quizCompletedElement.innerText);
            const quizName = quizNameMatch ? quizNameMatch[1] : '';

            if (!quizName) {
                addErrorElement('Could not find quiz name.');
                return;
            } else {
                chrome.runtime.sendMessage({ message: "quiz-completed", quiz: quizName}, () => {});
            }
            return;
        }
    
        const currQuizElement:HTMLElement|null = document.querySelector('h1');
        const quizQuestionElement: HTMLElement|null = document.querySelector(".quizQuestion");
        const quizOptionsElements:Array<HTMLElement> = Array.from(document.querySelectorAll(".answer"));
        const nextQuestionButton: HTMLElement|null = document.querySelector("#nextQuestion");
        
        if (currQuizElement && quizQuestionElement && nextQuestionButton && quizOptionsElements.length === 4) {
            clearInterval(pollInterval);

            // Remove the fading in animation
            for (let i = 0; i < quizOptionsElements.length; i++) {
                quizOptionsElements[i].style.visibility = 'visible';
                quizOptionsElements[i].classList.add('fadeIn');
            }
            nextQuestionButton.style.visibility = 'visible';
            nextQuestionButton.classList.add('fadeIn');

            doQuiz(currQuizElement, quizQuestionElement, quizOptionsElements);
            return;
        }

        pollCount++;
        console.log(`Polling for quiz elements... ${pollCount}`);
        
        if (pollCount >= 10) {
            clearInterval(pollInterval);
            addErrorElement('Uh oh! Could not find quiz elements.');
            return
        }
    }, 1000);

    const doQuiz = (currQuizElement:HTMLElement, quizQuestionElement:HTMLElement, quizOptionsElements:Array<HTMLElement>) => {

        const quizAnswer = solveQuiz(
            currQuizElement.innerText.replace('Trivia', '').trim(),
            quizQuestionElement.innerText.trim(),
            quizOptionsElements
        );
        
        if (!quizAnswer) {
            addErrorElement('Uh oh! This quiz might not be supported.');
            return;
        }

        const {answer, confidence} = quizAnswer;

        if (confidence > 50) {
            if (autoClickEnabled()) {
				(answer.children[0]?.children[0] as any).click();
				setTimeout(() => {
					document.getElementById("nextQuestion")?.click();
				}, 300);
			}

            answer.classList.add('font-bold', 'text-green-700');
            const confidenceSpan = document.createElement('span');
            confidenceSpan.innerText = `(${confidence.toFixed(2)})`;
            answer.appendChild(confidenceSpan);

            const correctIcon:HTMLImageElement = document.createElement('img');
            addSuccessElement('Correct answer found!');
            return;
        }

        addErrorElement('Uh oh! This quiz might not be supported.');
        return;
    };

})()