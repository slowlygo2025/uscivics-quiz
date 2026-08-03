/**
 * Create USCQ Search Core campaign (PAUSED) via Google Ads API.
 * Usage: npm run gads:create-campaign
 */
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  GoogleAdsApi,
  enums,
  toMicros,
  ResourceNames,
} = require("google-ads-api");

const ENV_PATH = new URL("../secrets/google-ads.env", import.meta.url);

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

const AD_GROUPS = [
  {
    tempId: "-2",
    name: "AG Filing Date",
    cpc: 0.55,
    keywords: [
      { text: "n-400 filing date civics test", match: "EXACT", cpc: 0.55 },
      { text: "2008 vs 2025 civics test", match: "PHRASE", cpc: 0.5 },
      { text: "which civics test do i take", match: "PHRASE", cpc: 0.5 },
      { text: "n-400 civics test version", match: "PHRASE", cpc: 0.45 },
    ],
    url: "https://uscivics-quiz.com/en/learn/n-400-filing-date?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=filing_date",
    path1: "learn",
    path2: "n400",
    headlines: [
      "N-400 Filing Date Guide",
      "2008 or 2025 Civics Test?",
      "Which Test Do You Take?",
      "Free Civics Practice",
      "Oct 20 2025 Cutoff Explained",
      "USCIS Civics Version Check",
      "Study the Right Question Bank",
      "No Sign-Up Required",
      "English and Español",
      "128 vs 100 Questions",
      "Confirm Before You Memorize",
      "Eligibility Flow Free",
      "Naturalization Test Prep",
      "Official USCIS Questions",
      "Interview Ready Practice",
    ],
    descriptions: [
      "Your N-400 filing date decides 2008 (100) vs 2025 (128). Free guide plus practice.",
      "Don't study the wrong bank. Check filing date then practice free on USCivics Quiz.",
      "Free eligibility flow. Flashcards and interview simulation included.",
      "Pass-oriented prep for the naturalization civics interview.",
    ],
  },
  {
    tempId: "-3",
    name: "AG 65-20",
    cpc: 0.55,
    keywords: [
      { text: "65/20 civics test", match: "EXACT", cpc: 0.55 },
      { text: "65 20 citizenship test", match: "PHRASE", cpc: 0.5 },
      { text: "starred civics questions", match: "PHRASE", cpc: 0.5 },
      { text: "citizenship test age 65", match: "PHRASE", cpc: 0.45 },
    ],
    url: "https://uscivics-quiz.com/en/learn/65-20?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=6520",
    path1: "learn",
    path2: "6520",
    headlines: [
      "65/20 Civics Test Explained",
      "20 Starred Questions Only",
      "Age 65 + 20 Years LPR",
      "Senior Citizenship Prep",
      "Study Less Pass Civics",
      "Free 65/20 Practice",
      "Language of Choice Path",
      "10 Asked 6 to Pass",
      "USCIS Special Consideration",
      "No Sign-Up Free",
      "Interview Simulation",
      "Starred Question List",
      "Naturalization Seniors",
      "Civics in Your Language",
      "Free Senior Study Path",
    ],
    descriptions: [
      "Qualify for 65/20? Study only 20 starred questions. Free practice on USCivics Quiz.",
      "Officers ask up to 10; you need 6 correct. Free lists and simulation — no account.",
      "Built for seniors and helpers. English and 10+ study languages available.",
      "Confirm filing date version then practice the starred set free.",
    ],
  },
  {
    tempId: "-4",
    name: "AG All 128",
    cpc: 0.6,
    keywords: [
      { text: "128 civics questions", match: "EXACT", cpc: 0.6 },
      { text: "128 uscis civics questions", match: "PHRASE", cpc: 0.55 },
      { text: "citizenship test questions 2025", match: "PHRASE", cpc: 0.55 },
      { text: "citizenship test questions 2026", match: "PHRASE", cpc: 0.55 },
      { text: "citizenship practice test", match: "PHRASE", cpc: 0.5 },
      { text: "uscis civics practice test free", match: "PHRASE", cpc: 0.45 },
    ],
    url: "https://uscivics-quiz.com/en/questions/all-128?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=all128",
    path1: "questions",
    path2: "128",
    headlines: [
      "All 128 USCIS Civics Questions",
      "2025 Citizenship Test Free",
      "Free Practice No Sign-Up",
      "128 Questions and Answers",
      "Interview Simulation Free",
      "Official USCIS Question Bank",
      "Hear Questions Aloud",
      "Pass 12 of 20 Prep",
      "Naturalization Practice",
      "English and Español",
      "Flashcards + Smart Review",
      "2025–2026 Civics Test",
      "Study All 128 Free",
      "Start Practice Now",
      "Free USCIS Civics List",
    ],
    descriptions: [
      "Practice all 128 official USCIS civics questions free with audio and simulation.",
      "No sign-up. Updated for the 2025 test (20 asked / 12 to pass). Start in seconds.",
      "Free flashcards, smart review, and speak practice for the interview.",
      "Independent study tool — not affiliated with USCIS.",
    ],
  },
];

const NEGATIVES = [
  "citizenship by investment",
  "canada citizenship",
  "uk citizenship",
  "australian citizenship",
  "green card lottery",
  "immigration lawyer",
  "immigration attorney",
  "abogado de inmigracion",
  "uscis case status",
  "n-400 pdf only",
  "job",
  "hiring",
  "free money",
  "torrent",
  "quizlet only",
  "trivia",
  "high school civics exam",
  "ap government",
];

