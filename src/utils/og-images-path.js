const ogImagesDir = 'og-pages'

const ogImagePath = ( id ) => {
    return `/${ogImagesDir}/${id}`
}

const ogImageFile = (id) => {
    return `${ogImagePath(id)}/cover.png`
}
const ogSiteImagePath = () => {
    //console.log("og pages dir", config.getConfig())
    return `/${ogImagesDir}/site`
}

const ogSiteImageFile = () => {
    return `/${ogSiteImagePath()}/cover.png`
}

exports.ogImagesDir = ogImagesDir
exports.ogImageFile = ogImageFile
exports.ogImagePath = ogImagePath
exports.ogSiteImageFile = ogSiteImageFile
exports.ogSiteImagePath = ogSiteImagePath