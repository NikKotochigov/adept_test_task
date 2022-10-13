const getNextId = (arr) => {
    return arr.reduce((max, current) => {
        return current.id >= max ? current.id + 1 : max;
    }, 0);
}

export default getNextId;