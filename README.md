A Gatsby theme for creating a portfolio site.

## Installation
### For a new site

If you're creating a new site and want to use the blog theme, you can use the blog theme starter. This will generate a new site that pre-configures use of the blog theme.

```shell
gatsby new my-themed-blog https://github.com/foobar/..
```

### For an existing site

If you already have a site you'd like to add the blog theme to, you can manually configure it.

1. Install the blog theme

```shell
npm install http://github.com/atarukodaka/gatsby-theme-aksite
```

2. Add the configuration to your `gatsby-config.js` file

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-aksite`,
      options: {
          contentPath: `content/posts`
      },
    },
  ],
}
```

### Whats Inside
