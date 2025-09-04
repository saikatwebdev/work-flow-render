# Drops the last commit(s) locally and force-pushes the branch to remote to remove them from remote history.
# WARNING: This rewrites history. Use with caution, ideally when you're the only one pushing to this branch.

param(
  [int]$Count = 1
)

# Ensure we run in repo root
Set-Location "c:\Users\SHAKIT\Desktop\Work-Flow\AI\AI"

# Stop on first error
$ErrorActionPreference = "Stop"

# Determine current branch
$branch = (git rev-parse --abbrev-ref HEAD).Trim()
if (-not $branch) {
  Write-Error "Failed to determine current branch."
  exit 1
}

# Ensure there are enough commits to drop
$commitCount = [int](git rev-list --count HEAD)
if ($commitCount -lt $Count) {
  Write-Error "Not enough commits to reset. HEAD has only $commitCount commit(s)."
  exit 1
}

Write-Output "Resetting $branch back by $Count commit(s) and force pushing to origin/$branch..."

# Drop local commit(s)
& git reset --hard "HEAD~$Count"

# Force push safely
& git push --force-with-lease origin $branch

Write-Output "Done. origin/$branch now points to the previous state before the last $Count commit(s)."