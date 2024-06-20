interface IconsProps {
    size?: number;
    fill?: string;
    className?: string;
    strokeWidth?: number;
}

const SearchIcon = ({ fill, size, className }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || 20}
            height={size || size}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="M141.367 116.518c-7.384-7.39-19.364-7.39-26.748 0-27.416 27.416-40.891 65.608-36.975 104.79.977 9.761 9.2 17.037 18.803 17.037.631 0 1.267-.032 1.898-.095 10.398-1.04 17.983-10.316 16.943-20.707-2.787-27.845 6.722-54.92 26.079-74.278 7.39-7.383 7.39-19.364 0-26.747z"
                    fill={fill || "currentColor"}
                    opacity="1"
                    data-original="#000000"
                ></path>
                <path
                    d="M216.276 0C97.021 0 0 97.021 0 216.276s97.021 216.276 216.276 216.276 216.276-97.021 216.276-216.276S335.53 0 216.276 0zm0 394.719c-98.396 0-178.443-80.047-178.443-178.443S117.88 37.833 216.276 37.833c98.39 0 178.443 80.047 178.443 178.443s-80.047 178.443-178.443 178.443z"
                    fill={fill || "currentColor"}
                    opacity="1"
                    data-original="#000000"
                ></path>
                <path
                    d="M506.458 479.71 368.999 342.252c-7.39-7.39-19.358-7.39-26.748 0-7.39 7.384-7.39 19.364 0 26.748L479.71 506.458A18.848 18.848 0 0 0 493.084 512c4.843 0 9.679-1.847 13.374-5.542 7.389-7.384 7.389-19.364 0-26.748z"
                    fill={fill || "currentColor"}
                    opacity="1"
                    data-original="#000000"
                ></path>
            </g>
        </svg>
    );
};
const Instagram = ({ fill, size, className }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || 20}
            height={size || 20}
            x="0"
            y="0"
            viewBox="0 0 511 511.9"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="M510.95 150.5c-1.2-27.2-5.598-45.898-11.9-62.102-6.5-17.199-16.5-32.597-29.6-45.398-12.802-13-28.302-23.102-45.302-29.5-16.296-6.3-34.898-10.7-62.097-11.898C334.648.3 325.949 0 256.449 0s-78.199.3-105.5 1.5c-27.199 1.2-45.898 5.602-62.097 11.898-17.204 6.5-32.602 16.5-45.403 29.602-13 12.8-23.097 28.3-29.5 45.3-6.3 16.302-10.699 34.9-11.898 62.098C.75 177.801.449 186.5.449 256s.301 78.2 1.5 105.5c1.2 27.2 5.602 45.898 11.903 62.102 6.5 17.199 16.597 32.597 29.597 45.398 12.801 13 28.301 23.102 45.301 29.5 16.3 6.3 34.898 10.7 62.102 11.898 27.296 1.204 36 1.5 105.5 1.5s78.199-.296 105.5-1.5c27.199-1.199 45.898-5.597 62.097-11.898a130.934 130.934 0 0 0 74.903-74.898c6.296-16.301 10.699-34.903 11.898-62.102 1.2-27.3 1.5-36 1.5-105.5s-.102-78.2-1.3-105.5zm-46.098 209c-1.102 25-5.301 38.5-8.801 47.5-8.602 22.3-26.301 40-48.602 48.602-9 3.5-22.597 7.699-47.5 8.796-27 1.204-35.097 1.5-103.398 1.5s-76.5-.296-103.403-1.5c-25-1.097-38.5-5.296-47.5-8.796C94.551 451.5 84.45 445 76.25 436.5c-8.5-8.3-15-18.3-19.102-29.398-3.5-9-7.699-22.602-8.796-47.5-1.204-27-1.5-35.102-1.5-103.403s.296-76.5 1.5-103.398c1.097-25 5.296-38.5 8.796-47.5C61.25 94.199 67.75 84.1 76.352 75.898c8.296-8.5 18.296-15 29.398-19.097 9-3.5 22.602-7.7 47.5-8.801 27-1.2 35.102-1.5 103.398-1.5 68.403 0 76.5.3 103.403 1.5 25 1.102 38.5 5.3 47.5 8.8 11.097 4.098 21.199 10.598 29.398 19.098 8.5 8.301 15 18.301 19.102 29.403 3.5 9 7.699 22.597 8.8 47.5 1.2 27 1.5 35.097 1.5 103.398s-.3 76.301-1.5 103.301zm0 0"
                    fill={fill || "currentColor"}
                    opacity="1"
                    data-original="#000000"
                ></path>
                <path
                    d="M256.45 124.5c-72.598 0-131.5 58.898-131.5 131.5s58.902 131.5 131.5 131.5c72.6 0 131.5-58.898 131.5-131.5s-58.9-131.5-131.5-131.5zm0 216.8c-47.098 0-85.302-38.198-85.302-85.3s38.204-85.3 85.301-85.3c47.102 0 85.301 38.198 85.301 85.3s-38.2 85.3-85.3 85.3zM423.852 119.3c0 16.954-13.747 30.7-30.704 30.7-16.953 0-30.699-13.746-30.699-30.7 0-16.956 13.746-30.698 30.7-30.698 16.956 0 30.703 13.742 30.703 30.699zm0 0"
                    fill={fill || "currentColor"}
                    opacity="1"
                    data-original="#000000"
                ></path>
            </g>
        </svg>
    );
};
const TikTok = ({ fill, size, className }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || 20}
            height={size || 20}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="M480.32 128.39c-29.22 0-56.18-9.68-77.83-26.01-24.83-18.72-42.67-46.18-48.97-77.83A129.78 129.78 0 0 1 351.04.39h-83.47v228.08l-.1 124.93c0 33.4-21.75 61.72-51.9 71.68a75.905 75.905 0 0 1-28.04 3.72c-12.56-.69-24.33-4.48-34.56-10.6-21.77-13.02-36.53-36.64-36.93-63.66-.63-42.23 33.51-76.66 75.71-76.66 8.33 0 16.33 1.36 23.82 3.83v-84.75c-7.9-1.17-15.94-1.78-24.07-1.78-46.19 0-89.39 19.2-120.27 53.79-23.34 26.14-37.34 59.49-39.5 94.46-2.83 45.94 13.98 89.61 46.58 121.83 4.79 4.73 9.82 9.12 15.08 13.17 27.95 21.51 62.12 33.17 98.11 33.17 8.13 0 16.17-.6 24.07-1.77 33.62-4.98 64.64-20.37 89.12-44.57 30.08-29.73 46.7-69.2 46.88-111.21l-.43-186.56a210.864 210.864 0 0 0 46.88 27.34c26.19 11.05 53.96 16.65 82.54 16.64v-83.1c.02.02-.22.02-.24.02z"
                    fill={fill || "currentColor"}
                    opacity="1"
                    data-original="#000000"
                ></path>
            </g>
        </svg>
    );
};
const Pinterest = ({ fill, size, className }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlSpace="preserve"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || 20}
            height={size || 20}
            x="0"
            y="0"
            viewBox="0 0 512.883 512.883"
            className={className}
        >
            <g>
                <path
                    d="M256.441 0C115.2 0 .441 114.759.441 256c0 105.048 62.676 195.09 153.6 234.814-.883-17.655 0-39.724 4.414-59.145 5.297-21.186 32.662-139.476 32.662-139.476s-7.945-16.772-7.945-40.607c0-37.959 22.069-66.207 49.434-66.207 22.952 0 34.428 17.655 34.428 38.841 0 22.952-15.007 58.262-22.952 90.924-6.179 27.366 13.241 49.434 40.607 49.434 48.552 0 81.214-62.676 81.214-135.945 0-56.497-37.959-97.986-106.814-97.986-77.683 0-126.234 58.262-126.234 122.703 0 22.069 6.179 37.959 16.772 50.317 4.414 5.297 5.297 7.945 3.531 14.124-.883 4.414-4.414 15.89-5.297 20.303-1.766 6.179-7.062 8.828-13.241 6.179-36.193-15.007-52.083-53.848-52.083-97.986 0-72.386 60.91-159.779 182.731-159.779 97.986 0 162.428 70.621 162.428 146.538 0 100.634-55.614 175.669-137.71 175.669-27.366 0-53.848-15.007-62.676-31.779 0 0-15.007 59.145-17.655 70.621-5.297 19.421-15.89 39.724-25.6 54.731 22.952 7.062 47.669 10.593 72.386 10.593 141.241 0 256-114.759 256-256S397.683 0 256.441 0"
                    fill={fill || "currentColor"}
                    data-original="#cb1f24"
                    opacity="1"
                ></path>
            </g>
        </svg>
    );
};

