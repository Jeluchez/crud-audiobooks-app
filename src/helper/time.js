export const timeToMiliseconds = (time) => {
    const oneMs = 1000;
    const [hh, mm, ss] = time.split(':');
    const ms = parseFloat((hh * 3600 * oneMs) + (mm * 60 * oneMs ) + ss * oneMs);
    return ms;
}
export const milisecondsToTime = (ms) => {
    const hh = Math.floor(ms / 3600000);
    const mm = Math.floor((ms - (hh * 3600000)) / 60000);
    const ss = parseInt((ms - (hh * 3600000) - (mm * 60000)) / 1000);
    const time = `${hh}:${mm}:${ss}`;

    return time;
}