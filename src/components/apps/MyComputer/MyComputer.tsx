'use client';

import { useState, useCallback } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import MenuBar from '@/components/apps/shared/MenuBar';
import type { MenuGroup } from '@/components/apps/shared/MenuBar';
import dashboardData from '@/../content/dashboard-stub.json';
import styles from './MyComputer.module.css';
import RevenueDashboard from './RevenueDashboard';

type ComputerView = 'drives' | 'dashboard' | 'history';

export default function MyComputer({ onTitleChange, onClose }: AppProps) {
  const [view, setView] = useState<ComputerView>('drives');

  const navigate = useCallback((target: ComputerView) => {
    setView(target);
    const titles: Record<ComputerView, string> = {
      drives: 'My Computer',
      dashboard: 'C:\\Revenue Dashboard',
      history: 'D:\\Assessment History',
    };
    onTitleChange?.(titles[target]);
  }, [onTitleChange]);

  const menus: MenuGroup[] = [
    { label: '&File', items: [{ label: '&Close', onClick: () => onClose?.() }] },
    { label: '&Edit', items: [{ label: '&Copy', shortcut: 'Ctrl+C', disabled: true }, { label: 'Select &All', shortcut: 'Ctrl+A', disabled: true }] },
    { label: '&View', items: [{ label: '&Tiles', checked: true }, { label: '&Icons', disabled: true }, { label: '&List', disabled: true }, { label: '&Details', disabled: true }] },
    { label: '&Help', items: [{ label: '&About My Computer', disabled: true }] },
  ];

  const pathLabels: Record<ComputerView, string> = {
    drives: 'My Computer', dashboard: 'C:\\Revenue Dashboard', history: 'D:\\Assessment History',
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#69DB7C';
    if (score >= 60) return '#FFD43B';
    if (score >= 40) return '#FFA94D';
    return '#FF6B6B';
  };

  return (
    <div className={styles.mycomputer}>
      <MenuBar menus={menus} />
      <div className={styles.addressBar}><span className={styles.addressLabel}>Address</span><input className={styles.addressPath} value={pathLabels[view]} readOnly /></div>
      <div className={styles.body}>
        <div className={styles.navPane}>
          <div className={styles.navSection}>
            <div className={styles.navTitle}>System Tasks</div>
            <button className={styles.navItem} onClick={() => navigate('drives')}>📁 My Computer</button>
            <button className={styles.navItem} onClick={() => navigate('dashboard')}>📊 Revenue Dashboard</button>
            <button className={styles.navItem} onClick={() => navigate('history')}>📋 Assessment History</button>
          </div>
          <div className={styles.navSection}><div className={styles.navTitle}>Other Places</div><button className={styles.navItem} disabled>📂 My Documents</button><button className={styles.navItem} disabled>🌐 My Network Places</button></div>
        </div>
        <div className={styles.contentArea}>
          {view === 'drives' && (<><div className={styles.sectionTitle}>Hard Disk Drives</div><div className={styles.driveGrid}><button className={styles.driveItem} onDoubleClick={() => navigate('dashboard')}><span className={styles.driveIcon}>💾</span><span className={styles.driveLabel}>Revenue Dashboard (C:)</span></button><button className={styles.driveItem} onDoubleClick={() => navigate('history')}><span className={styles.driveIcon}>💿</span><span className={styles.driveLabel}>Assessment History (D:)</span></button></div><div className={styles.sectionTitle}>Other</div><div className={styles.driveGrid}><button className={styles.driveItem} disabled><span className={styles.driveIcon}>📁</span><span className={styles.driveLabel}>My Documents</span></button><button className={styles.driveItem} disabled><span className={styles.driveIcon}>⚙️</span><span className={styles.driveLabel}>Control Panel</span></button></div></>)}
          {view === 'dashboard' && <RevenueDashboard data={dashboardData as any} getScoreColor={getScoreColor} />}
          {view === 'history' && (<><div className={styles.sectionTitle}>Assessment History</div><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}><thead><tr style={{ background: '#f0f0f0', borderBottom: '1px solid #ccc' }}><th style={{ padding: '6px 8px', textAlign: 'left' }}>Date</th><th style={{ padding: '6px 8px', textAlign: 'left' }}>Tier</th><th style={{ padding: '6px 8px', textAlign: 'right' }}>Score</th></tr></thead><tbody>{dashboardData.history.map((entry, i) => (<tr key={i} style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '6px 8px' }}>{entry.date}</td><td style={{ padding: '6px 8px' }}>{entry.maturity_tier}</td><td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 'bold', color: getScoreColor(entry.overall_score) }}>{entry.overall_score}%</td></tr>))}</tbody></table></>)}
        </div>
      </div>
      <div className={styles.statusBar}><span>{view === 'drives' ? '4 objects' : view === 'dashboard' ? `Score: ${dashboardData.overall_score}% | ${dashboardData.leaks.length} leaks` : `${dashboardData.history.length} assessments`}</span></div>
    </div>
  );
}

export const myComputerConfig: AppConfig = {
  id: 'my-computer', title: 'Core Infrastructure', icon: '/icons/icons/servers.png',
  defaultSize: { width: 750, height: 500 }, minSize: { width: 400, height: 300 }, component: MyComputer,
};
