const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { paginate } = require('gatsby-awesome-pagination');
const { urlResolve, createContentDigest } = require(`gatsby-core-utils`)
const axios = require('axios')
const cheerio = require('cheerio');

const withDefaults = require('./src/utils/default_options')
const templateDir = "./src/templates"

exports.onPreBootstrap = ({ store }, themeOptions) => {
    const { contentPath, assetPath } = withDefaults(themeOptions)
    const { program } = store.getState()

    const dirs = [path.join(program.directory, contentPath),
    path.join(program.directory, assetPath)]

    dirs.forEach((dir) => {
        if (!fs.existsSync(dir)) {
            console.log(`Initializing ${dir} directory`)
            mkdirp.sync(dir)
        }
    })
}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
    console.log("create Scheme customization")
    createTypes(`
        type Mdx implements Node {
            frontmatter: MdxFrontmatter
        }
        type MdxFrontmatter {
            date: Date @dateformat
            description: String
            cover: File @fileByRelativePath
            series: Series
            draft: Boolean
            tags: [String]
        }
       
        type Series {
            title: String
            number: Int
        }
        type AksDirectory implements Node {
            name: String
            label: String
            fullLabel: String
            pagePath: String
            numberOfPosts: Int
        }    
        type AksMonthly implements Node {
            year: Int
            month: Int
            yearMonth: String
            pagePath: String
            numberOfPosts: Int
            
        }
        type AksConfig implements Node {
            basePath: String!
            contentPath: String!
            assetPath: String!
            listPath: String!
            itemsPerPage: Int!
        }
        type AksRichLink implements Node {
            url: String!
            title: String!
            description: String!
            image: String!
        }
        type File implements Node {
            fields: FileFields
        }
        type FileFields {
            link: String!
            ogpImage: Boolean!
        }
    `);
};

exports.sourceNodes = ({ actions: { createNode } }, themeOptions) => {
    const options = withDefaults(themeOptions)

    const aksConfig = {
        basePath: options.basePath,
        assetPath: options.assetPath,
        contentPath: options.contentPath,
        listPath: urlResolve(options.basePath, options.listPath),
        itemsPerPage: options.itemsPerPage
    }
    createNode({
        ...aksConfig,
        id: 'gatsby-theme-aksite-config',
        parent: null,
        internal: {
            type: `aksConfig`,
            contentDigest: createContentDigest(aksConfig),
            content: JSON.stringify(aksConfig),
            description: `Aks Config`,
        },
    })
}

const getDirectoryLabel = (directory, labels = []) => {
    const last = directory.split('/').pop()
    const item = labels.find(v => directory === v.directory)
    return item?.label || last
    //return (item) ? item.label : "LAST"
    //return (labels) ? labels['/' + directory] || last : last
}
const getDirectoryFullLabel = (directory, labels = []) => {
    let i = 0

    const parts = directory.split('/')
    return parts.map(part => {
        i = i + 1
        //return labels[`/${parts.slice(0, i).join('/')}`] || v
        return labels.find(v => v.directory === `${parts.slice(0, i).join('/')}`)?.label || part
    }).join('/')
}


