import './App.css'
import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { populateQuizStorage, getQuizLastAttempted, getAllQuizLastAttempted } from './utils/storage';

const BASE_URL = 'https://www.wizard101.com/quiz/trivia/game';
const TRIVIA_COOLDOWN_HOURS = 22
const quizAnswers = require('./data/answers.json');

const quizesWithoutTriviaSuffix = new Set(["Famous World Leaders", "Famous Poets"])

function getLink(quizName: string) {
  const hasTriviaSuffix = !quizesWithoutTriviaSuffix.has(quizName)
  return `${BASE_URL}/${quizName.toLowerCase().split(' ').join('-')}${hasTriviaSuffix ? "-trivia" : ""}`
}

const FaviconImg = () => {
  return (
    <img className={`w-16 h-16`} src="./assets/img/favicon.png" alt="Ambrose" />
  )
}

const QuizRow = ({ quiz, lastAttempted }: { quiz: string, lastAttempted: number }) => {

  const hLink = ({ isCooldownOver, quiz }: { isCooldownOver: boolean, quiz: string }) => {
    if (isCooldownOver) {
      return (
        <>
          <a href={getLink(quiz)}
            target="_blank"
            className="hover:text-yellow-900 font-bold hover:font-extrabold"
          >
            {quiz}
          </a>
        </>
      )
    } else {
      return (
        <>
          <a href={getLink(quiz)}
            target="_blank"
            className="text-red-700 hover:text-red-900 font-bold hover:font-extrabold"
          >
            {quiz} ⌛
          </a>
        </>
      )
    }
  }

  return (
    <tr key={quiz} className="text-yellow-700">
      <td>
        {
          hLink({
            isCooldownOver: lastAttempted < DateTime.local().minus({ hours: TRIVIA_COOLDOWN_HOURS }).toMillis(),
            quiz
          })
        }
      </td>
      <td>
        {lastAttempted ? DateTime.fromMillis(lastAttempted).toRelative() : 'Never'}
      </td>
    </tr>
  )
}

const QuizzesTable = () => {

  let quizzes = Object.keys(quizAnswers);
  const [quizStates, setQuizStates] = useState<{ [key: string]: { lastAttempted: number } } | null>(null);

  useEffect(() => {
    (async () => {
      let quizStates: { [key: string]: { lastAttempted: number } } = await getAllQuizLastAttempted();
      setQuizStates(quizStates);
    })();
  });

  if (!quizStates) {
    return <></>;
  }

  // Sort quizzes by last attempted
  quizzes.sort((a, b) => {
    let aLastAttempted = quizStates[a].lastAttempted || 0;
    let bLastAttempted = quizStates[b].lastAttempted || 0;
    return aLastAttempted - bLastAttempted;
  });

  return (
    <table className="table-auto text-base">
      <thead>
        <tr>
          <th className="px-4 py-2">Quiz</th>
          <th className="px-4 py-2">Attempted</th>
        </tr>
      </thead>
      <tbody>
        {quizzes.map((quiz) => {
          return (
            <QuizRow quiz={quiz} lastAttempted={quizStates[quiz].lastAttempted} />
          )
        })}
      </tbody>
    </table>
  );
}

export default function App() {
  return (
    <>
      <div className="flex justify-center my-5">
        <FaviconImg />
        <h1 className="mx-5 leading-tight text-5xl font-extrabold text-wiz-yellow text-shadow text-stroke">
          Ambrose
        </h1>
      </div>
      <div>
        <QuizzesTable />
      </div>
    </>

  )
}