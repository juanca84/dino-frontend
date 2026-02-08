export function DinoLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* T-Rex skull fossil - side view */}
      
      {/* Main skull */}
      <ellipse cx="100" cy="95" rx="55" ry="60" opacity="0.9" />
      
      {/* Snout/jaw area - pointed */}
      <path d="M 55 100 L 30 105 L 35 110 L 60 105 Z" />
      
      {/* Upper jaw line */}
      <path d="M 60 80 L 35 75" strokeWidth="3" stroke="currentColor" fill="none" />
      
      {/* Lower jaw line */}
      <path d="M 60 120 L 35 125" strokeWidth="3" stroke="currentColor" fill="none" />
      
      {/* Eye socket - large and dark */}
      <circle cx="90" cy="85" r="12" opacity="0.7" />
      <circle cx="90" cy="85" r="8" opacity="0.9" />
      
      {/* Nostril */}
      <circle cx="50" cy="100" r="4" opacity="0.7" />
      
      {/* Teeth upper row - small lines */}
      <line x1="50" y1="80" x2="50" y2="75" strokeWidth="2" stroke="currentColor" opacity="0.6" />
      <line x1="45" y1="78" x2="45" y2="73" strokeWidth="2" stroke="currentColor" opacity="0.6" />
      <line x1="40" y1="77" x2="40" y2="72" strokeWidth="2" stroke="currentColor" opacity="0.6" />
      
      {/* Teeth lower row - small lines */}
      <line x1="50" y1="120" x2="50" y2="125" strokeWidth="2" stroke="currentColor" opacity="0.6" />
      <line x1="45" y1="122" x2="45" y2="127" strokeWidth="2" stroke="currentColor" opacity="0.6" />
      <line x1="40" y1="123" x2="40" y2="128" strokeWidth="2" stroke="currentColor" opacity="0.6" />
      
      {/* Bone texture lines - fossil detail */}
      <path d="M 75 70 Q 85 65 95 68" strokeWidth="2" stroke="currentColor" fill="none" opacity="0.4" />
      <path d="M 75 130 Q 85 135 95 132" strokeWidth="2" stroke="currentColor" fill="none" opacity="0.4" />
      <path d="M 110 75 Q 115 70 125 75" strokeWidth="2" stroke="currentColor" fill="none" opacity="0.4" />
      <path d="M 110 125 Q 115 130 125 125" strokeWidth="2" stroke="currentColor" fill="none" opacity="0.4" />
      
      {/* Cracks/fossil marks */}
      <line x1="80" y1="90" x2="85" y2="100" strokeWidth="1" stroke="currentColor" opacity="0.3" />
      <line x1="100" y1="70" x2="105" y2="80" strokeWidth="1" stroke="currentColor" opacity="0.3" />
      <line x1="100" y1="130" x2="105" y2="120" strokeWidth="1" stroke="currentColor" opacity="0.3" />
    </svg>
  )
}


