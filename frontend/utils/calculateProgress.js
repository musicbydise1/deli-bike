// utils/calculateProgress.js
export function calculateProgress(startDate, endDate) {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Защита от некорректных дат
    if (isNaN(start) || isNaN(end) || start >= end) {
        return { percent: 0, daysLeft: 0 };
    }

    const totalTime = end - start;
    const elapsedTime = now - start;
    let percent = (elapsedTime / totalTime) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    const daysLeftMs = end - now;
    const daysLeft = daysLeftMs > 0 ? Math.ceil(daysLeftMs / (1000 * 60 * 60 * 24)) : 0;

    return { percent, daysLeft };
}