const YoutubeIcon = ({ fill, size, className }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || 20}
            height={size || 20}
            x="0"
            y="0"
            viewBox="0 0 310 310"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="M297.917 64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359 0-61.369 5.776-72.517 19.938C0 79.663 0 100.008 0 128.166v53.669c0 54.551 12.896 82.248 83.386 82.248h143.226c34.216 0 53.176-4.788 65.442-16.527C304.633 235.518 310 215.863 310 181.835v-53.669c0-29.695-.841-50.16-12.083-63.521zm-98.896 97.765-65.038 33.991a9.997 9.997 0 0 1-14.632-8.863v-67.764a10 10 0 0 1 14.609-8.874l65.038 33.772a10 10 0 0 1 .023 17.738z"
                    fill={fill || "currentColor"}
                    opacity="1"
                    data-original={fill || "currentColor"}
                    className=""
                ></path>
            </g>
        </svg>
    );
};

const FacebookIcon = ({ fill, size, className }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || 20}
            height={size || 20}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
        >
            <g>
                <path
                    d="M437 0H75C33.648 0 0 33.648 0 75v362c0 41.352 33.648 75 75 75h151V331h-60v-90h60v-61c0-49.629 40.371-90 90-90h91v90h-91v61h91l-15 90h-76v181h121c41.352 0 75-33.648 75-75V75c0-41.352-33.648-75-75-75zm0 0"
                    fill={fill || `currentColor`}
                    opacity="1"
                    data-original={fill || `currentColor`}
                    className=""
                ></path>
            </g>
        </svg>
    );
};

