const ogImagesDir = 'og-pages'

const ogImagePath = ( id ) => {
    return `/${ogImagesDir}/${id}`
}

exports.ogImageFile = (id) => {
    return `${ogImagePath()}/cover.png`
}
const ogSiteImagePath = () => {
    //console.log("og pages dir", config.getConfig())
    return `/${ogImagesDir}/site`
}

exports.ogSiteImageFile = () => {
    return `/${ogSiteImagePath()}/cover.png`
}