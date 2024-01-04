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

Factory.dump();
Route.dump();

const router = createRouter({
  routes: Factory.routes(),
  history: createWebHistory(),
});

export default router;