const ArrowTopRight = ({ fill, size, className }: IconsProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill={fill || "currentColor"}
            width={size || 20}
            height={size || 20}
            className={className}
        >
            <path d="M8 17v-7.586l8.293 8.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-8.293-8.293h7.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-10c-0.552 0-1 0.448-1 1v10c0 0.552 0.448 1 1 1s1-0.448 1-1z"></path>
        </svg>
    );
};

const Filter = ({ fill, size, className, strokeWidth }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || "512"}
            height={size || "512"}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className={className}
            style={{
                strokeWidth: "3px",
            }}
        >
            <g>
                <path
                    d="M16 90.259h243.605c7.342 33.419 37.186 58.508 72.778 58.508s65.436-25.088 72.778-58.508H496c8.836 0 16-7.164 16-16s-7.164-16-16-16h-90.847c-7.356-33.402-37.241-58.507-72.77-58.507-35.548 0-65.419 25.101-72.772 58.507H16c-8.836 0-16 7.164-16 16s7.164 16 16 16zm273.877-15.958.001-.172c.07-23.367 19.137-42.376 42.505-42.376 23.335 0 42.403 18.983 42.504 42.339l.003.235c-.037 23.407-19.091 42.441-42.507 42.441-23.406 0-42.454-19.015-42.507-42.408zM496 421.74h-90.847c-7.357-33.401-37.241-58.507-72.77-58.507-35.548 0-65.419 25.102-72.772 58.507H16c-8.836 0-16 7.163-16 16s7.164 16 16 16h243.605c7.342 33.419 37.186 58.508 72.778 58.508s65.436-25.089 72.778-58.508H496c8.836 0 16-7.163 16-16s-7.164-16-16-16zm-163.617 58.508c-23.406 0-42.454-19.015-42.507-42.408l.001-.058.001-.172c.07-23.367 19.137-42.377 42.505-42.377 23.335 0 42.403 18.983 42.504 42.338l.003.235c-.034 23.41-19.089 42.442-42.507 42.442zM496 240H252.395c-7.342-33.419-37.186-58.507-72.778-58.507S114.181 206.581 106.839 240H16c-8.836 0-16 7.164-16 16 0 8.837 7.164 16 16 16h90.847c7.357 33.401 37.241 58.507 72.77 58.507 35.548 0 65.419-25.102 72.772-58.507H496c8.836 0 16-7.163 16-16 0-8.836-7.164-16-16-16zm-273.877 15.958-.001.172c-.07 23.367-19.137 42.376-42.505 42.376-23.335 0-42.403-18.983-42.504-42.338l-.003-.234c.035-23.41 19.09-42.441 42.507-42.441 23.406 0 42.454 19.014 42.507 42.408z"
                    fill={fill || "currentColor"}
                    opacity="1"
                    data-original={fill || "currentColor"}
                    className={className}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                ></path>
            </g>
        </svg>
    );
};

