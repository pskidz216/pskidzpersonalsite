# LinkedIn Push — Dev Tickets
**Source**: github-issue-1-linkedin-push-spec.md
**GitHub Issue**: pskidz216/pskidzpersonalsite#1

---

## TICKET-001: Set up Supabase schema for LinkedIn snapshots
- **Status**: spec-ready
- **Priority**: P0
- **Depends on**: none
- **Estimated effort**: S (< 1hr)
- **Description**: Create the `linkedin_snapshots` table in Supabase with RLS policies. Schema: id (uuid), profile_url (text), snapshot_data (jsonb), captured_at (timestamptz), changes_detected (jsonb), status (text enum).
- **Acceptance criteria**:
  - [ ] Table created in Supabase with correct schema
  - [ ] RLS policies enabled (owner-only access)
  - [ ] Migration file saved to project
  - [ ] Types generated for TypeScript
- **Tests required**:
  - [ ] Unit test for type definitions
  - [ ] Integration test for insert/read/update operations
- **Files to create/modify**: `supabase/migrations/001_linkedin_snapshots.sql`, `src/types/linkedin.ts`
- **Test files to create**: `src/__tests__/types/linkedin.test.ts`, `src/__tests__/db/linkedin-snapshots.test.ts`
- **Tech notes**: Use Supabase CLI for migration. Status enum: 'pending_review', 'applied', 'dismissed'.

---

## TICKET-002: Build LinkedIn data fetcher
- **Status**: ready
- **Priority**: P0
- **Depends on**: TICKET-001
- **Estimated effort**: L (2-4hr)
- **Description**: Create a service that pulls LinkedIn profile data. Start with public profile scraping (using a headless approach or LinkedIn's public profile endpoint). Capture certifications, skills, experience, and education. Return structured JSON matching the `snapshot_data` schema.
- **Acceptance criteria**:
  - [ ] Fetches profile data given a LinkedIn URL
  - [ ] Returns structured JSON with certs, skills, experience, education
  - [ ] Handles rate limiting and errors gracefully
  - [ ] Falls back to cached data if fetch fails
- **Tests required**:
  - [ ] Unit test for data parsing/transformation
  - [ ] Unit test for error handling (network failure, rate limit)
  - [ ] Integration test with mock LinkedIn response
- **Files to create/modify**: `src/lib/linkedin/fetcher.ts`, `src/lib/linkedin/parser.ts`, `src/lib/linkedin/types.ts`
- **Test files to create**: `src/__tests__/lib/linkedin/fetcher.test.ts`, `src/__tests__/lib/linkedin/parser.test.ts`
- **Tech notes**: LinkedIn restricts scraping — may need to use LinkedIn API (OAuth) or a third-party service like Proxycurl. Document the approach chosen. Store API keys in .env (never commit).

---

## TICKET-003: Build change detection engine
- **Status**: ready
- **Priority**: P0
- **Depends on**: TICKET-001, TICKET-002
- **Estimated effort**: M (1-2hr)
- **Description**: Compare current LinkedIn pull against the last stored snapshot. Produce a structured diff showing what's new (added certs, updated titles, new skills). Classify changes as auto-updateable or needs-review.
- **Acceptance criteria**:
  - [ ] Compares two snapshots and returns a diff
  - [ ] Detects: new certifications, changed job titles, new skills, new endorsements
  - [ ] Classifies each change as 'auto' or 'review'
  - [ ] Stores the diff in `changes_detected` column
- **Tests required**:
  - [ ] Unit test for diff logic (no changes, new cert, changed title, multiple changes)
  - [ ] Unit test for classification logic
  - [ ] Integration test with real snapshot data
- **Files to create/modify**: `src/lib/linkedin/diff.ts`, `src/lib/linkedin/classifier.ts`
- **Test files to create**: `src/__tests__/lib/linkedin/diff.test.ts`, `src/__tests__/lib/linkedin/classifier.test.ts`
- **Tech notes**: Use immutable data patterns — never mutate snapshots, always create new diff objects.

---

## TICKET-004: Site content updater
- **Status**: ready
- **Priority**: P1
- **Depends on**: TICKET-003
- **Estimated effort**: M (1-2hr)
- **Description**: Map detected changes to personal site content files. Update markdown/JSON data files that feed the site's About, Certifications, and Experience sections. Only apply changes classified as 'auto'. Queue 'review' changes for manual approval.
- **Acceptance criteria**:
  - [ ] Reads change diff and maps to site content files
  - [ ] Updates certifications list in site data
  - [ ] Updates experience section in site data
  - [ ] Only applies 'auto' classified changes
  - [ ] Marks snapshot status as 'applied' after update
- **Tests required**:
  - [ ] Unit test for content mapping logic
  - [ ] Unit test for file update logic
  - [ ] Integration test for full update flow (diff → file update → status change)
- **Files to create/modify**: `src/lib/linkedin/content-updater.ts`, `src/data/certifications.json`, `src/data/experience.json`
- **Test files to create**: `src/__tests__/lib/linkedin/content-updater.test.ts`
- **Tech notes**: Content files should be JSON or MDX that the Next.js site reads at build time.

---

## TICKET-005: Notion notification integration
- **Status**: ready
- **Priority**: P1
- **Depends on**: TICKET-003
- **Estimated effort**: M (1-2hr)
- **Description**: When changes classified as 'review' are detected, create a task in the Personal To-Do Notion database. Include what changed, a preview of the proposed update, and a link to approve/dismiss.
- **Acceptance criteria**:
  - [ ] Creates Notion task in Personal To-Do database
  - [ ] Task includes change summary and proposed update preview
  - [ ] Task area set to "Side Biz", priority "Medium"
  - [ ] Marks snapshot status as 'pending_review'
- **Tests required**:
  - [ ] Unit test for task content formatting
  - [ ] Integration test for Notion API call (mocked)
- **Files to create/modify**: `src/lib/linkedin/notifier.ts`
- **Test files to create**: `src/__tests__/lib/linkedin/notifier.test.ts`
- **Tech notes**: Use Notion MCP tools for creating tasks. Reference Personal To-Do database ID: `16fcc1b3-422e-4df0-8abd-5a60657e37c4`.

---

## TICKET-006: Weekly scheduler and manual trigger
- **Status**: ready
- **Priority**: P1
- **Depends on**: TICKET-002, TICKET-003, TICKET-004, TICKET-005
- **Estimated effort**: M (1-2hr)
- **Description**: Set up a weekly scheduled task that runs the full LinkedIn sync pipeline (fetch → compare → update/notify). Also expose a manual trigger via API route or command.
- **Acceptance criteria**:
  - [ ] Scheduled task runs weekly (configurable day/time)
  - [ ] Manual trigger available via API route `/api/linkedin-sync`
  - [ ] Full pipeline executes: fetch → diff → update → notify
  - [ ] Logs results (what changed, what was updated, any errors)
- **Tests required**:
  - [ ] Integration test for full pipeline (mocked external services)
  - [ ] Unit test for scheduler configuration
- **Files to create/modify**: `src/app/api/linkedin-sync/route.ts`, `src/lib/linkedin/pipeline.ts`
- **Test files to create**: `src/__tests__/lib/linkedin/pipeline.test.ts`, `src/__tests__/api/linkedin-sync.test.ts`
- **Tech notes**: Can use n8n for scheduling, or a Vercel/Netlify cron function, or a 2.16 OS scheduled task. Choose simplest option that works with the Netlify deployment.
