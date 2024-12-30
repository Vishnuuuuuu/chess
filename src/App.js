// import { Chess } from "chess.js";
// import React, { useState } from "react";
// import { Chessboard } from "react-chessboard";

// function App() {
//   const [pgn, setPgn] = useState(""); // PGN input
//   const [chess] = useState(new Chess()); // Chess.js instance
//   const [parsedMoves, setParsedMoves] = useState([]); // Parsed moves
//   const [currentMoveIndex, setCurrentMoveIndex] = useState(0); // Current move index
//   const [gameInfo, setGameInfo] = useState(null); // Game metadata
//   const [isReviewing, setIsReviewing] = useState(false); // Review mode toggle

//   const parsePGN = () => {
//     chess.reset(); // Reset the board

//     const headers = {};
//     const moves = [];

//     // Split PGN into lines
//     const lines = pgn.split("\n");
//     lines.forEach((line) => {
//       if (line.startsWith("[")) {
//         // Extract headers (e.g., [Event "Shamkir Chess"])
//         const match = line.match(/\[(\w+)\s+"(.+)"\]/);
//         if (match) headers[match[1]] = match[2];
//       } else if (line.trim() && !line.startsWith("[")) {
//         // Extract moves and remove annotations like [%clk...]
//         const cleanedLine = line.replace(/\{.*?\}/g, "").trim(); // Remove annotations
//         moves.push(...cleanedLine.split(/\s+/).filter((m) => !m.includes("."))); // Remove move numbers
//       }
//     });

//     setParsedMoves(moves); // Save parsed moves
//     setGameInfo(headers); // Save game metadata
//     setCurrentMoveIndex(0);
//     setIsReviewing(true); // Start review mode
//   };

//   const handleNextMove = () => {
//     if (currentMoveIndex < parsedMoves.length) {
//       chess.move(parsedMoves[currentMoveIndex]);
//       setCurrentMoveIndex(currentMoveIndex + 1);
//     }
//   };

//   const handlePreviousMove = () => {
//     if (currentMoveIndex > 0) {
//       chess.reset();
//       parsedMoves.slice(0, currentMoveIndex - 1).forEach((move) => {
//         chess.move(move);
//       });
//       setCurrentMoveIndex(currentMoveIndex - 1);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-5 space-y-5">
//       {/* PGN Input */}
//       <textarea
//         className="w-full max-w-md p-2 border rounded-md"
//         rows="5"
//         placeholder="Paste PGN here..."
//         value={pgn}
//         onChange={(e) => setPgn(e.target.value)}
//       ></textarea>
//       <button
//         className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         onClick={parsePGN}
//       >
//         Start Review
//       </button>

//       {/* Chessboard */}
//       <div className="flex">
//         <Chessboard position={chess.fen()} boardWidth={400} />
//         {isReviewing && gameInfo && (
//           <div className="ml-4 w-80 p-4 border rounded-md bg-gray-100">
//             <h2 className="text-xl font-bold mb-4">Game Details</h2>
//             <p>
//               <strong>Event:</strong> {gameInfo.Event || "N/A"}
//             </p>
//             <p>
//               <strong>Site:</strong> {gameInfo.Site || "N/A"}
//             </p>
//             <p>
//               <strong>Date:</strong> {gameInfo.Date || "N/A"}
//             </p>
//             <p>
//               <strong>Round:</strong> {gameInfo.Round || "N/A"}
//             </p>
//             <p>
//               <strong>White:</strong> {gameInfo.White || "N/A"} ({gameInfo.WhiteTitle || "N/A"}, {gameInfo.WhiteElo || "N/A"})
//             </p>
//             <p>
//               <strong>Black:</strong> {gameInfo.Black || "N/A"} ({gameInfo.BlackTitle || "N/A"}, {gameInfo.BlackElo || "N/A"})
//             </p>
//             <p>
//               <strong>Result:</strong> {gameInfo.Result || "N/A"}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Controls */}
//       {isReviewing && (
//         <div className="flex space-x-4">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             onClick={handlePreviousMove}
//           >
//             Previous
//           </button>
//           <button
//             className="px-4 py-2 bg-green-500 text-white rounded-md"
//             onClick={handleNextMove}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from "react";
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

function TopNav() {
  const location = useLocation();

  // If we are on /dashboard, hide the sign in/up
  const hideAuthButtons = location.pathname === "/dashboard";

  return (
    <nav className="bg-gray-200 p-4 flex justify-between items-center">
      <div className="font-bold text-xl text-green-600">MyChess</div>
      {!hideAuthButtons && (
        <div className="space-x-4">
          <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Sign Up
          </Link>
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
