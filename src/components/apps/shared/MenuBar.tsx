'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import styles from './MenuBar.module.css';

export interface MenuItem {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  checked?: boolean;
  separator?: boolean;
  onClick?: () => void;
}

export interface MenuGroup {
  label: string;
  items: MenuItem[];
}

interface MenuBarProps {
  menus: MenuGroup[];
}

export default function MenuBar({ menus }: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (activeMenu === null) return;
    const handleClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMenu(null);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [activeMenu]);

  const handleMenuClick = useCallback((index: number) => {
    setActiveMenu((prev) => (prev === index ? null : index));
  }, []);

  const handleMenuHover = useCallback(
    (index: number) => {
      if (activeMenu !== null) {
        setActiveMenu(index);
      }
    },
    [activeMenu]
  );

  const handleItemClick = useCallback(
    (item: MenuItem) => {
      if (item.disabled) return;
      item.onClick?.();
      setActiveMenu(null);
    },
    []
  );

  // Parse underline access key
  const renderLabel = (label: string) => {
    const ampIdx = label.indexOf('&');
    if (ampIdx === -1) return label;
    return (
      <>
        {label.slice(0, ampIdx)}
        <span className={styles.accessKey}>{label[ampIdx + 1]}</span>
        {label.slice(ampIdx + 2)}
      </>
    );
  };

  return (
    <div className={styles.menuBar} ref={barRef}>
      {menus.map((menu, i) => (
        <div key={menu.label} style={{ position: 'relative' }}>
          <button
            className={`${styles.menuItem} ${activeMenu === i ? styles.active : ''}`}
            onClick={() => handleMenuClick(i)}
            onMouseEnter={() => handleMenuHover(i)}
          >
            {renderLabel(menu.label)}
          </button>

          {activeMenu === i && (
            <div className={styles.dropdown}>
              {menu.items.map((item, j) =>
                item.separator ? (
                  <div key={`sep-${j}`} className={styles.dropdownSeparator} />
                ) : (
                  <button
                    key={item.label}
                    className={`${styles.dropdownItem} ${item.disabled ? styles.disabled : ''}`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.checked && <span className={styles.checkmark}>✓</span>}
                    {renderLabel(item.label)}
                    {item.shortcut && (
                      <span className={styles.shortcut}>{item.shortcut}</span>
                    )}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
