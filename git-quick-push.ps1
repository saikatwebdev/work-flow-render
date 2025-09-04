# Runs git add, commit with a preset message, and push to main
param(
  [string]$Message = "added via zencoder"
)

# Ensure we run in repo root
Set-Location "c:\Users\SHAKIT\Desktop\Work-Flow\AI\AI"

# Stop on first error
$ErrorActionPreference = "Stop"

# Stage all
& git add .

# Check if there is anything to commit
$changes = git status --porcelain
if (-not $changes) {
  Write-Output "No changes to commit. Skipping commit and push."
  exit 0
}

# Commit and push
& git commit -m $Message
& git push origin main