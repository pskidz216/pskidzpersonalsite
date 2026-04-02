# Scan for New Claude Code Projects

Scan for new Claude Code projects and offer to add them to the "What I've Built" section of Paul's portfolio site.

## Workflow

### Step 1: Discover New Projects

1. List all directories in `~/.claude/projects/`
2. Read the known-projects registry at `src/lib/known-projects.json`
3. Identify any directories NOT in the registry — these are "new"
4. Filter out noise: skip entries containing `node-modules`, `worktrees`, or trailing-dash duplicates of existing entries

### Step 2: Decode and Present

For each new project directory:
- Strip the `-Users-paulskidmore-Desktop-` prefix
- Convert remaining dashes to spaces and apply title case
- Present a numbered list to the user with the decoded project names

Ask the user which projects they want to add to the site, and which to skip.

### Step 3: Gather Details (for each approved project)

Ask the user for:
- **Display name** (suggest one based on the decoded directory name)
- **Tag** (e.g., "Dashboard", "AI Agent", "Product Site", "Company Site", "Workflow", "Internal Tool")
- **Brief description** (2-3 sentences about what it does)
- **Tech stack** (comma-separated list)
- **Screenshot source**: a URL or localhost port where the project is running, OR ask the user to provide a screenshot file

### Step 4: Capture Screenshot

If the user provides a URL or port:
1. Create a temporary Playwright project: `cd /tmp && mkdir -p pw-capture && cd pw-capture && npm init -y && npm install playwright`
2. Set PATH: `export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"`
3. Write and run a Playwright script that:
   - Launches headless Chromium at 1280x800 viewport
   - Navigates to the provided URL
   - Waits for `networkidle` + 3 seconds for animations
   - If there's a login page, ask the user for credentials and handle auth
   - Saves the screenshot to `public/projects/<slug>.png` (kebab-case slug derived from project name)

If the user provides a file path instead, copy it to `public/projects/<slug>.png`.

### Step 5: Update Site Data

1. Open `src/lib/data.ts`
2. Append a new entry to the `projects` array with the gathered details:
   ```typescript
   {
     name: "<display name>",
     tag: "<tag>",
     description: "<description>",
     tech: "<tech stack>",
     image: "/projects/<slug>.png",
   },
   ```

### Step 6: Update Registry

Update `src/lib/known-projects.json`:
- For approved projects: add `{ "status": "added", "siteName": "<display name>" }`
- For skipped projects: add `{ "status": "skipped", "reason": "User declined" }`

### Step 7: Commit and Push

1. Stage the changed files: `git add src/lib/data.ts src/lib/known-projects.json public/projects/`
2. Commit: `Add <project-name> to portfolio builds`
3. Push to origin: `git push`

## Important Notes

- The `Project` interface and `projects` array live in `src/lib/data.ts`
- Screenshots go in `public/projects/` as PNG files with kebab-case names
- The `Built.tsx` component imports from `data.ts` — no changes needed there
- Always ask for user approval before adding anything
- If no new projects are found, tell the user "No new Claude Code projects detected since last scan"
