/* ── Register All Apps ──
   Import this file ONCE at the app root to populate
   the registry, desktop icons, and start menu entries. */

import { registerApp, addDesktopIcon, addStartMenuEntry } from './registry';
import { notepadConfig } from '@/components/apps/Notepad/Notepad';
import { calculatorConfig } from '@/components/apps/Calculator/Calculator';
import { internetExplorerConfig } from '@/components/apps/InternetExplorer/InternetExplorer';
import { outlookExpressConfig } from '@/components/apps/OutlookExpress/OutlookExpress';
import { aimConfig } from '@/components/apps/AIM/AIM';
import { myComputerConfig } from '@/components/apps/MyComputer/MyComputer';
import { minesweeperConfig } from '@/components/apps/Minesweeper/Minesweeper';
import { helpCenterConfig } from '@/components/apps/HelpCenter/HelpCenter';
import { controlPanelConfig } from '@/components/apps/ControlPanel/ControlPanel';
import { mediaPlayerConfig } from '@/components/apps/MediaPlayer/MediaPlayer';
import { productActivationConfig } from '@/components/apps/ProductActivation/ProductActivation';

// ── Register each app ──
const apps = [
  notepadConfig,
  calculatorConfig,
  internetExplorerConfig,
  outlookExpressConfig,
  aimConfig,
  myComputerConfig,
  minesweeperConfig,
  helpCenterConfig,
  controlPanelConfig,
  mediaPlayerConfig,
  productActivationConfig,
];
apps.forEach(registerApp);

// ── Desktop Icons (left column, top to bottom) ──
addDesktopIcon({ appId: 'my-computer',        icon: '/icons/mycomputer.png',   label: 'My Computer',        gridPosition: [0, 0] });
addDesktopIcon({ appId: 'internet-explorer',   icon: '/icons/ie6.png',          label: 'Internet Explorer',  gridPosition: [0, 1] });
addDesktopIcon({ appId: 'outlook-express',     icon: '/icons/outlook.png',      label: 'Outlook Express',    gridPosition: [0, 2] });
addDesktopIcon({ appId: 'aim',                 icon: '/icons/aim.png',          label: 'AIM',                gridPosition: [0, 3] });
addDesktopIcon({ appId: 'calculator',          icon: '/icons/calculator.png',   label: 'Calculator',         gridPosition: [0, 4] });
addDesktopIcon({ appId: 'notepad',             icon: '/icons/notepad.png',      label: 'Notepad',            gridPosition: [0, 5] });
addDesktopIcon({ appId: 'minesweeper',         icon: '/icons/minesweeper.png',  label: 'Minesweeper',        gridPosition: [0, 6] });

// ── Start Menu — Pinned (top section, most-used business apps) ──
addStartMenuEntry({ appId: 'internet-explorer',   section: 'pinned' });
addStartMenuEntry({ appId: 'outlook-express',      section: 'pinned' });
addStartMenuEntry({ appId: 'aim',                  section: 'pinned' });

// ── Start Menu — Frequent (recently used) ──
addStartMenuEntry({ appId: 'calculator',           section: 'frequent' });
addStartMenuEntry({ appId: 'notepad',              section: 'frequent' });
addStartMenuEntry({ appId: 'media-player',         section: 'frequent' });

// ── Start Menu — System (All Programs / system utilities) ──
addStartMenuEntry({ appId: 'my-computer',          section: 'system' });
addStartMenuEntry({ appId: 'control-panel',        section: 'system' });
addStartMenuEntry({ appId: 'help-center',          section: 'system' });
addStartMenuEntry({ appId: 'product-activation',   section: 'system' });
addStartMenuEntry({ appId: 'minesweeper',          section: 'system' });
