import React, { useState } from 'react';
import { genericPlaceholders } from '../utils/bikeImages';

export function ImagePicker({ category, onSelect, currentImage }) {
  const [showPicker, setShowPicker] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  const placeholders = genericPlaceholders[category] || [];

  const handleSelect = (url) => {
    onSelect(url);
    setShowPicker(false);
  };

  const handleCustomUrl = () => {
    if (customUrl.trim()) {
      handleSelect(customUrl);
      setCustomUrl('');
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        Product Image
      </label>

      {currentImage && (
        <div className="mb-3 border-2 border-fuchsia-200 rounded p-2 bg-slate-50">
          <img
            src={currentImage}
            alt="Current"
            className="w-full h-32 object-cover rounded"
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded mb-2"
      >
        {showPicker ? 'Hide Gallery' : 'Select from Gallery'}
      </button>

      {showPicker && (
        <div className="bg-slate-50 p-4 rounded border border-slate-200 mb-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {placeholders.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(url)}
                className="border-2 border-slate-300 hover:border-fuchsia-500 rounded overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={url}
                  alt={`Option ${idx + 1}`}
                  className="w-full h-20 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x80?text=Error';
                  }}
                />
              </button>
            ))}
          </div>

          <div className="border-t pt-3">
            <p className="text-sm font-semibold mb-2">Or paste image URL:</p>
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm"
              />
              <button
                type="button"
                onClick={handleCustomUrl}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
