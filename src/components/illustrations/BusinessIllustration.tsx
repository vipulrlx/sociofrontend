export default function BusinessIllustration({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="50" cy="50" r="45" fill="#BFDBFE" />
            <path
                d="M30 40H70V70C70 72.7614 67.7614 75 65 75H35C32.2386 75 30 72.7614 30 70V40Z"
                fill="#3B82F6"
            />
            <path
                d="M40 40V35C40 32.2386 42.2386 30 45 30H55C57.7614 30 60 32.2386 60 35V40"
                stroke="#2563EB"
                strokeWidth="4"
                strokeLinecap="round"
            />
            <rect x="35" y="45" width="30" height="2" rx="1" fill="#60A5FA" />
        </svg>
    );
}