function matchType(m) {
  if (m === "EXACT") return enums.KeywordMatchType.EXACT;
  if (m === "PHRASE") return enums.KeywordMatchType.PHRASE;
  return enums.KeywordMatchType.BROAD;
}

async function main() {
  if (!existsSync(ENV_PATH)) throw new Error("Missing secrets/google-ads.env");
  const env = parseEnv(readFileSync(ENV_PATH, "utf8"));
  const customerId = (env.GOOGLE_ADS_CUSTOMER_ID || "").replace(/-/g, "");
  if (!customerId || !env.GOOGLE_ADS_REFRESH_TOKEN) {
    throw new Error("CUSTOMER_ID / REFRESH_TOKEN required");
  }

  for (const ag of AD_GROUPS) {
    for (const h of ag.headlines) {
      if ([...h].length > 30)
        throw new Error(`Headline >30 chars (${[...h].length}): ${h}`);
    }
    for (const d of ag.descriptions) {
      if ([...d].length > 90)
        throw new Error(`Description >90 chars (${[...d].length}): ${d}`);
    }
  }

  const client = new GoogleAdsApi({
    client_id: env.GOOGLE_ADS_CLIENT_ID,
    client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
    developer_token: env.GOOGLE_ADS_DEVELOPER_TOKEN,
  });

  const customer = client.Customer({
    customer_id: customerId,
    refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN,
    ...(env.GOOGLE_ADS_LOGIN_CUSTOMER_ID
      ? { login_customer_id: env.GOOGLE_ADS_LOGIN_CUSTOMER_ID.replace(/-/g, "") }
      : {}),
  });

  const budgetName = ResourceNames.campaignBudget(customerId, "-1");
  const campaignName = ResourceNames.campaign(customerId, "-10");

  /** @type {any[]} */
  const operations = [
    {
      entity: "campaign_budget",
      operation: "create",
      resource: {
        resource_name: budgetName,
        name: "USCQ Search Core Budget",
        delivery_method: enums.BudgetDeliveryMethod.STANDARD,
        amount_micros: toMicros(10),
        explicitly_shared: false,
      },
    },
    {
      entity: "campaign",
      operation: "create",
      resource: {
        resource_name: campaignName,
        name: "USCQ Search Core",
        advertising_channel_type: enums.AdvertisingChannelType.SEARCH,
        status: enums.CampaignStatus.PAUSED,
        campaign_budget: budgetName,
        manual_cpc: { enhanced_cpc_enabled: false },
        network_settings: {
          target_google_search: true,
          target_search_network: false,
          target_content_network: false,
          target_partner_search_network: false,
        },
        contains_eu_political_advertising:
          enums.EuPoliticalAdvertisingStatus
            .DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING,
      },
    },
    {
      entity: "campaign_criterion",
      operation: "create",
      resource: {
        campaign: campaignName,
        location: {
          geo_target_constant: ResourceNames.geoTargetConstant(2840), // United States
        },
      },
    },
    {
      entity: "campaign_criterion",
      operation: "create",
      resource: {
        campaign: campaignName,
        language: {
          language_constant: ResourceNames.languageConstant(1000), // English
        },
      },
    },
  ];

  for (const neg of NEGATIVES) {
    operations.push({
      entity: "campaign_criterion",
      operation: "create",
      resource: {
        campaign: campaignName,
        negative: true,
        keyword: {
          text: neg,
          match_type: enums.KeywordMatchType.BROAD,
        },
      },
    });
  }

  for (const ag of AD_GROUPS) {
    const agName = ResourceNames.adGroup(customerId, ag.tempId);
    operations.push({
      entity: "ad_group",
      operation: "create",
      resource: {
        resource_name: agName,
        name: ag.name,
        campaign: campaignName,
        status: enums.AdGroupStatus.PAUSED,
        type: enums.AdGroupType.SEARCH_STANDARD,
        cpc_bid_micros: toMicros(ag.cpc),
      },
    });

    for (const kw of ag.keywords) {
      operations.push({
        entity: "ad_group_criterion",
        operation: "create",
        resource: {
          ad_group: agName,
          status: enums.AdGroupCriterionStatus.PAUSED,
          keyword: {
            text: kw.text,
            match_type: matchType(kw.match),
          },
          cpc_bid_micros: toMicros(kw.cpc),
        },
      });
    }

    operations.push({
      entity: "ad_group_ad",
      operation: "create",
      resource: {
        ad_group: agName,
        status: enums.AdGroupAdStatus.PAUSED,
        ad: {
          final_urls: [ag.url],
          responsive_search_ad: {
            headlines: ag.headlines.map((text) => ({ text })),
            descriptions: ag.descriptions.map((text) => ({ text })),
            path1: ag.path1,
            path2: ag.path2,
          },
        },
      },
    });
  }

  console.log(`Creating PAUSED campaign with ${operations.length} operations…`);
  const result = await customer.mutateResources(operations);
  console.log("OK — campaign created in PAUSED status.");
  console.log(
    "Review in Google Ads UI before enabling: campaign “USCQ Search Core”."
  );
  if (result?.results?.length) {
    console.log(`Results: ${result.results.length} resources`);
    for (const r of result.results.slice(0, 8)) {
      console.log(" ", r.resource_name || r);
    }
  }
}

main().catch((e) => {
  console.error("FAILED");
  console.error(e?.errors || e?.message || e);
  if (e?.errors) console.error(JSON.stringify(e.errors, null, 2));
  process.exit(1);
});
