import React from "react";

const KeywordInput = ({
  label,
  keywords,
  inputValue,
  setInputValue,
  handleKeyPress,
  removeKeyword,
  pillColor,
}) => {
  return (
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="w-full px-3 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <div className="flex flex-wrap gap-2 mb-2">
          {keywords.map((kw, index) => (
            <div
              key={index}
              className={`${pillColor} px-2 py-1 rounded flex items-center`}
            >
              {kw}
              <button
                onClick={() => removeKeyword(index)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full outline-none border-none"
          placeholder="e.g., React"
        />
      </div>
    </div>
  );
};

export default KeywordInput;