const EmptyCart = ({ fill, size, className, strokeWidth }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={size || 20}
            height={size || 20}
            x="0"
            y="0"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            className=""
        >
            <g>
                <path
                    fill="#dadcde"
                    d="M280 192a8 8 0 0 1-8-8v-80a56 56 0 0 0-112 0v80a8 8 0 0 1-16 0v-80a72 72 0 0 1 144 0v80a8 8 0 0 1-8 8z"
                    opacity="1"
                    data-original="#dadcde"
                ></path>
                <path
                    fill="#eb423f"
                    d="M296 472H24l16-320h240z"
                    opacity="1"
                    data-original="#eb423f"
                    className=""
                ></path>
                <path
                    fill="#d13330"
                    d="M360 472h-64l-16-320h64z"
                    opacity="1"
                    data-original="#d13330"
                ></path>
                <path
                    fill="#a82a27"
                    d="M328.47 431.99c-.16.01-.32.01-.48.01a8 8 0 0 1-7.98-7.53l-16-272c-.01-.16-.01-.31-.01-.47h16.02l15.97 271.53a8.007 8.007 0 0 1-7.52 8.46z"
                    opacity="1"
                    data-original="#a82a27"
                ></path>
                <path
                    fill="#eba72e"
                    d="M488 472h-64l-1-12.93v-.01L408 264h64l14.75 191.69v.01z"
                    opacity="1"
                    data-original="#eba72e"
                ></path>
                <path
                    fill="#e09f2c"
                    d="M456.8 431.96a7.322 7.322 0 0 1-.81.04 8 8 0 0 1-7.95-7.2l-.29-2.86-15.71-157.14a7.143 7.143 0 0 1-.04-.8h16.04l15.72 157.21.2 1.99a8 8 0 0 1-7.16 8.76z"
                    opacity="1"
                    data-original="#e09f2c"
                ></path>
                <path
                    fill="#e09f2c"
                    d="M488 472h-9.62L456 438.42 433.62 472H424l-1-12.93v-.01l24.75-37.12 1.59-2.38a8.01 8.01 0 0 1 13.32 0l1.1 1.65 22.99 34.48v.01z"
                    opacity="1"
                    data-original="#e09f2c"
                ></path>
                <path
                    fill="#f7b030"
                    d="M424 472H216l16-208h176z"
                    opacity="1"
                    data-original="#f7b030"
                    className=""
                ></path>
                <path
                    fill="#e9eef2"
                    d="M328 416h-16a40.045 40.045 0 0 1-40-40v-64a8 8 0 0 1 16 0v64a24.027 24.027 0 0 0 24 24h16a24.027 24.027 0 0 0 24-24v-64a8 8 0 0 1 16 0v64a40.045 40.045 0 0 1-40 40z"
                    opacity="1"
                    data-original="#e9eef2"
                ></path>
                <path
                    fill="#dadcde"
                    d="M96 184h16v48H96z"
                    opacity="1"
                    data-original="#dadcde"
                ></path>
                <path
                    fill="#e9eef2"
                    d="M104 192a8 8 0 0 1-8-8v-80a72 72 0 0 1 144 0v80a8 8 0 0 1-16 0v-80a56 56 0 0 0-112 0v80a8 8 0 0 1-8 8z"
                    opacity="1"
                    data-original="#e9eef2"
                ></path>
                <path
                    fill="#f7b030"
                    d="M128 296H80v-64l24-16 24 16z"
                    opacity="1"
                    data-original="#f7b030"
                    className=""
                ></path>
            </g>
        </svg>
    );
};

const Visa = ({ fill, size, className, strokeWidth }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 30}
            height={size || 30}
            viewBox="0 0 780 500"
            fill="none"
        >
            <g clip-path="url(#clip0_6278_125851)">
                <path
                    d="M40 0H740C762.092 0 780 17.909 780 40V460C780 482.092 762.092 500 740 500H40C17.909 500 0 482.092 0 460V40C0 17.909 17.909 0 40 0Z"
                    fill="#1434CB"
                />
                <path
                    d="M489.823 143.111C442.988 143.111 401.134 167.393 401.134 212.256C401.134 263.706 475.364 267.259 475.364 293.106C475.364 303.989 462.895 313.731 441.6 313.731C411.377 313.731 388.789 300.119 388.789 300.119L379.123 345.391C379.123 345.391 405.145 356.889 439.692 356.889C490.898 356.889 531.19 331.415 531.19 285.784C531.19 231.419 456.652 227.971 456.652 203.981C456.652 195.455 466.887 186.114 488.122 186.114C512.081 186.114 531.628 196.014 531.628 196.014L541.087 152.289C541.087 152.289 519.818 143.111 489.823 143.111ZM61.3294 146.411L60.1953 153.011C60.1953 153.011 79.8988 156.618 97.645 163.814C120.495 172.064 122.122 176.868 125.971 191.786L167.905 353.486H224.118L310.719 146.411H254.635L198.989 287.202L176.282 167.861C174.199 154.203 163.651 146.411 150.74 146.411H61.3294ZM333.271 146.411L289.275 353.486H342.756L386.598 146.411H333.271ZM631.554 146.411C618.658 146.411 611.825 153.318 606.811 165.386L528.458 353.486H584.542L595.393 322.136H663.72L670.318 353.486H719.805L676.633 146.411H631.554ZM638.848 202.356L655.473 280.061H610.935L638.848 202.356Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_6278_125851">
                    <rect width="780" height="500" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
