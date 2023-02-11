import type { ReactElement } from 'react';
import { InfoOverlay } from './components/RoutesOverlay';

function App(): ReactElement {
  return (
    <div className="flex flex-col relative w-screen h-screen">
      <InfoOverlay />
    </div>
  );
}

export default App;
