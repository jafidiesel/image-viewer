import React, { useRef } from "react";

import "./styles.css";
import ConnectedDogMosaic from "./components/ConnectedDogMosaic.tsx";

const App: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);

  return (
    <div className="app" ref={appRef}>
      <ConnectedDogMosaic />
    </div>
  );
};

export default App;