const MasterCard = ({ fill, size, className, strokeWidth }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 30}
            height={size || 30}
            viewBox="0 0 780 500"
            fill="none"
        >
            <g clip-path="url(#clip0_6278_125843)">
                <path
                    d="M40 0H740C762.092 0 780 17.909 780 40V460C780 482.092 762.092 500 740 500H40C17.909 500 0 482.092 0 460V40C0 17.909 17.909 0 40 0Z"
                    fill="#253747"
                />
                <path
                    d="M211.053 467.045V438.109C211.053 427.041 204.311 419.793 192.736 419.793C186.949 419.793 180.657 421.703 176.33 427.996C172.959 422.715 168.127 419.793 160.879 419.793C156.047 419.793 151.215 421.254 147.395 426.535V420.748H137.281V467.045H147.395V441.481C147.395 433.278 151.721 429.401 158.463 429.401C165.205 429.401 168.577 433.727 168.577 441.481V467.045H178.69V441.481C178.69 433.278 183.522 429.401 189.759 429.401C196.501 429.401 199.872 433.727 199.872 441.481V467.045H211.053ZM361.068 420.748H344.662V406.758H334.549V420.748H325.391V429.906H334.549V451.145C334.549 461.764 338.875 468 350.449 468C354.776 468 359.608 466.539 362.979 464.629L360.057 455.92C357.135 457.831 353.764 458.336 351.348 458.336C346.516 458.336 344.606 455.415 344.606 450.639V429.906H361.012V420.748H361.068ZM446.92 419.737C441.133 419.737 437.256 422.658 434.84 426.479V420.692H424.727V466.989H434.84V440.919C434.84 433.221 438.211 428.839 444.504 428.839C446.414 428.839 448.83 429.345 450.797 429.794L453.718 420.13C451.696 419.737 448.83 419.737 446.92 419.737ZM317.187 424.569C312.356 421.198 305.613 419.737 298.365 419.737C286.791 419.737 279.094 425.524 279.094 434.682C279.094 442.38 284.881 446.762 294.994 448.167L299.826 448.672C305.108 449.628 308.029 451.088 308.029 453.504C308.029 456.875 304.152 459.291 297.41 459.291C290.668 459.291 285.33 456.875 281.959 454.459L277.127 462.157C282.409 466.034 289.657 467.944 296.904 467.944C310.389 467.944 318.143 461.651 318.143 452.999C318.143 444.796 311.85 440.469 302.242 439.008L297.41 438.503C293.084 437.997 289.713 437.042 289.713 434.176C289.713 430.805 293.084 428.895 298.421 428.895C304.209 428.895 309.996 431.311 312.917 432.772L317.187 424.569ZM586.26 419.737C580.473 419.737 576.596 422.658 574.18 426.479V420.692H564.067V466.989H574.18V440.919C574.18 433.221 577.551 428.839 583.844 428.839C585.754 428.839 588.17 429.345 590.137 429.794L593.059 420.242C591.092 419.737 588.227 419.737 586.26 419.737ZM457.033 443.897C457.033 457.887 466.697 468 481.643 468C488.385 468 493.217 466.539 498.049 462.719L493.217 454.516C489.34 457.437 485.519 458.842 481.137 458.842C472.934 458.842 467.147 453.055 467.147 443.897C467.147 435.188 472.934 429.401 481.137 428.951C485.463 428.951 489.34 430.412 493.217 433.278L498.049 425.074C493.217 421.198 488.385 419.793 481.643 419.793C466.697 419.737 457.033 429.906 457.033 443.897ZM550.582 443.897V420.748H540.469V426.535C537.098 422.209 532.266 419.793 525.973 419.793C512.938 419.793 502.825 429.906 502.825 443.897C502.825 457.887 512.938 468 525.973 468C532.715 468 537.547 465.584 540.469 461.258V467.045H550.582V443.897ZM513.444 443.897C513.444 435.693 518.725 428.951 527.434 428.951C535.637 428.951 541.424 435.244 541.424 443.897C541.424 452.1 535.637 458.842 527.434 458.842C518.781 458.336 513.444 452.043 513.444 443.897ZM392.42 419.737C378.935 419.737 369.271 429.401 369.271 443.84C369.271 458.336 378.935 467.944 392.926 467.944C399.668 467.944 406.41 466.034 411.748 461.651L406.916 454.403C403.039 457.325 398.207 459.235 393.431 459.235C387.139 459.235 380.902 456.314 379.441 448.167H413.658C413.658 446.706 413.658 445.751 413.658 444.29C414.108 429.401 405.399 419.737 392.42 419.737ZM392.42 428.446C398.713 428.446 403.039 432.322 403.994 439.514H379.891C380.846 433.278 385.172 428.446 392.42 428.446ZM643.682 443.897V402.432H633.568V426.535C630.197 422.209 625.365 419.793 619.073 419.793C606.037 419.793 595.924 429.906 595.924 443.897C595.924 457.887 606.037 468 619.073 468C625.815 468 630.647 465.584 633.568 461.258V467.045H643.682V443.897ZM606.543 443.897C606.543 435.693 611.825 428.951 620.533 428.951C628.736 428.951 634.524 435.244 634.524 443.897C634.524 452.1 628.736 458.842 620.533 458.842C611.825 458.336 606.543 452.043 606.543 443.897ZM267.969 443.897V420.748H257.855V426.535C254.484 422.209 249.652 419.793 243.36 419.793C230.325 419.793 220.211 429.906 220.211 443.897C220.211 457.887 230.325 468 243.36 468C250.102 468 254.934 465.584 257.855 461.258V467.045H267.969V443.897ZM230.381 443.897C230.381 435.693 235.662 428.951 244.371 428.951C252.574 428.951 258.361 435.244 258.361 443.897C258.361 452.1 252.574 458.842 244.371 458.842C235.662 458.336 230.381 452.043 230.381 443.897Z"
                    fill="white"
                />
                <path
                    d="M465.738 69.1387H313.812V342.088H465.738V69.1387Z"
                    fill="#FF5A00"
                />
                <path
                    d="M323.926 205.613C323.926 150.158 349.996 100.94 390 69.1387C360.559 45.9902 323.42 32 282.91 32C186.945 32 109.297 109.648 109.297 205.613C109.297 301.578 186.945 379.227 282.91 379.227C323.42 379.227 360.559 365.237 390 342.088C349.94 310.737 323.926 261.069 323.926 205.613Z"
                    fill="#EB001B"
                />
                <path
                    d="M670.711 205.613C670.711 301.578 593.062 379.227 497.098 379.227C456.588 379.227 419.449 365.237 390.008 342.088C430.518 310.231 456.082 261.069 456.082 205.613C456.082 150.158 430.012 100.94 390.008 69.1387C419.393 45.9902 456.532 32 497.041 32C593.062 32 670.711 110.154 670.711 205.613Z"
                    fill="#F79E1B"
                />
            </g>
            <defs>
                <clipPath id="clip0_6278_125843">
                    <rect width="780" height="500" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

