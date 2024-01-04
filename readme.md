## Vue Route Handler with TypeScript Support

Vue Route Handler is a powerful library that provides elegant and fluent route definitions for Vue Router, drawing
inspiration from the structure of Laravel routes.
Elegant, fluent route definitions for [Vue Router](https://router.vuejs.org/), inspired
by [Laravel](https://laravel.com).</p>


**To install the latest version, run the following command:**

```sh
npm i vue-route-handler
```

```sh
yarn add vue-route-handler
```

## Overview

Vue Route Handler simplifies the process of declaring route definitions for Vue Router.
Drawing inspiration from Laravel, it utilizes chained calls to construct your routes,
enabling you to group and nest them as deeply as needed.

## Here's an example usage:

```js
Route.view({path: 'blog', view: 'Blog'})
  .name('blog').children(() => {
    // All Posts
    Route.view({path: '/', view: 'Blog/Posts'}).name('posts')
    // Single Post
    Route.view({path: '{post}', view: 'Blog/Post'}).name('single-post').children(() => {
      Route.view({path: 'edit', view: 'Blog/Post/Edit'}).name('edit')
      Route.view({path: 'stats', view: 'Blog/Post/Stats'}).name('stats')
    })
  })

Route.view({path: 'about', view: 'About'}).name('about')
```

This results in an array of routes in the format expected by Vue Router.
The library's behavior is somewhat akin to Laravel's router, including:

- Utilizing callbacks to iteratively collect routes
- Properly joining nested routes, regardless of prefixed slashes
- Correctly joining the names of nested routes using a separator of your choice

## License

Vue Route Handler is licensed under the ISC license, a more permissive variant of the MIT license.
For details, refer to the [licence file](license.md).

## Contributing

Contributions to Vue Route Handler are welcome! To contribute, open a Pull Request with your changes.
Provide a clear description of the changes, indicating whether they fix a bug, enhance an existing feature, or introduce
a new one.

If you discover a bug but are unable to fix it, or if you lack the time to do so,
[open an issue](https://github.com/anilkumarthakur60/vue-route-handler/issues/new).

Please ensure the issue is Ensure the issue is descriptive and includes a link to a reproduction of the problem. Prefix the title with the applicable version of route-handler, such as `[1.0]`.


For feature requests, submit an issue with the title prefixed by "Feature Request."




