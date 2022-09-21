class Route {
  private identifier: string;
  constructor(identifier: string) {
    this.identifier = identifier;
  }

  get withId() {
    return `${this.identifier}/:id`;
  }

  get main() {
    return this.identifier;
  }

  toId(id: string) {
    return `${this.identifier}/${id}`;
  }
}

const routes = {
  home: "/",
  login: "login",
  logout: "logout",
  signup: "signup",
  storage: new Route("storage"),
  recipes: new Route("recipe"),
  catchAll: "*",
};

export default routes;
