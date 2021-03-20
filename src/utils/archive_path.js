
exports.monthlyArchivePath = (year, month)=> {
    return `/archives/${year}${month.toString().padStart(2,0)}`
}

/*
exports.directoryArchivePath = (directory) => {
    return `/${directory}`
}
*/
exports.tagArchivePath = (tag) => {
    return `/tag/${tag}`
}

exports.listArchivePath = () => {
    return '/list'
}
