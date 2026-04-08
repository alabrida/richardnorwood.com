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
addDesktopIcon({ appId: 'my-computer',        icon: '/icons/icons/servers.png',             label: 'Core Infrastructure',        gridPosition: [0, 0] });
addDesktopIcon({ appId: 'internet-explorer',  icon: '/icons/icons/compass.png',             label: 'Acquisition Channels',       gridPosition: [0, 1] });
addDesktopIcon({ appId: 'outlook-express',    icon: '/icons/icons/briefcase.png',           label: 'Lifecycle Messaging',        gridPosition: [0, 2] });
addDesktopIcon({ appId: 'aim',                icon: '/icons/icons/aim.png',                label: 'Partnership Ecosystem',      gridPosition: [0, 3] });
addDesktopIcon({ appId: 'calculator',         icon: '/icons/icons/abacus.png',              label: 'Pricing & Monetization',     gridPosition: [0, 4] });
addDesktopIcon({ appId: 'notepad',            icon: '/icons/icons/professional_docs.png',   label: 'CRM & User Notes',           gridPosition: [0, 5] });
addDesktopIcon({ appId: 'minesweeper',        icon: '/icons/icons/waste_basket.png',        label: 'Risk & Compliance',          gridPosition: [0, 6] });
addDesktopIcon({ appId: 'media-player',       icon: '/icons/icons/clapperboard.png',        label: 'Content Marketing',          gridPosition: [0, 7] });
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
