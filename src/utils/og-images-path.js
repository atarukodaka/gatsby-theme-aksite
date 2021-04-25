const ogImagesDir = 'og-pages'

exports.ogImagesDir = `og-pages`
exports.ogImagePath = ( id ) => {
    return `/${ogImagesDir}/${id}/cover.png`
}

exports.ogSiteImagePath = () => {
    //console.log("og pages dir", config.getConfig())
    return `/${ogImagesDir}/site/cover.png`
}