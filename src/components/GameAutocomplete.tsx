import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface GameSuggestion {
  id: number;
  name: string;
  releaseDate: string | null;
  coverUrl: string | null;
}

interface GameAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onGameSelect?: (game: GameSuggestion) => void;
  placeholder?: string;
  className?: string;
}

export default function GameAutocomplete({
  value,
  onChange,
  onGameSelect,
  placeholder = "Search for a game...",
  className = "",
}: GameAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<GameSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMouseOverSuggestions, setIsMouseOverSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (value.length >= 2) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3000/api/games/search?q=${encodeURIComponent(
              value
            )}`
          );
          const data = await response.json();
          setSuggestions(data);
          setIsOpen(true);
          setSelectedIndex(-1);
        } catch (error) {
          console.error("Error searching games:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion: GameSuggestion) => {
    onChange(suggestion.name);
    onGameSelect?.(suggestion);
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      selectedElement?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && setIsOpen(true)}
          onBlur={() => {
            // Only close if mouse is not over suggestions
            setTimeout(() => {
              if (!isMouseOverSuggestions) {
                setIsOpen(false);
              }
            }, 150);
          }}
          placeholder={placeholder}
          className="w-full px-3 py-2 pl-10 bg-gray-900 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto"
          onMouseEnter={() => setIsMouseOverSuggestions(true)}
          onMouseLeave={() => setIsMouseOverSuggestions(false)}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-800 ${
                index === selectedIndex ? "bg-purple-600" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Cover Image */}
                <div className="flex-shrink-0 w-8 h-10 bg-gray-700 rounded overflow-hidden">
                  {suggestion.coverUrl ? (
                    <img
                      src={suggestion.coverUrl}
                      alt={`${suggestion.name} cover`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // replace with game controller icon on error
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML =
                            '<div class="w-full h-full flex items-center justify-center text-gray-500 text-xs">🎮</div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                      🎮
                    </div>
                  )}
                </div>

                {/* Game Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-white font-medium truncate block">
                      {suggestion.name}
                    </span>
                    {suggestion.releaseDate && (
                      <span className="text-gray-400 text-xs ml-2 flex-shrink-0">
                        {suggestion.releaseDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isOpen &&
        value.length >= 2 &&
        suggestions.length === 0 &&
        !isLoading && (
          <div
            className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded-md shadow-lg p-3"
            onMouseEnter={() => setIsMouseOverSuggestions(true)}
            onMouseLeave={() => setIsMouseOverSuggestions(false)}
          >
            <p className="text-gray-400 text-sm">
              No games found matching "{value}"
            </p>
          </div>
        )}
    </div>
  );
}
