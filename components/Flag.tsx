interface FlagProps {
    text: string;
}

export function Flag({ text }: FlagProps) {
    return (
        <>
            <div className="self-start px-2 py-1 bg-red-600 text-white text-xs uppercase rounded-full">
                {text}
            </div>
        </>
    );
}
