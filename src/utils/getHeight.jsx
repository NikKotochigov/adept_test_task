export const getTopHeight = (rowHeight, start) => {
    return rowHeight * start;
}

export const getBottomHeight = (rowHeight, arr, start, visibleRows) => {
    return rowHeight * (arr.length - (start + visibleRows));
}