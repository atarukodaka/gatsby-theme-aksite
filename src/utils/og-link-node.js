const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { createContentDigest } = require(`gatsby-core-utils`)
// const { getOgp } = require(`./getOgp`)

const axios = require('axios')
const cheerio = require('cheerio');

const getOgp = async (ogUrl) => {
    const data = {
        url: ogUrl,
        //domain: url.parse(ogUrl).hostname,
        domain: new URL(ogUrl).hostname,
        title: '',
        description: '',
        imageUrl: '',
    }

    try {
        const res = await axios.get(ogUrl)
        //console.log("getOgp", res.data)
        const $ = cheerio.load(res.data)
        // url
        if ($("meta[property='og:url']").attr('content'))
            data.url = $("meta[property='og:url']").attr('content')
        else if (res.request.res.responseUrl) {
            data.url = res.request.res.responseUrl
        }
        // title
        if ($("meta[property='og:title']").attr('content}'))
            data.title = $("meta[property='og:title']").attr('content}')
        else if ($('title').text()) {
            data.title = $('title').text()
        }
        // description
        if ($("meta[property='og:description']").attr('content'))
            data.description = $("meta[property='og:description']").attr('content')
        else if ($("meta[name='description']").attr('content')) {
            data.description = $("meta[name='description']").attr('content')
        }
        // image
        if ($("meta[property='og:image']").attr('content'))
            data.imageUrl = $("meta[property='og:image']").attr('content')
        else if ($("meta[name='image']").attr('content')) {
            data.imageUrl = $("meta[name='image']").attr('content')
        }
    } catch (error) {
        console.log('error: ', ogUrl, error.response?.status, error.response?.statusText, error.message)
    }
    return data
}
////////////////////////////////////////////////////////////////
exports.createOgLinkNode = async ({ node, actions, createNodeId, cache }) => {

    const data = await getOgp(node.url)
    const { createNode } = actions
    createNode({
        ...data,
        id: createNodeId(`gatsby-plugin-aks-og-link-${node.url}`),
        parent: node.id,
        cache,
        internal: {
            type: `AksOgLink`,
            contentDigest: createContentDigest(data),
            content: JSON.stringify(data),
        }
    })
}

exports.createOgImageFileNode = async ({ node, actions, createNodeId, cache }) => {
    const { createNode } = actions
    try {
        const imageNode = await createRemoteFileNode({
            url: node.imageUrl,
            parentNodeId: node.id,
            cache, createNode, createNodeId
        })

        if (imageNode) {
            node.image = imageNode.id
        }
    } catch (error) {
        console.log(error)
    }

}
