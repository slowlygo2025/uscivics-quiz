import * as Sentry from "@sentry/nextjs";
import { getSharedSentryOptions } from "@/lib/sentry-options";

Sentry.init({
  ...getSharedSentryOptions("client"),
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,
    }),
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
