export default function SocialsIllustration({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="50" cy="50" r="45" fill="#E9D5FF" />
            <circle cx="50" cy="40" r="8" fill="#9333EA" />
            <circle cx="35" cy="65" r="8" fill="#9333EA" />
            <circle cx="65" cy="65" r="8" fill="#9333EA" />
            <path d="M50 40L35 65M50 40L65 65" stroke="#9333EA" strokeWidth="3" />
        </svg>
    );
}
