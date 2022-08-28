const http = require("http")
const DEFAULT_USER = { username: "alex", password: "123456" }
const routes = {
  "/contact:get": (request, response) => {
    response.write("Contact test")
    return response.end()
  },
  "/login:post": async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data)

      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401)
        response.write("Unauthorized")
        return response.end()
      }
      response.write("Logged")
      return response.end()
    }
  },
  default: (request, response) => {
    response.write("Hello")
    return response.end()
  },
}

const handler = function (request, response) {
  const { url, method } = request
  const routerKey = `${url}:${method.toLowerCase()}`
  const chosen = routes[routerKey] || routes.default
  response.writeHead(200, {
    "Content-Type": "text/html",
  })

  return chosen(request, response)
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("App is runnig at", 3000))

module.exports = app
