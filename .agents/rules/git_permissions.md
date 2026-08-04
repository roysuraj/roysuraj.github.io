# Git and GitHub Command Execution Rules

## CRITICAL PERMISSION MANDATE
1. **Never Execute Git/GitHub Commands Automatically**: The AI agent MUST NOT run any `git` command (e.g., `git commit`, `git push`, `git checkout`, `git branch`, `git merge`, `git rebase`, `git reset`, `git add`) or `gh` (GitHub CLI) commands directly or automatically.
2. **Explicit User Permission Required**: Before performing ANY action that involves Git or GitHub, the agent MUST explicitly ask the user for permission and receive approval.
3. **No Unsanctioned Repository Modifications**: Any changes to local git history, remote repositories, branches, tags, or GitHub PRs/issues must be explicitly confirmed by the user in the chat before execution.
