function removeRouteByName (routeName) {
  var routes = Router.routes;
  var route = routes[routeName];
  if (!route) return false;  // Returns false if route is not found

  // Remove route from Router
  delete routes[routeName];
  delete routes._byPath[route.path()];
  var routeIndex = routes.indexOf(route);
  if (routeIndex >= 0) routes.splice(routeIndex, 1);

  // Remove route handler from MiddleWareStack
  delete Router._stack._stack[routeName];
  Router._stack.length -= 1;

  return true;  // Returns true when route is removed
}

Meteor.startup(function () {
  removeRouteByName('posts_default');

  if (Meteor.isClient) {
    var changedRouteTemplate = new Template('ChangedRoute', function () {
      return 'Changed route!';
    });

    Router.route('/', {
      name: 'posts_default',
      template: changedRouteTemplate
    });
  }
});
