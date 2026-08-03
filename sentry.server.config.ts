import * as Sentry from "@sentry/nextjs";
import { getSharedSentryOptions } from "./src/lib/sentry-options";

Sentry.init(getSharedSentryOptions("server"));
