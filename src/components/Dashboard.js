// src/components/Dashboard.js

import { Chess } from "chess.js";
import React, { useState } from "react";
import { Chessboard } from "react-chessboard";

function Dashboard() {
  // -- Chess / PGN states --
  const [pgn, setPgn] = useState("");
  const [chess] = useState(new Chess());
  const [parsedMoves, setParsedMoves] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [gameInfo, setGameInfo] = useState(null);
  const [isReviewing, setIsReviewing] = useState(false);

  // -- Sidebar toggle state (for small screens) --
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // -- Board theme toggle --
  const [boardTheme, setBoardTheme] = useState("default");

  // Two sample board color configurations (custom dark/light square styles)
  const chessBoardStyles = {
    default: {
      dark: { backgroundColor: "#769656" }, // greenish
      light: { backgroundColor: "#eeeed2" }, // tan
    },
    alternative: {
      dark: { backgroundColor: "#b58863" }, // more brown
      light: { backgroundColor: "#f0d9b5" }, // lighter tan
    },
  };

  // Toggle board theme
  const handleBoardThemeToggle = () => {
    setBoardTheme((prev) => (prev === "default" ? "alternative" : "default"));
  };

  // =================== PGN Parsing ===================
  const parsePGN = () => {
    chess.reset();

    const headers = {};
    const moves = [];

    const lines = pgn.split("\n");
    lines.forEach((line) => {
      if (line.startsWith("[")) {
        const match = line.match(/\[(\w+)\s+"(.+)"\]/);
        if (match) {
          headers[match[1]] = match[2];
        }
      } else if (line.trim() && !line.startsWith("[")) {
        const cleanedLine = line.replace(/\{.*?\}/g, "").trim();
        moves.push(
          ...cleanedLine
            .split(/\s+/)
            .filter(
              (m) =>
                !m.includes(".") && !["1-0", "0-1", "1/2-1/2"].includes(m)
            )
        );
      }
    });

    setParsedMoves(moves);
    setGameInfo(headers);
    setCurrentMoveIndex(0);
    setIsReviewing(true);
  };

  // =================== Move Controls ===================
  const handleNextMove = () => {
    if (currentMoveIndex < parsedMoves.length) {
      chess.move(parsedMoves[currentMoveIndex]);
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  const handlePreviousMove = () => {
    if (currentMoveIndex > 0) {
      chess.reset();
      parsedMoves.slice(0, currentMoveIndex - 1).forEach((move) => {
        chess.move(move);
      });
      setCurrentMoveIndex(currentMoveIndex - 1);
    }
  };

  // =================== Show Final Result ===================
  const totalMoves = parsedMoves.length;
  const onLastMove = currentMoveIndex === totalMoves;

  const renderResultMessage = (result) => {
    if (result === "1-0") {
      return (
        <div className="mt-2 p-2 text-center text-green-600 font-semibold animate-pulse">
          White Wins!
        </div>
      );
    } else if (result === "0-1") {
      return (
        <div className="mt-2 p-2 text-center text-red-600 font-semibold animate-pulse">
          Black Wins!
        </div>
      );
    } else if (result === "1/2-1/2") {
      return (
        <div className="mt-2 p-2 text-center text-blue-600 font-semibold animate-pulse">
          Draw!
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 text-gray-900">
      {/* 
        HEADER for small screens only: 
        contains a "Menu" title & hamburger icon 
      */}
      <div className="p-4 border-b md:hidden flex justify-between items-center">
        <h1 className="font-bold text-lg">Menu</h1>
        <button onClick={() => setSidebarOpen((prev) => !prev)}>
          <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
            <path d="M2 6h16M2 10h16M2 14h16" />
          </svg>
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
          p-4 w-full md:w-60 flex-shrink-0 bg-gray-800 text-white
          ${sidebarOpen ? "block" : "hidden md:block"}
        `}
      >
        <nav className="flex flex-col space-y-2">
          <button className="text-left hover:bg-gray-700 px-2 py-1 rounded">
            Play
          </button>
          <button className="text-left hover:bg-gray-700 px-2 py-1 rounded">
            Import
          </button>
          <button className="text-left hover:bg-gray-700 px-2 py-1 rounded">
            Set Up
          </button>
          <button className="text-left hover:bg-gray-700 px-2 py-1 rounded">
            Examples
          </button>
          <button className="text-left hover:bg-gray-700 px-2 py-1 rounded">
            History
          </button>
          <button className="text-left hover:bg-gray-700 px-2 py-1 rounded">
            Preferences
          </button>
          <button className="text-left hover:bg-gray-700 px-2 py-1 rounded">
            Help
          </button>
          <button className="text-left hover:bg-gray-700 px-2 py-1 rounded">
            English
          </button>
          {/* Themes button toggles the board theme */}
          <button
            onClick={handleBoardThemeToggle}
            className="text-left hover:bg-gray-700 px-2 py-1 rounded"
          >
            Themes
          </button>
          <button className="text-left hover:bg-gray-700 px-2 py-1 rounded text-yellow-400">
            Upgrade
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      {/*
        The critical change is here: we turn the main content area 
        into a flex container that centers its children. 
      */}
      <div className="flex-1 overflow-auto p-5 flex justify-center">
        {/* 
          We use a container with max width and auto margin to keep everything 
          nicely centered on larger screens. 
        */}
        <div className="max-w-4xl w-full flex flex-col items-center space-y-5">
          {/* PGN Textarea */}
          <textarea
            className="w-full max-w-md p-2 border rounded-md"
            rows="5"
            placeholder="Paste PGN here..."
            value={pgn}
            onChange={(e) => setPgn(e.target.value)}
          />

          {/* Start Review Button */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={parsePGN}
          >
            Start Review
          </button>

          {/* Chessboard + Info Pane */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            {/* Chessboard with dynamic theme */}
            <div className="flex-shrink-0">
              <Chessboard
                position={chess.fen()}
                boardWidth={400}
                customDarkSquareStyle={chessBoardStyles[boardTheme].dark}
                customLightSquareStyle={chessBoardStyles[boardTheme].light}
              />
            </div>

            {/* Game Info Pane */}
            {isReviewing && gameInfo && (
              <div className="w-full md:w-80 p-4 border rounded-md bg-white">
                <h2 className="text-xl font-bold mb-4">Game Details</h2>
                <p>
                  <strong>Event:</strong> {gameInfo.Event || "N/A"}
                </p>
                <p>
                  <strong>Site:</strong> {gameInfo.Site || "N/A"}
                </p>
                <p>
                  <strong>Date:</strong> {gameInfo.Date || "N/A"}
                </p>
                <p>
                  <strong>Round:</strong> {gameInfo.Round || "N/A"}
                </p>
                <p>
                  <strong>White:</strong> {gameInfo.White || "N/A"} (
                  {gameInfo.WhiteTitle || "N/A"},{" "}
                  {gameInfo.WhiteElo || "N/A"})
                </p>
                <p>
                  <strong>Black:</strong> {gameInfo.Black || "N/A"} (
                  {gameInfo.BlackTitle || "N/A"},{" "}
                  {gameInfo.BlackElo || "N/A"})
                </p>
                <p>
                  <strong>Result:</strong> {gameInfo.Result || "N/A"}
                </p>
                {onLastMove && gameInfo.Result && renderResultMessage(gameInfo.Result)}
              </div>
            )}
          </div>

          {/* Move Controls */}
          {isReviewing && (
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handlePreviousMove}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={handleNextMove}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