exports.onCreateNode = async ({ node, getNode, actions, createNodeId, cache }, themeOptions) => {
    const { createNodeField } = actions
    const options = withDefaults(themeOptions)
    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode })
        const directory = slug.split("/").slice(1, -2).join("/")
        const path = urlResolve(options.basePath, slug)

        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
        createNodeField({
            node,
            name: 'path',
            value: path
        })
        createNodeField({
            node,
            name: 'directory',
            value: directory
        })
        const postTitle = (node.frontmatter.series) ?
            `${node.frontmatter.series.title}[${node.frontmatter.series.number}] ${node.frontmatter.title}` :
            node.frontmatter.title

        createNodeField({
            node,
            name: 'postTitle',
            value: postTitle
        })
        /////
        if (node.frontmatter.links) {
            node.frontmatter.links.forEach(async link => {
                console.log("formmatter links", link)
                const data = await getOgp(link)
                const imageNode = await createRemoteFileNode({
                    url: data.image,
                    cache: cache,
                    createNode: actions.createNode,
                    createNodeId: createNodeId,
                    //name: 'OgpImage',
                    parentNodeId: node.id,
                    //sourceInstanceName: "ogpImage"
                })
                await actions.createNodeField({
                    node: imageNode,
                    name: 'ogpImage',
                    value: true
                })
                await actions.createNodeField({
                    node: imageNode,
                    name: 'link',
                    value: link
                })
            })
        }
    } else if (node.internal.type === 'LinksYaml') {
        const data = await getOgp(node.url)
        createNodeField({
            node,
            name: 'url',
            value: node.url
        })
        createNodeField({
            node,
            name: 'title',
            value: data.title || '(NO TITLE)'
        })
        createNodeField({
            node,
            name: 'description',
            value: data.description || '(NO DESCRIPTION)'
        })
        createNodeField({
            node,
            name: 'image',
            value: data.image
        })
        // create remote node
        if (false && data.image) {
            console.log("remote image", data.image, createNodeId)
            const imageNode = await createRemoteFileNode({
                url: data.image,
                cache: cache,
                createNode: actions.createNode,
                createNodeId: createNodeId,
                //name: 'OgpImage',
                parentNodeId: node.id,
                //sourceInstanceName: "ogpImage"
            })
            await actions.createNodeField({
                node: imageNode,
                name: 'ogpImage',
                value: "true"
            })
            await actions.createNodeField({
                node: imageNode,
                name: 'link',
                value: node.url
            })

        }
    }
}
////////////////////////////////////////////////////////////////
// markdown pages
const createMdxPages = async ({ nodes, actions }, options) => {
    console.log("** all markdown pages")
    const { createPage, createNode } = actions
    const template = `${templateDir}/post-template.js`

    nodes.forEach(node => {

        //console.log("fields", node.fields)
        createPage({
            path: node.fields.path,
            component: require.resolve(template),
            context: {
                slug: node.fields.slug,
            },
        })
    })
}
////////////////
// top page
const createTopPage = ({ nodes, actions }, options) => {
    const node = (nodes) ? nodes[0] : null
    if (node == null) { return }

    console.log("** top page", node.fields.slug, node.frontmatter.draft)
    const { createPage } = actions
    createPage({
        path: options.basePath,
        component: require.resolve(`${templateDir}/post-template.js`),
        context: {
            slug: node.fields.slug,
            isRoot: true,
        }
    })
}
////////////////
// list archives
const createListArchives = ({ nodes, actions }, options) => {
    console.log("** list archives")
    const { createPage } = actions
    const template = `${templateDir}/list_archive-template.js`
    const pagePath = urlResolve(options.basePath, options.listPath)
    paginate({
        createPage,
        items: nodes,
        itemsPerPage: options.itemsPerPage,
        //pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
        pathPrefix: pagePath,
        component: require.resolve(template),
        context: {
            pagePath: pagePath
        }
    })
}
////////////////
// directory archvies
const createDirectoryArchives = ({ nodes, actions }, options) => {
    console.log("** creating directory index")
    const { createPage, createNode } = actions
    const directories = [...new Set(nodes.map(node => node.fields.directory))]
    directories.filter(v => !!v).forEach(directory => {
        const re = new RegExp(`^${directory}`)
        const items = nodes.filter(node => re.test(node.fields.directory))
        const template = `${templateDir}/directory_archive-template.js`
        //        const pagePath = directoryArchivePath(directory)
        const pagePath = urlResolve(options.basePath, directory)

        paginate({
            createPage,
            items: items,
            itemsPerPage: options.itemsPerPage,
            //pathPrefix: `/${directory}`,
            pathPrefix: pagePath,
            component: require.resolve(template),
            context: {
                archive: 'directory',
                directory: directory,
                regex: re.toString(),
            }
        })

        const item = {
            name: directory,
            label: getDirectoryLabel(directory, options.directoryLabels),
            fullLabel: getDirectoryFullLabel(directory, options.directoryLabels),
            pagePath: pagePath,
            numberOfPosts: items.length
        }
        createNode({
            id: `gatsby-theme-aksite-directory-${directory}`,
            parent: null,
            children: [],
            ...item,
            internal: {
                type: `AksDirectory`,
                contentDigest: createContentDigest(item),
                content: JSON.stringify(item),
            },
        })
    })
}

