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


const views = import.meta.glob("./views/**/*.vue");
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

Factory.dump();
Route.dump();

const router = createRouter({
  routes: Factory.routes(),
  history: createWebHistory(),
});

export default router;
