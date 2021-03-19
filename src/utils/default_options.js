module.exports = (themeOptions) => {
    const contentPath = themeOptions.contentPath || `content/posts`
    const assetPath = themeOptions.assetPath || `content/assets`
    const itemsPerPage = themeOptions.itemsPerPage || 10
    const directoryLabels = themeOptions.directoryLabels

    return { contentPath, assetPath, itemsPerPage, directoryLabels }
}
