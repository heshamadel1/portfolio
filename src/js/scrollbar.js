import 'overlayscrollbars/styles/overlayscrollbars.css';
import { OverlayScrollbars } from 'overlayscrollbars';

const scrollbar = OverlayScrollbars(document.body, {
  overflow: {
    x: 'hidden',
    y: 'scroll',
  },
  scrollbars: {
    theme: 'os-theme-portfolio',
    visibility: 'auto',
    autoHide: 'scroll',
    autoHideDelay: 600,
    autoHideSuspend: false,
    dragScroll: true,
    clickScroll: true,
  },
});