////////////////
// tag archvies
/*
const createTagArchives = ({ nodes, actions, tags }, options) => {
    console.log("** creating tag archive")
    const { createPage } = actions
    //console.log("tags", tags)
    tags.group.forEach(node => {
        const tag = node.tag
        const items = nodes.filter(node => node.frontmatter.tags?.includes(tag))
        const template = `${templateDir}/tag_archive-template.js`
        const pagePath = `/${tag}`
        paginate({
            createPage,
            items: items,
            itemsPerPage: options.itemsPerPage,
            pathPrefix: tagArchivePath(tag),
            component: require.resolve(template),
            context: {
                archive: 'tag',
                tag: tag,
                pagePath: pagePath
            }
        })
    })
}
*/
////////////////
// monthly archive
const createMonthlyArchives = ({ nodes, actions }, options) => {
    console.log("** creating monthly archives")
    const { createPage, createNode } = actions
    const yearMonths = new Set(nodes.filter(v => v.frontmatter.yearmonth).map(node => node.frontmatter.yearmonth))
    //console.log("yearmonths: ", yearMonths)  
    yearMonths.forEach(yearMonth => {
        const [year, month] = yearMonth.split('-').map(v => parseInt(v))
        const fromDate = new Date(year, month - 1, 1)
        const nextMonth = new Date(year, month, 1)
        const toDate = new Date(nextMonth.getTime() - 1)
        const items = nodes.filter(v => {
            const dt = new Date(v.frontmatter.date); return fromDate <= dt && dt < toDate
        })

        const pagePath = urlResolve(options.basePath, `archives/${year}${month.toString().padStart(2, 0)}`)

        paginate({
            createPage,
            items: items,
            itemsPerPage: options.itemsPerPage,
            pathPrefix: pagePath,
            component: require.resolve(`${templateDir}/monthly_archive-template.js`),
            context: {
                archive: 'monthly',
                year: year,
                month: month,
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString(),
            }
        })

        const item = {
            year: year, month: month, yearMonth: yearMonth,
            pagePath: pagePath,
            numberOfPosts: items.length
        }
        createNode({
            id: `gatsby-theme-aksite-monthly-${item.yearMonth}`,
            parent: null,
            children: [],
            ...item,
            internal: {
                type: `AksMonthly`,
                contentDigest: createContentDigest(item),
                content: JSON.stringify(item),
            },
        })
    })
}

////////////////
exports.createPages = async ({ graphql, actions }, themeOptions) => {
    const { data: { mdxPages } } = await graphql(`
    {
        mdxPages: allMdx (filter: {frontmatter: {draft: {ne: true} } },
            sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
                id
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
                    yearmonth: date(formatString: "YYYY-MM")
                    series { title, number }
                }
                fields {
                    slug, directory, path
                }
            }            
        }

    }`)

    // create pages
    const options = withDefaults(themeOptions)

    createMdxPages({ nodes: mdxPages.nodes, actions: actions }, options)
    createTopPage({ nodes: mdxPages.nodes, actions: actions }, options)
    //createIndexPagination({ nodes: mdxPages.nodes, actions: actions})
    createListArchives({ nodes: mdxPages.nodes, actions: actions }, options)
    createDirectoryArchives({ nodes: mdxPages.nodes, actions: actions }, options)
    //createTagArchives({ nodes: mdxPages.nodes, actions: actions, tags: tags}, options)
    createMonthlyArchives({ nodes: mdxPages.nodes, actions: actions }, options)
}


////////////////

const getOgp = async (url) => {
    const data = {
        url: url,
        //domain: url.parse(node.url).hostname,
        title: '',
        description: '',
        image: '',
    }

    const res = await axios.get(url)
    //console.log("getOgp", res.data)
    const $ = cheerio.load(res.data)
    // url
    if ($("meta[property='og:url']").attr('content'))
        data.url = $("meta[property='og:url']").attr('content')
    else if (res.request.res.responseUrl) {
        data.url = res.request.res.responseUrl
    }
    // domain
    //data.domain = url.parse(data.url).hostname
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
        data.image = $("meta[property='og:image']").attr('content')
    else if ($("meta[name='image']").attr('content')) {
        data.image = $("meta[name='image']").attr('content')
    }
    console.log("ogpdata:", data)

    return data
}