const Elo = ({ fill, size, className, strokeWidth }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 30}
            height={size || 30}
            enable-background="new 0 0 780 500"
            version="1.1"
            viewBox="0 0 780 500"
            xmlSpace="preserve"
        >
            <path d="M41.68,0h698.14c23.027,0,41.68,18.983,41.68,42.42v414.66c0,23.437-18.652,42.42-41.68,42.42H41.68    C18.652,499.5,0,480.517,0,457.08V42.42C0,18.983,18.652,0,41.68,0z" />
            <path
                d="m167.25 181.4c6.8-2.3 14.1-3.5 21.7-3.5 33.2 0 60.9 23.601 67.2 54.9l47-9.6c-10.8-53.2-57.8-93.301-114.2-93.301-12.9 0-25.3 2.101-36.9 6l15.2 45.501z"
                fill="#FFF100"
            />
            <path
                d="m111.75 333.8l31.8-36c-14.2-12.6-23.1-30.9-23.1-51.4 0-20.399 8.9-38.8 23.1-51.3l-31.8-35.899c-24.1 21.399-39.3 52.5-39.3 87.3 0 34.699 15.2 65.898 39.3 87.299z"
                fill="#00A3DF"
            />
            <path
                d="m256.15 260.2c-6.4 31.3-34 54.8-67.2 54.8-7.6 0-14.9-1.2-21.8-3.5l-15.2 45.5c11.6 3.899 24.1 6 37 6 56.4 0 103.4-40 114.2-93.2l-47-9.6z"
                fill="#EE4023"
            />
            <path
                d="m459.75 292.4c-7.8 7.601-18.3 12.2-29.9 12-8-0.1-15.399-2.5-21.6-6.5l-15.601 24.801c10.7 6.699 23.2 10.699 36.801 10.899 19.699 0.3 37.699-7.5 50.8-20.2l-20.5-21zm-28.2-101.1c-39.2-0.6-71.6 30.8-72.2 70-0.2 14.7 4 28.5 11.5 39.9l128.8-55.101c-7.2-30.899-34.8-54.2-68.1-54.799m-42.7 75.599c-0.2-1.6-0.3-3.3-0.3-5 0.4-23.1 19.4-41.6 42.5-41.199 12.6 0.199 23.8 5.899 31.3 14.899l-73.5 31.3zm151.3-107.6v137.3l23.801 9.9-11.301 27.1-23.6-9.8c-5.3-2.3-8.9-5.8-11.6-9.8-2.601-4-4.601-9.601-4.601-17v-137.7h27.301zm85.901 63.5c4.2-1.4 8.6-2.1 13.3-2.1 20.3 0 37.101 14.399 41 33.5l28.7-5.9c-6.6-32.5-35.3-56.9-69.7-56.9-7.899 0-15.5 1.301-22.5 3.601l9.2 27.799zm-33.901 92.9l19.4-21.9c-8.7-7.7-14.1-18.9-14.1-31.4s5.5-23.699 14.1-31.3l-19.4-21.899c-14.699 13-24 32.1-24 53.3s9.301 40.199 24 53.199zm88.201-44.801c-3.899 19.101-20.8 33.5-41 33.5-4.6 0-9.1-0.8-13.3-2.199l-9.3 27.8c7.1 2.399 14.7 3.7 22.6 3.7 34.4 0 63.101-24.4 69.7-56.9l-28.7-5.901z"
                fill="#fff"
            />
        </svg>
    );
};
const Dinners = ({ fill, size, className, strokeWidth }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 30}
            height={size || 30}
            enable-background="new 0 0 780 500"
            version="1.1"
            viewBox="0 0 780 500"
            xmlSpace="preserve"
        >
            <path
                d="M40,0h700c22.092,0,40,17.909,40,40v420c0,22.092-17.908,40-40,40H40c-22.091,0-40-17.908-40-40V40   C0,17.909,17.909,0,40,0z"
                fill="#0079BE"
            />
            <path
                d="m599.93 251.45c0-99.415-82.98-168.13-173.9-168.1h-78.242c-92.003-0.033-167.73 68.705-167.73 168.1 0 90.93 75.727 165.64 167.73 165.2h78.242c90.914 0.436 173.9-74.294 173.9-165.2z"
                fill="#fff"
            />
            <path
                d="m348.28 97.43c-84.07 0.027-152.19 68.308-152.21 152.58 0.02 84.258 68.144 152.53 152.21 152.56 84.09-0.027 152.23-68.303 152.24-152.56-0.011-84.272-68.149-152.55-152.24-152.58z"
                fill="#0079BE"
            />
            <path
                d="m252.07 249.6c0.08-41.181 25.746-76.297 61.94-90.25v180.48c-36.194-13.948-61.861-49.045-61.94-90.23zm131 90.274v-180.53c36.207 13.92 61.914 49.057 61.979 90.257-0.065 41.212-25.772 76.322-61.979 90.269z"
                fill="#fff"
            />
        </svg>
    );
};

