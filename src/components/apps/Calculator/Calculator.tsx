'use client';

import { useState, useCallback } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import MenuBar from '@/components/apps/shared/MenuBar';
import type { MenuGroup } from '@/components/apps/shared/MenuBar';
import { playSound, showBalloonTip } from '@/lib/apps/helpers';
import styles from './Calculator.module.css';

const QUESTIONS = [
  {
    id: 1,
    stage: 'Awareness',
    text: 'How well does your target market know you exist?',
    hint: '1 = Nobody knows us  →  5 = We\'re the go-to name',
  },
  {
    id: 2,
    stage: 'Acquisition',
    text: 'How effectively do you convert prospects into paying customers?',
    hint: '1 = Very few convert  →  5 = Conversion machine',
  },
  {
    id: 3,
    stage: 'Activation',
    text: 'Do first-time customers come back after their initial purchase?',
    hint: '1 = One and done  →  5 = Strong repeat business',
  },
  {
    id: 4,
    stage: 'Revenue',
    text: 'Are you maximizing revenue from each customer relationship?',
    hint: '1 = Leaving money on table  →  5 = Fully optimized',
  },
  {
    id: 5,
    stage: 'Retention',
    text: 'Is your growth repeatable and systematic?',
    hint: '1 = Unpredictable  →  5 = Runs while I sleep',
  },
];

const STAGE_COLORS = ['#FF6B6B', '#FFA94D', '#FFD43B', '#69DB7C', '#4DABF7'];

type Mode = 'calculator' | 'question' | 'result';

export default function Calculator({ onTitleChange }: AppProps) {
  const [mode, setMode] = useState<Mode>('calculator');
  const [display, setDisplay] = useState('0');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // ── Calculator logic ──
  const handleNumber = useCallback(
    (num: string) => {
      if (mode === 'question') {
        const val = parseInt(num, 10);
        if (val >= 1 && val <= 5) {
          const newAnswers = [...answers, val];
          setAnswers(newAnswers);
          if (currentQ < QUESTIONS.length - 1) {
            setCurrentQ(currentQ + 1);
          } else {
            // All answered → show result
            setMode('result');
            playSound('notification');
            showBalloonTip('Assessment Complete', 'Your Revenue Journey score is ready!');
          }
        }
        return;
      }
      setDisplay((prev) => (prev === '0' ? num : prev + num));
    },
    [mode, answers, currentQ]
  );

  const handleEquals = useCallback(() => {
    if (mode === 'calculator') {
      setMode('question');
      setCurrentQ(0);
      setAnswers([]);
      onTitleChange?.('Revenue Journey Assessment - Calculator');
      return;
    }
  }, [mode, onTitleChange]);

  const handleClear = useCallback(() => {
    if (mode !== 'calculator') {
      setMode('calculator');
      setDisplay('0');
      setCurrentQ(0);
      setAnswers([]);
      onTitleChange?.('Calculator');
      return;
    }
    setDisplay('0');
  }, [mode, onTitleChange]);

  // ── Results ──
  const totalScore = answers.reduce((a, b) => a + b, 0);
  const maxScore = QUESTIONS.length * 5;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return '#69DB7C';
    if (percentage >= 60) return '#FFD43B';
    if (percentage >= 40) return '#FFA94D';
    return '#FF6B6B';
  };

  const getVerdict = () => {
    if (percentage >= 80)
      return { title: 'Revenue Machine', desc: 'Your systems are strong. Fine-tune and scale with our Agency tier.' };
    if (percentage >= 60)
      return { title: 'Growing Pains', desc: 'You have a foundation but there are leaks. The 90-Day Partnership can fix them.' };
    if (percentage >= 40)
      return { title: 'Revenue Leak Alert', desc: 'Significant revenue is falling through the cracks. Start with a free assessment.' };
    return { title: 'Emergency Mode', desc: 'Critical leaks detected. Book a strategy call immediately.' };
  };

  const menus: MenuGroup[] = [
    {
      label: '&View',
      items: [
        { label: '&Standard', checked: true },
        { label: 'S&cientific', disabled: true },
      ],
    },
    {
      label: '&Help',
      items: [
        { label: '&Help Topics', disabled: true },
        { label: '&About Calculator', disabled: true },
      ],
    },
  ];

  const buttons = [
    ['MC', 'MR', 'MS', 'M+', '←'],
    ['CE', 'C', '±', '√', '/'],
    ['7', '8', '9', '*', '%'],
    ['4', '5', '6', '-', '1/x'],
    ['1', '2', '3', '+', '='],
    ['0', '0', '.', '', ''],
  ];

  return (
    <div className={styles.calculator}>
      <MenuBar menus={menus} />

      {/* Display / Question / Result */}
      {mode === 'calculator' && (
        <div className={styles.display}>{display}</div>
      )}

      {mode === 'question' && (
        <div className={styles.questionDisplay}>
          <div className={styles.questionNumber}>
            Question {currentQ + 1} of {QUESTIONS.length} — {QUESTIONS[currentQ].stage}
          </div>
          <div className={styles.questionText}>{QUESTIONS[currentQ].text}</div>
          <div className={styles.questionHint}>{QUESTIONS[currentQ].hint}</div>
        </div>
      )}

      {mode === 'result' && (
        <div className={styles.resultView}>
          <div className={styles.scoreCircle} style={{ background: getScoreColor() }}>
            {percentage}%
          </div>
          <div className={styles.resultTitle}>{getVerdict().title}</div>
          <div className={styles.resultDesc}>{getVerdict().desc}</div>

          {answers.map((score, i) => (
            <div key={QUESTIONS[i].stage} className={styles.resultDesc}>
              <strong style={{ color: STAGE_COLORS[i] }}>{QUESTIONS[i].stage}:</strong> {score}/5
            </div>
          ))}

          <button className={styles.resultAction} onClick={handleClear}>
            ↻ Take Assessment Again
          </button>
        </div>
      )}

      {/* Button Grid (shown in calc + question modes) */}
      {mode !== 'result' && (
        <div className={styles.buttonGrid}>
          {buttons.flat().map((btn, i) => {
            if (!btn) return <div key={`empty-${i}`} />;

            const isNum = /^\d$/.test(btn);
            const isOp = ['+', '-', '*', '/', '=', '%', '√', '±', '1/x', '←'].includes(btn);
            const isMem = ['MC', 'MR', 'MS', 'M+'].includes(btn);
            const isClear = ['C', 'CE'].includes(btn);
            const isEq = btn === '=';

            let className = styles.calcBtn;
            if (isNum) className += ` ${styles.numBtn}`;
            if (isOp) className += ` ${styles.opBtn}`;
            if (isMem) className += ` ${styles.memBtn}`;
            if (isClear) className += ` ${styles.clearBtn}`;
            if (isEq) className += ` ${styles.eqBtn}`;

            return (
              <button
                key={`${btn}-${i}`}
                className={className}
                onClick={() => {
                  if (isEq) handleEquals();
                  else if (btn === 'C' || btn === 'CE') handleClear();
                  else if (isNum) handleNumber(btn);
                }}
              >
                {btn}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const calculatorConfig: AppConfig = {
  id: 'calculator',
  title: 'Calculator',
  icon: '/icons/calculator.png',
  defaultSize: { width: 260, height: 320 },
  minSize: { width: 230, height: 290 },
  component: Calculator,
};
