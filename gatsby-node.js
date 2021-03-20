const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require('gatsby-awesome-pagination');
const { urlResolve, createContentDigest } = require(`gatsby-core-utils`)

const withDefaults = require('./src/utils/default_options')
const { monthlyArchivePath, directoryArchivePath, tagArchivePath, listArchivePath,  } = require('./src/utils/archive_path');
const { navigate } = require('gatsby-link');

const templateDir = "./src/templates"

exports.onPreBootstrap = ({store}, themeOptions) => {
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
    `);
};

/*
exports.sourceNodes = ({ actions: { createTypes, createNode } } ) => {
    createTypes(`type AksDirectory implements Node {
        name: String
        label: String
        fullLabel: String
        PagePath: String
    }`)

    const item = { name: "foo", label: "label", fullLabel: "FULLLABEL"}
    createNode({
        id: `gatsby-theme-aks-directory`,
        parent: null,
        children: [],
        ...item,
        internal: {
            type: `AksDirectory`,
            contentDigest: createContentDigest(item),
            content: JSON.stringify(item),
          },        
    }
    )
}
*/
const getDirectoryLabel = (directory, labels) => {
    const last = directory.split('/').pop()
    //console.log("getdirecotyrlabel", directory, labels, last)
    return (labels) ? labels['/' + directory] || last : last
}
const getDirectoryFullLabel = (directory, labels) => {
    if (labels === undefined) { return directory }
    let i = 0

    const parts = directory.split('/')
    return parts.map(v => {
        i = i + 1
        return labels[`/${parts.slice(0, i).join('/')}`] || v
    }).join('/')
}

exports.onCreateNode = ({ node, getNode, actions }, themeOptions) => {
    const { createNodeField } = actions

    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode })
        const directory = slug.split("/").slice(1, -2).join("/")

        createNodeField({
            node,
            name: 'slug',
            value: slug
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
    }
}
////////////////////////////////////////////////////////////////
// markdown pages
const createMdxPages = ({ nodes, actions }, options) => {
    console.log("** all markdown pages")
    const { createPage } = actions
    const template = `${templateDir}/post-template.js`
    
    nodes.forEach(node => {
        createPage({
            path: urlResolve('/', node.fields.slug),
            component: require.resolve(template),
            context: {
                slug: node.fields.slug,
            },
        })
    })
}
////////////////
// top page
const createTopPage = ( {nodes, actions }, options) => {
    const node = (nodes) ? nodes[0] : null    
    if (node == null){ return }

    console.log("** top page", node.fields.slug, node.frontmatter.draft)
    const { createPage } = actions
    createPage({
        path: '/',
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
    paginate({
        createPage,
        items: nodes,
        itemsPerPage: options.itemsPerPage,
        //pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
        pathPrefix: listArchivePath(), 
        component: require.resolve(template)
    })
}
////////////////
// directory archvies
const createDirectoryArchives = ({ nodes, actions }, options) => {
    console.log("** creating directory index")
    const { createPage, createNode } = actions
    const directories = [...new Set(nodes.map(node => node.fields.directory))]
    directories.filter(v=>!!v).forEach(directory => {
        const re = new RegExp(`^${directory}`)
        const items = nodes.filter(node => re.test(node.fields.directory))
        const template = `${templateDir}/directory_archive-template.js`
        //        const pagePath = directoryArchivePath(directory)
        const pagePath = `/${directory}`

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
                //count: nodes.length
            }
        })
        // register the directory into node
        //console.log("options", options)
        

        const item = { name: directory,
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
const createTagArchives = ({ nodes, actions, tags }, options) => {
    console.log("** creating tag archive")
    const { createPage } = actions
    //console.log("tags", tags)
    tags.group.forEach(node => {
        const tag = node.tag
        const items = nodes.filter(node => node.frontmatter.tags?.includes(tag))
        const template = `${templateDir}/tag_archive-template.js`
        paginate({
            createPage,
            items: items,
            itemsPerPage: options.itemsPerPage,
            pathPrefix: tagArchivePath(tag),
            component: require.resolve(template),
            context: {
                archive: 'tag',
                tag: tag
            }
        })
    })
}
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
        //console.log(`monthly archive: ${year}/${month} (${items.length}) [${monthlyArchivePath(year, month)}]`)
        const pagePath = monthlyArchivePath(year, month)
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

    const { data: { mdxPages, tags } } = await graphql(`
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
                    slug, directory
                }
            }            
        }
        tags: allMdx (filter: {frontmatter: {draft: {ne: true} } }){
            group(field: frontmatter___tags) {
            tag: fieldValue
            totalCount
          }
        }
    }`)

    // create pages
    const options = withDefaults(themeOptions)

    createMdxPages({ nodes: mdxPages.nodes, actions: actions}, options)
    createTopPage( { nodes: mdxPages.nodes, actions: actions }, options)
    //createIndexPagination({ nodes: mdxPages.nodes, actions: actions})
    createListArchives({ nodes: mdxPages.nodes, actions: actions}, options)
    createDirectoryArchives({ nodes: mdxPages.nodes, actions: actions}, options)
    createTagArchives({ nodes: mdxPages.nodes, actions: actions, tags: tags}, options)
    createMonthlyArchives({ nodes: mdxPages.nodes, actions: actions}, options)
}
