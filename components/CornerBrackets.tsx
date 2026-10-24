export function CornerBrackets({
    size = "w-[18px] h-[18px]",
    active = false,
}: {
    size?: string;
    active?: boolean;
}) {
    const base = `pointer-events-none absolute z-10 border-white transition-all duration-300 ${size}`;
    const state = active
        ? "opacity-100"
        : "opacity-0 group-hover:opacity-100";

    return (
        <>
            <div
                className={`${base} ${state} border-t border-l ${active ? "top-0 left-0" : "top-6 left-6 group-hover:top-4 group-hover:left-4"
                    }`}
            />
            <div
                className={`${base} ${state} border-b border-l ${active ? "bottom-0 left-0" : "bottom-6 left-6 group-hover:bottom-4 group-hover:left-4"
                    }`}
            />
            <div
                className={`${base} ${state} border-t border-r ${active ? "top-0 right-0" : "top-6 right-6 group-hover:top-4 group-hover:right-4"
                    }`}
            />
            <div
                className={`${base} ${state} border-b border-r ${active ? "bottom-0 right-0" : "bottom-6 right-6 group-hover:bottom-4 group-hover:right-4"
                    }`}
            />
        </>
    );
}