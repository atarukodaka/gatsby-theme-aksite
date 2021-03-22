module.exports = (themeOptions) => {
    const basePath = themeOptions.basePath || '/'
    const contentPath = themeOptions.contentPath || `content/posts`
    const assetPath = themeOptions.assetPath || `content/assets`
    const listPath = themeOptions.listPath || `list`
    const itemsPerPage = themeOptions.itemsPerPage || 10
    const directoryLabels = themeOptions.directoryLabels || []
    const defaultLang = themeOptions.defaultLang || 'en'

    return { basePath, contentPath, assetPath, listPath, itemsPerPage, directoryLabels, 
        defaultLang }
}
