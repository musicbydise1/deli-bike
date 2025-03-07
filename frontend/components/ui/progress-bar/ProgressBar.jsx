import React from "react";

const ProgressBar = ({ totalBars = 7, activeIndex = 3 }) => {
    // Подстраховка, чтобы totalBars не был меньше 1
    const safeTotal = Math.max(1, totalBars);

    return (
        // Контейнер занимает всю доступную ширину, а gap-1 даёт промежутки между делениями
        <div className="flex w-full gap-1">
            {Array.from({ length: safeTotal }).map((_, index) => (
                <div
                    key={index}
                    // flex-1 распределяет всю доступную ширину поровну между делениями
                    className={`flex-1 h-8 rounded-md ${
                        index < activeIndex ? "bg-gray-300" : "bg-orange-500"
                    }`}
                />
            ))}
        </div>
    );
};

export default ProgressBar;