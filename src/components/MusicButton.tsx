interface MusicButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

function MusicButton({ isPlaying, onClick }: MusicButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-8 h-8 rounded-full border transition-all duration-300 hover:scale-110"
      style={{
        borderColor: isPlaying ? '#ff0000' : '#666666',
        boxShadow: isPlaying ? '0 0 10px rgba(255, 0, 0, 0.5)' : 'none'
      }}
    >
      <svg
        className="absolute inset-0"
        viewBox="0 0 24 24"
        fill="none"
      >
        {isPlaying ? (
          // Animated wavy line
          <path
            d="M 6 12 Q 9 9, 12 12 T 18 12"
            stroke="#ff0000"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M 6 12 Q 9 9, 12 12 T 18 12;
                      M 6 12 Q 9 15, 12 12 T 18 12;
                      M 6 12 Q 9 9, 12 12 T 18 12"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        ) : (
          // Static straight line
          <line
            x1="6"
            y1="12"
            x2="18"
            y2="12"
            stroke="#666666"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );
}

export default MusicButton;

