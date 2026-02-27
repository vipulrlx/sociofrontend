export default function ProductIllustration({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="50" cy="50" r="45" fill="#D1FAE5" />
            <path
                d="M50 25L75 37.5V62.5L50 75L25 62.5V37.5L50 25Z"
                fill="#10B981"
            />
            <path d="M50 25V50M50 50L75 37.5M50 50L25 37.5" stroke="#059669" strokeWidth="2" />
            <path d="M50 50V75" stroke="#059669" strokeWidth="2" />
        </svg>
    );
}
