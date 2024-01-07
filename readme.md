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

```typescript
import { createRouter, createWebHistory } from "vue-router";
import { Factory, Guard, Route } from "vue-route-handler";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import ManageAccount from "./views/ManageAccount.vue";
import ViewSubscription from "./views/ViewSubscription.vue";
import CancelSubscription from "./views/CancelSubscription.vue";
import UpgradeSubscription from "./views/UpgradeSubscription.vue";
import StartUpgrade from "./views/StartUpgrade.vue";
import SelectNewPlan from "./views/SelectNewPlan.vue";
import ReviewPaymentMethod from "./views/ReviewPaymentMethod.vue";
import ManageCards from "./views/ManageCards.vue";
export const routeHomePage = {
  name: "home",
};

class AuthGuard extends Guard {
  handle(resolve: () => void, reject: (reason: { name: string }) => void) {
    let isAuthenticated = false;

    if (isAuthenticated) {
      resolve();
    } else {
      reject(routeHomePage);
    }
  }
}

class GuestAuthenticationGuard extends Guard {
  handle(resolve: () => void): void {
    resolve();
  }
}

Factory.withGuards({
  auth: AuthGuard,
  guest: GuestAuthenticationGuard,
});

Route.view({ path: "/", view: Home }).name("home");
Route.view({ path: "about", view: About }).name("about").guard("auth");

Route.group({ prefix: "account", name: "account" }, () => {
  Route.view({ path: "/", view: ManageAccount }).name("manage");

  Route.group({ prefix: "subscription", name: "subscription" }, () => {
    Route.view({ path: "/", view: ViewSubscription }).name("view");
    Route.view({ path: "cancel", view: CancelSubscription }).name("cancel");

    Route.view({ path: "upgrade", view: UpgradeSubscription })
      .name("upgrade")
      .children(() => {
        Route.view({ path: "/", view: StartUpgrade }).name("start");
        Route.group({ prefix: "steps" }, () => {
          Route.view({ path: "select-new-plan", view: SelectNewPlan }).name(
            "select-new-plan"
          );
          Route.view({
            path: "review-payment-method",
            view: ReviewPaymentMethod,
          }).name("review-payment-method");
        });
      });
  });

  Route.view({ path: "cards", view: ManageCards }).name("cards");
});

const router = createRouter({
  routes: Factory.routes(),
  history: createWebHistory(),
});

export default router;

```

## using usingResolver method and import.meta.globEager

```typescript
import { createRouter, createWebHistory } from "vue-router";
import { Factory, Guard, Route } from "vue-route-handler";

interface Views {
  [key: string]: { default: any };
}

class AuthGuard extends Guard {
  handle(resolve: () => void): void {

    console.log('MyGuard.handle()');
    resolve();

  }
}

class GuestAuthenticationGuard extends Guard {
  handle(resolve: () => void): void {

    console.log('GuestAuthenticationGuard.handle()');
    resolve();

  }
}


Factory.withGuards({
  auth: AuthGuard,
  guest: GuestAuthenticationGuard
})


const views = import.meta.glob("./views/**/*.vue") as Views;
const view = (path: string) => views[`./views/${path}.vue`];

Factory.usingResolver(view).withGuards({ AuthGuard });

Route.view({ path: "/", view: "Home" }).name("home");
Route.view({ path: "/about", view: "About" }).guard("AuthGuard").name("about");

Route.group({ prefix: "account", name: "account" }, () => {
  Route.view({ path: "/", view: "ManageAccount" }).name("manage");

  Route.group({ prefix: "subscription", name: "subscription" }, () => {
    Route.view({ path: "/", view: "ViewSubscription" }).name("view");
    Route.view({ path: "cancel", view: "CancelSubscription" }).name("cancel");

    Route.view({ path: "upgrade", view: "UpgradeSubscription" })
      .name("upgrade")
      .children(() => {
        Route.view({ path: "/", view: "StartUpgrade" }).name("start");
        Route.group({ prefix: "steps" }, () => {
          Route.view({ path: "select-new-plan", view: "SelectNewPlan" }).name("select-new-plan");
          Route.view({ path: "review-payment-method", view: "ReviewPaymentMethod" }).name("review-payment-method");
        });
      });
  });

  Route.view({ path: "cards", view: "ManageCards" }).name("cards");
});

const router = createRouter({
  routes: Factory.routes(),
  history: createWebHistory(),
});

export default router;

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




