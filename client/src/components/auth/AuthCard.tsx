import { useState } from "react";
import ReactCardFlip from "react-card-flip";

import Signup from "./Signup";
import Login from "./Login";

export default function AuthCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  function flipCard() {
    setIsFlipped((prev) => !prev);
  }

  return (
    <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="card">
          <Signup flipCard={flipCard} />
        </div>
        <div className="card-back">
          <Login flipCard={flipCard} />
        </div>
      </ReactCardFlip>
      </div>
      </div>
    </div>
  );
}
