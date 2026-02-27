export default function PlannerIllustration({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="50" cy="50" r="45" fill="#FFEDD5" />
            <rect x="30" y="35" width="40" height="35" rx="4" fill="#F97316" />
            <path d="M40 30V40" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 30V40" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" />
            <rect x="35" y="45" width="30" height="20" rx="2" fill="#FFF7ED" opacity="0.5" />
        </svg>
    );
}
