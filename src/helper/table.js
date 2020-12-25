

export const calcBreakPoint = (lastTd) => {
    const cellWith = lastTd.parentNode.offsetWidth;
    const cellMinWith = lastTd.offsetWidth;
    // console.log(cellWith, cellMinWith);

    const breaKpoint = Math.round((cellMinWith / cellWith) * 100);
    return breaKpoint;
}