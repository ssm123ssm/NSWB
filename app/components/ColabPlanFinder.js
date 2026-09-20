"use client";

import { useMemo, useState } from "react";
import { ArrowIcon, CheckIcon } from "./Icons";
import styles from "./ColabLanding.module.css";

const questions = [
  {
    key: "work",
    label: "Which best describes your work?",
    options: [
      ["research", "Research or academic work"],
      ["professional", "Independent professional"],
      ["team", "Product, creative, or project team"],
      ["organization", "Organization or company"],
    ],
  },
  {
    key: "people",
    label: "How many people need the workspace?",
    options: [["one", "Just me"], ["small", "2–5 people"], ["large", "6 or more"]],
  },
  {
    key: "needs",
    label: "What kind of setup do you need?",
    options: [
      ["standard", "Projects, knowledge, collaboration, and AI"],
      ["research", "Research tools and Overleaf"],
      ["special", "Specialized AI, compute, integrations, or infrastructure"],
    ],
  },
];

function recommendation(answers) {
  if (answers.needs === "special") return ["Custom coLab", "A tailored setup can match specialized AI, compute, integration, infrastructure, and support requirements."];
  if (answers.people === "large" || answers.work === "organization") return ["Corporate", "Corporate adds organizational capacity, shared allowances, identity, onboarding, and team controls."];
  if (answers.work === "research" || answers.needs === "research") return ["PhD", "PhD includes research projects, knowledge storage, Overleaf, collaboration, and AI assistance."];
  return ["Professional", "Professional includes support for independent and small-team work across multiple projects, clients, previews, and AI-assisted workflows."];
}

export default function ColabPlanFinder() {
  const [answers, setAnswers] = useState({ work: "", people: "", needs: "" });
  const complete = questions.every((question) => answers[question.key]);
  const result = useMemo(() => recommendation(answers), [answers]);

  return (
    <div className={styles.planFinder}>
      <div className={styles.finderIntro}>
        <p className="eyebrow">Plan recommendation</p>
        <h3>Select one answer in each category.</h3>
        <p>The result identifies a starting package. The final configuration can change according to your requirements.</p>
      </div>
      <div className={styles.finderQuestions}>
        {questions.map((question, index) => (
          <fieldset key={question.key}>
            <legend><span>{String(index + 1).padStart(2, "0")}</span>{question.label}</legend>
            <div>
              {question.options.map(([value, label]) => (
                <label key={value} className={answers[question.key] === value ? styles.selectedOption : ""}>
                  <input type="radio" name={question.key} value={value} checked={answers[question.key] === value} onChange={() => setAnswers((current) => ({ ...current, [question.key]: value }))} />
                  <span>{label}</span>{answers[question.key] === value ? <CheckIcon /> : null}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className={styles.finderResult} aria-live="polite">
        {complete ? (
          <><small>RECOMMENDED PLAN</small><h3>{result[0]}</h3><p>{result[1]}</p><a className="btn btn-gradient" href="https://colab.neurasense.io/signup" target="_blank" rel="noreferrer">Select {result[0]} <ArrowIcon /></a></>
        ) : (
          <><small>PLAN RECOMMENDATION</small><h3>Complete the three selections.</h3><p>No information is submitted from this form. Each answer can be changed.</p></>
        )}
      </div>
    </div>
  );
}
