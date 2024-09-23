export const EmojiIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={33}
            height={33}
            viewBox="0 0 33 33"
            fill="none"
        >
            <path
                d="M16.5 30.25C24.0939 30.25 30.25 24.0939 30.25 16.5C30.25 8.90608 24.0939 2.75 16.5 2.75C8.90608 2.75 2.75 8.90608 2.75 16.5C2.75 24.0939 8.90608 30.25 16.5 30.25Z"
                stroke="#353535"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <g filter="url(#filter0_d_3002_590)">
                <path
                    d="M11 19.25C11 19.25 13.0625 22 16.5 22C19.9375 22 22 19.25 22 19.25"
                    stroke="#353535"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    shapeRendering="crispEdges"
                />
            </g>
            <path
                d="M12.375 12.375H12.3888"
                stroke="#353535"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20.625 12.375H20.6388"
                stroke="#353535"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <defs>
                <filter
                    id="filter0_d_3002_590"
                    x={6}
                    y="18.2499"
                    width={21}
                    height="12.7501"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy={4} />
                    <feGaussianBlur stdDeviation={2} />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_3002_590"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_3002_590"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>

    )
}