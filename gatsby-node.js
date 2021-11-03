/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
require("source-map-support").install()
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
})

const fs = require("fs")
const path = require("path")
const Router = require("./src/lib/router").Router

let router = new Router()

// This is added so we can get the contents of the snippets files in our Snippet component
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "File" && node.absolutePath.match(/snippets/)) {
    createNodeField({
      node,
      name: "content",
      value: fs.readFileSync(node.absolutePath, "utf8"),
    })
  }
}

exports.createPages = ({ actions }) => {
  const { createPage, createRedirect } = actions

  const createAppPage = function (url) {
    createPage({
      path: url, // dont shadow path module with local path variable
      matchPath: "/*",
      component: path.resolve(`./src/routes/app.js`),
    })
  }

  createAppPage("404")

  // Loop over all routes in the router
  // 1. If the route is a page, create a page using gatsby API
  // 2. If the route is a parent, redirect the parent URL to the first child page
  router.allRoutes
    .filter((route) => !route.isDynamic)
    .forEach((route) => {
      if (route.isPage) {
        createAppPage(route.url)
      } else {
        let firstPage = route.pages[0]
        if (!firstPage.isDynamic) {
          createRedirect({
            fromPath: route.fullPath,
            toPath: firstPage.url,
          })
        }
      }
    })

  // TODO: Create all API docs pages dynamically
  createAppPage("/api/classes/association")
  createAppPage("/api/classes/collection")
  createAppPage("/api/classes/db")
  createAppPage("/api/classes/db-collection")
  createAppPage("/api/classes/identity-manager")
  createAppPage("/api/classes/jsonapi-serializer")
  createAppPage("/api/classes/model")
  createAppPage("/api/classes/response")
  createAppPage("/api/classes/schema")
  createAppPage("/api/classes/serializer")
  createAppPage("/api/classes/server")
  createRedirect({
    fromPath: "/api",
    toPath: "/api/classes/association",
  })
  createRedirect({
    fromPath: "/api/classes",
    toPath: "/api/classes/association",
  })
 

  // Netlify Redirects
  createAppPage("/repl/v1/ssr-shell")
  createRedirect({
    fromPath: "/repl/v1/*",
    toPath: "/repl/v1/ssr-shell",
    statusCode: 200,
  })

  createRedirect({
    fromPath: "/*",
    toPath: "/404.html",
    statusCode: 404,
  })
}

// DOC STUFF TODO Extract

let esdoc = require("esdoc").default
let tmp = require("tmp")

let slugify = function (str) {
  return str
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([0-9])([^0-9])/g, "$1-$2")
    .replace(/([^0-9])([0-9])/g, "$1-$2")
    .replace(/-+/g, "-")
    .toLowerCase()
}

let generateESDoc = function (config) {
  var tmpdir = tmp.dirSync()
  let originalLog = console.log
  console.log("Generating ESDoc index")
  console.log = () => {}
  esdoc.generate({ ...config, ...{ destination: tmpdir.name } })
  console.log = originalLog
  let index = fs.readFileSync(`${tmpdir.name}/index.json`)
  let result = JSON.parse(index)
  tmpdir.removeCallback()

  return result
}

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  let docNodes = generateESDoc({
    source: "./node_modules/miragejs/lib",
    excludes: ["(node_modules|tests|tmp)"],
    plugins: [
      {
        name: "esdoc-ecmascript-proposal-plugin",
        option: {
          classProperties: true,
          objectRestSpread: true,
          doExpressions: true,
          functionBind: true,
          functionSent: true,
          asyncGenerators: true,
          decorators: true,
          exportExtensions: true,
          dynamicImport: true,
        },
      },
      { name: "esdoc-accessor-plugin" },
    ],
  })

  docNodes.forEach((docNode) => {
    let node = {
      ...{ slug: slugify(docNode.name) },
      ...docNode,
    }

    let data = {
      ...node,
      ...{
        id: createNodeId(`esdoc-${node.__docId__}`),
        internal: {
          type: "ESDoc",
          contentDigest: createContentDigest(JSON.stringify(node)),
        },
      },
    }

    createNode(data)
  })
}