const Amex = ({ fill, size, className, strokeWidth }: IconsProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 30}
            height={size || 30}
            enable-background="new 0 0 780 500"
            version="1.1"
            viewBox="0 0 780 500"
            xmlSpace="preserve"
        >
            <path
                d="m40 1e-3h700c22.092 0 40 17.909 40 40v420c0 22.092-17.908 40-40 40h-700c-22.091 0-40-17.908-40-40v-420c0-22.091 17.909-40 40-40z"
                fill="#2557D6"
            />
            <path
                d="m0.253 235.69h37.441l8.442-19.51h18.9l8.42 19.51h73.668v-14.915l6.576 14.98h38.243l6.576-15.202v15.138h183.08l-0.085-32.026h3.542c2.479 0.083 3.204 0.302 3.204 4.226v27.8h94.689v-7.455c7.639 3.92 19.518 7.455 35.148 7.455h39.836l8.525-19.51h18.9l8.337 19.51h76.765v-18.532l11.626 18.532h61.515v-122.51h-60.88v14.468l-8.522-14.468h-62.471v14.468l-7.828-14.468h-84.38c-14.123 0-26.539 1.889-36.569 7.153v-7.153h-58.229v7.153c-6.383-5.426-15.079-7.153-24.75-7.153h-212.74l-14.274 31.641-14.659-31.641h-67.005v14.468l-7.362-14.468h-57.145l-26.539 58.246v64.261h3e-3zm236.34-17.67h-22.464l-0.083-68.794-31.775 68.793h-19.24l-31.858-68.854v68.854h-44.57l-8.42-19.592h-45.627l-8.505 19.592h-23.801l39.241-87.837h32.559l37.269 83.164v-83.164h35.766l28.678 59.587 26.344-59.587h36.485l1e-3 87.838zm-165.9-37.823l-14.998-35.017-14.915 35.017h29.913zm255.3 37.821h-73.203v-87.837h73.203v18.291h-51.289v15.833h50.06v18.005h-50.061v17.542h51.289l1e-3 18.166zm103.16-64.18c0 14.004-9.755 21.24-15.439 23.412 4.794 1.748 8.891 4.838 10.84 7.397 3.094 4.369 3.628 8.271 3.628 16.116v17.255h-22.104l-0.083-11.077c0-5.285 0.528-12.886-3.458-17.112-3.202-3.09-8.083-3.76-15.973-3.76h-23.523v31.95h-21.914v-87.838h50.401c11.199 0 19.451 0.283 26.535 4.207 6.933 3.924 11.09 9.652 11.09 19.45zm-27.699 13.042c-3.013 1.752-6.573 1.81-10.841 1.81h-26.62v-19.51h26.982c3.818 0 7.804 0.164 10.393 1.584 2.842 1.28 4.601 4.003 4.601 7.765 0 3.84-1.674 6.929-4.515 8.351zm62.844 51.138h-22.358v-87.837h22.358v87.837zm259.56 0h-31.053l-41.535-65.927v65.927h-44.628l-8.527-19.592h-45.521l-8.271 19.592h-25.648c-10.649 0-24.138-2.257-31.773-9.715-7.701-7.458-11.708-17.56-11.708-33.533 0-13.027 2.395-24.936 11.812-34.347 7.085-7.01 18.18-10.242 33.28-10.242h21.215v18.821h-20.771c-7.997 0-12.514 1.14-16.862 5.203-3.735 3.699-6.298 10.69-6.298 19.897 0 9.41 1.951 16.196 6.023 20.628 3.373 3.476 9.506 4.53 15.272 4.53h9.842l30.884-69.076h32.835l37.102 83.081v-83.08h33.366l38.519 61.174v-61.174h22.445v87.833zm-133.2-37.82l-15.165-35.017-15.081 35.017h30.246zm189.04 178.08c-5.322 7.457-15.694 11.238-29.736 11.238h-42.319v-18.84h42.147c4.181 0 7.106-0.527 8.868-2.175 1.665-1.474 2.605-3.554 2.591-5.729 0-2.561-1.064-4.593-2.677-5.811-1.59-1.342-3.904-1.95-7.722-1.95-20.574-0.67-46.244 0.608-46.244-27.194 0-12.742 8.443-26.156 31.439-26.156h43.649v-17.479h-40.557c-12.237 0-21.129 2.81-27.425 7.174v-7.175h-59.985c-9.595 0-20.854 2.279-26.179 7.175v-7.175h-107.12v7.175c-8.524-5.892-22.908-7.175-29.549-7.175h-70.656v7.175c-6.745-6.258-21.742-7.175-30.886-7.175h-79.077l-18.094 18.764-16.949-18.764h-118.13v122.59h115.9l18.646-19.062 17.565 19.062 71.442 0.061v-28.838h7.021c9.479 0.14 20.66-0.228 30.523-4.312v33.085h58.928v-31.952h2.842c3.628 0 3.985 0.144 3.985 3.615v28.333h179.01c11.364 0 23.244-2.786 29.824-7.845v7.845h56.78c11.815 0 23.354-1.587 32.134-5.649l2e-3 -22.84zm-354.94-47.155c0 24.406-19.005 29.445-38.159 29.445h-27.343v29.469h-42.591l-26.984-29.086-28.042 29.086h-86.802v-87.859h88.135l26.961 28.799 27.875-28.799h70.021c17.389 0 36.929 4.613 36.929 28.945zm-174.22 40.434h-53.878v-17.48h48.11v-17.926h-48.11v-15.974h54.939l23.969 25.604-25.03 25.776zm86.81 10.06l-33.644-35.789 33.644-34.65v70.439zm49.757-39.066h-28.318v-22.374h28.572c7.912 0 13.404 3.09 13.404 10.772 0 7.599-5.238 11.602-13.658 11.602zm148.36-40.373h73.138v18.17h-51.315v15.973h50.062v17.926h-50.062v17.48l51.314 0.08v18.23h-73.139l2e-3 -87.859zm-28.119 47.029c4.878 1.725 8.865 4.816 10.734 7.375 3.095 4.291 3.542 8.294 3.631 16.037v17.418h-22.002v-10.992c0-5.286 0.531-13.112-3.542-17.198-3.201-3.147-8.083-3.899-16.076-3.899h-23.42v32.09h-22.02v-87.859h50.594c11.093 0 19.173 0.47 26.366 4.146 6.915 4.004 11.266 9.487 11.266 19.511-1e-3 14.022-9.764 21.178-15.531 23.371zm-12.385-11.107c-2.932 1.667-6.556 1.811-10.818 1.811h-26.622v-19.732h26.982c3.902 0 7.807 0.08 10.458 1.587 2.84 1.423 4.538 4.146 4.538 7.903 0 3.758-1.699 6.786-4.538 8.431zm197.82 5.597c4.27 4.229 6.554 9.571 6.554 18.613 0 18.9-12.322 27.723-34.425 27.723h-42.68v-18.84h42.51c4.157 0 7.104-0.525 8.95-2.175 1.508-1.358 2.589-3.333 2.589-5.729 0-2.561-1.17-4.592-2.675-5.811-1.675-1.34-3.986-1.949-7.803-1.949-20.493-0.67-46.157 0.609-46.157-27.192 0-12.744 8.355-26.158 31.33-26.158h43.932v18.7h-40.198c-3.984 0-6.575 0.145-8.779 1.587-2.4 1.422-3.29 3.534-3.29 6.319 0 3.314 2.037 5.57 4.795 6.546 2.311 0.77 4.795 0.995 8.526 0.995l11.797 0.306c11.895 0.276 20.061 2.248 25.024 7.065zm86.955-23.52h-39.938c-3.986 0-6.638 0.144-8.867 1.587-2.312 1.423-3.202 3.534-3.202 6.322 0 3.314 1.951 5.568 4.791 6.544 2.312 0.771 4.795 0.996 8.444 0.996l11.878 0.304c11.983 0.284 19.982 2.258 24.86 7.072 0.891 0.67 1.422 1.422 2.033 2.175v-25h1e-3z"
                fill="#fff"
            />
        </svg>
    );
};

export {
    Amex,
    Dinners,
    Elo,
    Visa,
    Pinterest,
    TikTok,
    Instagram,
    SearchIcon,
    YoutubeIcon,
    FacebookIcon,
    ArrowTopRight,
    Filter,
    EmptyCart,
    MasterCard,
};
