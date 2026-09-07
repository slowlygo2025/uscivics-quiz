/**
 * Governors + capitals snapshot for ZIP / state study answers.
 * asOf: ISO date of last manual or scripted refresh.
 * Automated refresh: \`npm run scrape:governors\` → writes this file; cron hits /api/cron/governors.
 */
export type GovernorRecord = {
  name: string;
  capital: string;
  governor: string;
};

export const GOVERNORS_AS_OF = "2026-09-07";

export const GOVERNORS: Record<string, GovernorRecord> = {
  AK: { name: "Alaska", capital: "Juneau", governor: "Mike Dunleavy" },
  AL: { name: "Alabama", capital: "Montgomery", governor: "Kay Ivey" },
  AR: { name: "Arkansas", capital: "Little Rock", governor: "Sarah Huckabee Sanders" },
  AZ: { name: "Arizona", capital: "Phoenix", governor: "Katie Hobbs" },
  CA: { name: "California", capital: "Sacramento", governor: "Gavin Newsom" },
  CO: { name: "Colorado", capital: "Denver", governor: "Jared Polis" },
  CT: { name: "Connecticut", capital: "Hartford", governor: "Ned Lamont" },
  DE: { name: "Delaware", capital: "Dover", governor: "Matt Meyer" },
  FL: { name: "Florida", capital: "Tallahassee", governor: "Ron DeSantis" },
  GA: { name: "Georgia", capital: "Atlanta", governor: "Brian Kemp" },
  HI: { name: "Hawaii", capital: "Honolulu", governor: "Josh Green" },
  IA: { name: "Iowa", capital: "Des Moines", governor: "Kim Reynolds" },
  ID: { name: "Idaho", capital: "Boise", governor: "Brad Little" },
  IL: { name: "Illinois", capital: "Springfield", governor: "JB Pritzker" },
  IN: { name: "Indiana", capital: "Indianapolis", governor: "Mike Braun" },
  KS: { name: "Kansas", capital: "Topeka", governor: "Laura Kelly" },
  KY: { name: "Kentucky", capital: "Frankfort", governor: "Andy Beshear" },
  LA: { name: "Louisiana", capital: "Baton Rouge", governor: "Jeff Landry" },
  MA: { name: "Massachusetts", capital: "Boston", governor: "Maura Healey" },
  MD: { name: "Maryland", capital: "Annapolis", governor: "Wes Moore" },
  ME: { name: "Maine", capital: "Augusta", governor: "Janet Mills" },
  MI: { name: "Michigan", capital: "Lansing", governor: "Gretchen Whitmer" },
  MN: { name: "Minnesota", capital: "Saint Paul", governor: "Tim Walz" },
  MO: { name: "Missouri", capital: "Jefferson City", governor: "Mike Kehoe" },
  MS: { name: "Mississippi", capital: "Jackson", governor: "Tate Reeves" },
  MT: { name: "Montana", capital: "Helena", governor: "Greg Gianforte" },
  NC: { name: "North Carolina", capital: "Raleigh", governor: "Josh Stein" },
  ND: { name: "North Dakota", capital: "Bismarck", governor: "Kelly Armstrong" },
  NE: { name: "Nebraska", capital: "Lincoln", governor: "Jim Pillen" },
  NH: { name: "New Hampshire", capital: "Concord", governor: "Kelly Ayotte" },
  NJ: { name: "New Jersey", capital: "Trenton", governor: "Mikie Sherrill" },
  NM: { name: "New Mexico", capital: "Santa Fe", governor: "Michelle Lujan Grisham" },
  NV: { name: "Nevada", capital: "Carson City", governor: "Joe Lombardo" },
  NY: { name: "New York", capital: "Albany", governor: "Kathy Hochul" },
  OH: { name: "Ohio", capital: "Columbus", governor: "Mike DeWine" },
  OK: { name: "Oklahoma", capital: "Oklahoma City", governor: "Kevin Stitt" },
  OR: { name: "Oregon", capital: "Salem", governor: "Tina Kotek" },
  PA: { name: "Pennsylvania", capital: "Harrisburg", governor: "Josh Shapiro" },
  RI: { name: "Rhode Island", capital: "Providence", governor: "Dan McKee" },
  SC: { name: "South Carolina", capital: "Columbia", governor: "Henry McMaster" },
  SD: { name: "South Dakota", capital: "Pierre", governor: "Larry Rhoden" },
  TN: { name: "Tennessee", capital: "Nashville", governor: "Bill Lee" },
  TX: { name: "Texas", capital: "Austin", governor: "Greg Abbott" },
  UT: { name: "Utah", capital: "Salt Lake City", governor: "Spencer Cox" },
  VA: { name: "Virginia", capital: "Richmond", governor: "Abigail Spanberger" },
  VT: { name: "Vermont", capital: "Montpelier", governor: "Phil Scott" },
  WA: { name: "Washington", capital: "Olympia", governor: "Bob Ferguson" },
  WI: { name: "Wisconsin", capital: "Madison", governor: "Tony Evers" },
  WV: { name: "West Virginia", capital: "Charleston", governor: "Patrick Morrisey" },
  WY: { name: "Wyoming", capital: "Cheyenne", governor: "Mark Gordon" },
  DC: { name: "District of Columbia", capital: "Washington, D.C.", governor: "Muriel Bowser (Mayor)" },
};
