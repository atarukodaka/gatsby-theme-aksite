module.exports = (themeOptions) => {
    const basePath = themeOptions.basePath || '/'
    const contentPath = themeOptions.contentPath || `content/posts`
    const assetPath = themeOptions.assetPath || `content/assets`
    const itemsPerPage = themeOptions.itemsPerPage || 10
    const directoryLabels = themeOptions.directoryLabels

    return { basePath, contentPath, assetPath, itemsPerPage, directoryLabels }
}
