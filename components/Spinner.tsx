interface SpinnerProps {
    size?: "md" | "sm" | "lg" | "xl" | "xs";
    fill?: string;
}

export function Spinner({ size = "md", fill = "#FFFFFF" }: SpinnerProps) {
    let spinnerSize;
    let strokeWidth;

    switch (size) {
        case "xs":
            spinnerSize = 20;
            strokeWidth = 1;
            break;
        case "sm":
            spinnerSize = 25;
            strokeWidth = 5;
            break;
        case "md":
            spinnerSize = 35;
            strokeWidth = 8;
            break;
        case "lg":
            spinnerSize = 45;
            strokeWidth = 10;
            break;
        case "xl":
            spinnerSize = 50;
            strokeWidth = 12;
            break;

        default:
            break;
    }

    return (
        <div
            className="custom-loader"
            style={{
                width: spinnerSize,
                height: spinnerSize,
                borderRadius: "50%",
                background: `conic-gradient(#0000 10%,${fill})`,
                mask: `radial-gradient(farthest-side,#0000 calc(100% - ${strokeWidth}px),#000 0)`,
                animation: "s3 1s infinite linear",
            }}
        ></div>
    );
}
