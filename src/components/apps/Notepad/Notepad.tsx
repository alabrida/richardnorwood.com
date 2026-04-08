'use client';

import { useState, useCallback } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import MenuBar from '@/components/apps/shared/MenuBar';
import type { MenuGroup } from '@/components/apps/shared/MenuBar';
import aboutData from '@/../content/about.json';
import styles from './Notepad.module.css';

const defaultContent = `${aboutData.name} — ${aboutData.title}
${'='.repeat(50)}

${aboutData.bio}

Credentials: ${aboutData.credentials.join(', ')}

Expertise: ${aboutData.expertise.join(', ')}

Mission: ${aboutData.mission}
`;

export default function Notepad({ onTitleChange }: AppProps) {
  const [content, setContent] = useState(defaultContent);
  const [wordWrap, setWordWrap] = useState(true);

  const toggleWordWrap = useCallback(() => {
    setWordWrap((prev) => !prev);
  }, []);

  const menus: MenuGroup[] = [
    {
      label: '&File',
      items: [
        { label: '&New', shortcut: 'Ctrl+N', disabled: true },
        { label: '&Open...', shortcut: 'Ctrl+O', disabled: true },
        { label: '&Save', shortcut: 'Ctrl+S', disabled: true },
        { label: 'Save &As...', disabled: true },
        { label: '', separator: true },
        { label: 'Page Set&up...', disabled: true },
        { label: '&Print...', shortcut: 'Ctrl+P', disabled: true },
        { label: '', separator: true },
        { label: 'E&xit', onClick: () => {} },
      ],
    },
    {
      label: '&Edit',
      items: [
        { label: '&Undo', shortcut: 'Ctrl+Z', disabled: true },
        { label: '', separator: true },
        { label: 'Cu&t', shortcut: 'Ctrl+X', disabled: true },
        { label: '&Copy', shortcut: 'Ctrl+C', disabled: true },
        { label: '&Paste', shortcut: 'Ctrl+V', disabled: true },
        { label: 'De&lete', shortcut: 'Del', disabled: true },
        { label: '', separator: true },
        { label: 'Select &All', shortcut: 'Ctrl+A', disabled: true },
        { label: 'Time/&Date', shortcut: 'F5', disabled: true },
      ],
    },
    {
      label: 'F&ormat',
      items: [
        { label: '&Word Wrap', checked: wordWrap, onClick: toggleWordWrap },
        { label: '&Font...', disabled: true },
      ],
    },
    {
      label: '&View',
      items: [
        { label: '&Status Bar', checked: true, disabled: true },
      ],
    },
    {
      label: '&Help',
      items: [
        { label: '&Help Topics', disabled: true },
        { label: '', separator: true },
        { label: '&About Notepad', disabled: true },
      ],
    },
  ];

  return (
    <div className={styles.notepad}>
      <MenuBar menus={menus} />
      <textarea
        className={`${styles.textarea} ${wordWrap ? styles.wordWrap : ''}`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck={false}
      />
      <div className={styles.statusBar}>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}

export const notepadConfig: AppConfig = {
  id: 'notepad',
  title: 'CRM & User Notes',
  icon: '/icons/icons/professional_docs.png',
  defaultSize: { width: 600, height: 450 },
  minSize: { width: 300, height: 200 },
  component: Notepad,
};
