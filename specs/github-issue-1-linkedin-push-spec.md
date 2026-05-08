# LinkedIn Push — Feature Spec

## Source
- GitHub Issue: pskidz216/pskidzpersonalsite#1
- URL: https://github.com/pskidz216/pskidzpersonalsite/issues/1
- Title: "Linked in Push"

## Overview
Automated weekly sync that pulls LinkedIn profile data (new certifications, skills, endorsements, experience updates) and surfaces changes that should be reflected on the personal site. When new data is detected, it either auto-updates the site content or creates a notification/task for manual review.

## Tech Stack
- Next.js 14 + TypeScript + Tailwind CSS (site)
- Supabase (data storage for LinkedIn snapshots)
- n8n or scheduled task (weekly trigger)
- LinkedIn API or scraping fallback

## Features

### F1: LinkedIn Data Pull
- Connect to LinkedIn profile data (public profile or API)
- Capture: certifications, skills, endorsements, experience, education
- Store snapshot in Supabase for comparison

### F2: Change Detection
- Compare current LinkedIn data against last stored snapshot
- Detect: new certifications, updated job titles, new skills, new endorsements
- Flag changes as "needs review" or "auto-update"

### F3: Site Content Update
- Map LinkedIn fields to personal site sections (About, Certifications, Experience)
- Auto-update JSON/markdown content files for the site
- Generate a summary of what changed for review

### F4: Notification
- When changes are detected, create a task in Notion (Personal To-Do)
- Include: what changed, preview of proposed site update, approve/reject

### F5: Weekly Schedule
- Run automatically on a weekly cadence
- Manual trigger available via command or API

## Data Model

### linkedin_snapshots (Supabase)
```sql
id: uuid
profile_url: text
snapshot_data: jsonb (full profile data)
captured_at: timestamptz
changes_detected: jsonb (diff from previous)
status: text ('pending_review' | 'applied' | 'dismissed')
```

## Acceptance Criteria
- [ ] Can pull current LinkedIn profile data
- [ ] Stores snapshots in Supabase
- [ ] Detects new certifications and profile changes
- [ ] Updates site content files when changes are approved
- [ ] Creates Notion task when changes need review
- [ ] Runs on a weekly schedule
- [ ] Manual trigger available

## Out of Scope
- Real-time LinkedIn monitoring (weekly is sufficient)
- LinkedIn posting/publishing from the site
- Two-way sync (site → LinkedIn)
- LinkedIn connections or messaging
