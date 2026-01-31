/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as activities from "../activities.js";
import type * as admin from "../admin.js";
import type * as agents from "../agents.js";
import type * as alerting from "../alerting.js";
import type * as budgets from "../budgets.js";
import type * as collector from "../collector.js";
import type * as costs from "../costs.js";
import type * as evaluateAlerts from "../evaluateAlerts.js";
import type * as notifications from "../notifications.js";
import type * as seed from "../seed.js";
import type * as snitchScore from "../snitchScore.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  activities: typeof activities;
  admin: typeof admin;
  agents: typeof agents;
  alerting: typeof alerting;
  budgets: typeof budgets;
  collector: typeof collector;
  costs: typeof costs;
  evaluateAlerts: typeof evaluateAlerts;
  notifications: typeof notifications;
  seed: typeof seed;
  snitchScore: typeof snitchScore;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
