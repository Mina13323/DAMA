/**
 * DAMA Developments — Comprehensive Website & Data Integrity Verification Suite
 *
 * Runs tests on:
 * 1. Dictionary completeness & structural parity (EN vs AR)
 * 2. Projects data, facts, amenities & image sources
 * 3. News articles, slugs, categories & rich sections
 * 4. Careers positions, culture pillars & departments
 * 5. Lead validation rules & spam prevention
 * 6. Contact and social link integrity
 */
import { en } from "../src/content/en";
import { ar } from "../src/content/ar";
import { projects, getProjects, getProject, availableCategories } from "../src/content/projects";
import { newsArticles, getNewsArticles, getNewsArticle } from "../src/content/news";
import { careerPositions, getCareerPositions, getCareerPosition } from "../src/content/careers";
import { contact, social } from "../src/content/site";
import { validateLead } from "../src/lib/leads";

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

function deepCompareKeys(objA: Record<string, any>, objB: Record<string, any>, path = ""): string[] {
  const missing: string[] = [];
  for (const key of Object.keys(objA)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (!(key in objB)) {
      missing.push(`Missing in B: ${currentPath}`);
    } else if (
      typeof objA[key] === "object" &&
      objA[key] !== null &&
      !Array.isArray(objA[key])
    ) {
      missing.push(...deepCompareKeys(objA[key], objB[key], currentPath));
    }
  }
  return missing;
}

console.log("\n=======================================================");
console.log(" DAMA Developments — Automated Integrity Test Suite");
console.log("=======================================================\n");

// 1. Dictionary Parity
console.log("1. Dictionary Parity (EN <-> AR):");
const missingInAr = deepCompareKeys(en, ar);
const missingInEn = deepCompareKeys(ar, en);
assert(missingInAr.length === 0, `All EN dictionary keys exist in AR (${missingInAr.length} missing: ${missingInAr.join(", ")})`);
assert(missingInEn.length === 0, `All AR dictionary keys exist in EN (${missingInEn.length} missing: ${missingInEn.join(", ")})`);
assert(en.locale === "en" && en.dir === "ltr", "EN dictionary specifies locale=en and dir=ltr");
assert(ar.locale === "ar" && ar.dir === "rtl", "AR dictionary specifies locale=ar and dir=rtl");

// 2. Projects Data Integrity
console.log("\n2. Projects Data Integrity:");
const allProjects = getProjects();
assert(allProjects.length >= 3, `Projects collection contains at least 3 developments (found: ${allProjects.length})`);
for (const p of allProjects) {
  assert(p.slug.length > 0, `Project "${p.name}" has valid slug: ${p.slug}`);
  assert(getProject(p.slug) !== undefined, `getProject("${p.slug}") correctly resolves project`);
  assert(p.image.startsWith("https://") || p.image.startsWith("/"), `Project "${p.slug}" has valid hero image`);
  assert(p.images.gallery.length >= 4, `Project "${p.slug}" has at least 4 gallery photos (found: ${p.images.gallery.length})`);
  assert(p.copy.en.facts.length >= 3, `Project "${p.slug}" has EN facts (found: ${p.copy.en.facts.length})`);
  assert(p.copy.ar.facts.length >= 3, `Project "${p.slug}" has AR facts (found: ${p.copy.ar.facts.length})`);
  assert(p.copy.en.amenities.length >= 4, `Project "${p.slug}" has EN amenities (found: ${p.copy.en.amenities.length})`);
  assert(p.copy.ar.amenities.length >= 4, `Project "${p.slug}" has AR amenities (found: ${p.copy.ar.amenities.length})`);
}
const categories = availableCategories();
assert(categories.includes("residential"), "availableCategories() includes 'residential'");
assert(categories.includes("villas"), "availableCategories() includes 'villas'");
assert(categories.includes("apartments"), "availableCategories() includes 'apartments'");

