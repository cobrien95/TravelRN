1. The Core Engine (Jobs & Routing)

VMSpark API: The specialized healthcare aggregator. You use this to pull in the open jobs from walled-garden hospital Vendor Management Systems (VMS) without needing direct hospital permission for your MVP.

Merge.dev (or Unified.to): The "Invisible ATS" router. Once a nurse clicks "Apply," you use this API to push their profile and credentials directly out into the hospital’s or agency's existing ATS (like Workday or Greenhouse) so they never have to log into your dashboard.

2. The "Hook" (Pay & Housing)

GSA Per Diem API: The official U.S. General Services Administration API. 100% free. You use this to calculate the exact maximum tax-free housing and meal (M&IE) stipends based on the hospital's zip code for your "True Net-Pay" calculator.

Apify (Furnished Finder Scraper): Since Furnished Finder doesn't have an open API, you use an Apify "Actor" (a pre-built scraper) to pull their mid-term rental listings to match against the GSA stipend.

RentCast API: An alternative (or backup) to Apify for pulling structured, active real estate and rental data nationwide.

3. The Legal Shield (Credentialing)

Verifiable API (or Propelus API): The automated compliance engine. You use this to instantly run Primary Source Verification (PSV) on a nurse's license against state medical boards and federal exclusion databases (OIG) so you can hand the hospital an "Audit-Ready" candidate.

4. The Lifestyle (Community & Retention)

Google Places API: Used to populate the "Neighborhood Preview" for night-shift nurses (e.g., filtering for 24-hour gyms, late-night diners, and pharmacies near the hospital).

Ticketmaster Discovery API: Has a generous free tier; used to pull local concerts, sports, and theater events based on the assignment's zip code to combat travel nurse loneliness.

5. App Infrastructure & Security

Arcjet: Used for application-level security, bot protection, and rate-limiting. Crucial for protecting your database of nurse PII (Personally Identifiable Information) while hosting on Vercel.