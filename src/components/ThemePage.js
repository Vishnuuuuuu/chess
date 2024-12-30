// src/components/ThemePage.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

function ThemePage() {
  const { setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Just two “themes” for demonstration
  const handleSelectDefault = () => {
    setTheme("default");
    navigate("/dashboard");
  };

  const handleSelectAlternative = () => {
    setTheme("alternative");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">Choose Your Theme</h1>

      {/* Row with two theme previews */}
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 items-center">
        {/* Default Theme Preview */}
        <div className="bg-white p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-4">Default Theme</h2>
          {/* A static image or mini chessboard preview */}
          <img
            src="/images/board_default_preview.png"
            alt="Default Theme Preview"
            className="w-64 h-auto"
          />
          <button
            onClick={handleSelectDefault}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Select Theme
          </button>
        </div>

        {/* Alternative Theme Preview */}
        <div className="bg-white p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-4">Alternative Theme</h2>
          {/* Another static image or mini chessboard preview */}
          <img
            src="/images/board_alternative_preview.png"
            alt="Alternative Theme Preview"
            className="w-64 h-auto"
          />
          <button
            onClick={handleSelectAlternative}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Select Theme
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThemePage;