// 3. News & Events Data Integrity
console.log("\n3. News & Events Data Integrity:");
const articles = getNewsArticles();
assert(articles.length >= 4, `News collection contains at least 4 articles (found: ${articles.length})`);
for (const a of articles) {
  assert(a.slug.length > 0, `Article slug is valid: ${a.slug}`);
  assert(getNewsArticle(a.slug) !== undefined, `getNewsArticle("${a.slug}") resolves article`);
  assert(a.copy.en.title.length > 10, `EN title is substantial: "${a.copy.en.title.slice(0, 30)}…"`);
  assert(a.copy.ar.title.length > 10, `AR title is substantial: "${a.copy.ar.title.slice(0, 30)}…"`);
  assert(a.copy.en.sections.length >= 1, `Article "${a.slug}" has content sections in EN`);
  assert(a.copy.ar.sections.length >= 1, `Article "${a.slug}" has content sections in AR`);
  assert(a.image.startsWith("https://") || a.image.startsWith("/"), `Article "${a.slug}" has valid photograph`);
}

// 4. Careers Data Integrity
console.log("\n4. Careers Data Integrity:");
const positions = getCareerPositions();
assert(positions.length >= 4, `Careers collection contains open positions (found: ${positions.length})`);
for (const pos of positions) {
  assert(pos.slug.length > 0, `Position slug is valid: ${pos.slug}`);
  assert(getCareerPosition(pos.slug) !== undefined, `getCareerPosition("${pos.slug}") resolves position`);
  assert(pos.copy.en.responsibilities.length >= 3, `Position "${pos.slug}" has EN responsibilities`);
  assert(pos.copy.ar.responsibilities.length >= 3, `Position "${pos.slug}" has AR responsibilities`);
  assert(pos.copy.en.qualifications.length >= 3, `Position "${pos.slug}" has EN qualifications`);
  assert(pos.copy.ar.qualifications.length >= 3, `Position "${pos.slug}" has AR qualifications`);
}

// 5. Lead & Inquiry Validation Rules
console.log("\n5. Lead & Inquiry Validation Rules:");
const validProjectLead = {
  name: "Karim Mostafa",
  email: "karim@example.com",
  phone: "+20 100 123 4567",
  message: "Interested in visiting Rwasin villa clusters.",
  consent: true,
  project: "rwasin",
  locale: "en",
};
assert(Object.keys(validateLead(validProjectLead)).length === 0, "Valid project lead passes with 0 errors");

const validGeneralLead = {
  name: "Nouran El-Sayed",
  email: "nouran@example.com",
  phone: "01009876543",
  message: "Inquiring about upcoming commercial or mixed-use phases.",
  consent: true,
  project: "general",
  subject: "general",
  locale: "ar",
};
assert(Object.keys(validateLead(validGeneralLead)).length === 0, "Valid general contact lead passes with 0 errors");

const invalidLeadEmail = { ...validProjectLead, email: "invalid-email-address" };
assert(validateLead(invalidLeadEmail).email === true, "Invalid email is rejected");

const invalidLeadPhone = { ...validProjectLead, phone: "123" };
assert(validateLead(invalidLeadPhone).phone === true, "Short phone number is rejected");

const missingConsent = { ...validProjectLead, consent: false };
assert(validateLead(missingConsent).consent === true, "Missing privacy consent is rejected");

const nameTooShort = { ...validProjectLead, name: "A" };
assert(validateLead(nameTooShort).name === true, "Single character name is rejected");

const messageTooLong = { ...validProjectLead, message: "A".repeat(2500) };
assert(validateLead(messageTooLong).message === true, "Message over character limit is rejected");

// 6. Contact and Social Channels
console.log("\n6. Official Channels & Social Links:");
assert(contact.phone.length > 5, `Contact phone is populated: ${contact.phone}`);
assert(contact.email.includes("@"), `Contact email is valid: ${contact.email}`);
assert(contact.mapUrl.startsWith("https://"), `Google Maps URL is populated: ${contact.mapUrl}`);
assert(social.length >= 4, `At least 4 social channels configured (found: ${social.length})`);
for (const s of social) {
  assert(s.href.startsWith("https://"), `Social link "${s.label}" has valid URL: ${s.href}`);
}

console.log("\n=======================================================");
console.log(` SUMMARY: ${passed} passed, ${failed} failed`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
