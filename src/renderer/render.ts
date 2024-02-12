import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

export const renderApp = (app: ReactNode) => {
  const domNode = document.getElementById('root');
  if (!domNode) {
    throw new Error('Root DOM is not found');
  }
  const root = createRoot(domNode);
  root.render(app);
};