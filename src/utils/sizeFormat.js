export default size => {
    if(size > 1014 ** 3) {
        return (size / (1024 ** 3)).toFixed(1) + 'Gb'
    }

    if(size > 1014 ** 2) {
        return (size / (1024 ** 2)).toFixed(1) + 'Mb'
    }

    if(size > 1014) {
        return (size / 1024).toFixed(1) + 'Kb'
    }

    return size + 'B'
}