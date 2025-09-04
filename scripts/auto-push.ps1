# Auto add/commit/push script
param(
  [string]$Message = "adding new things"
)

# Ensure we are in the repo root
Set-Location "c:\Users\SHAKIT\Desktop\Work-Flow\AI\AI"

# Stage all changes
git add .

# Commit if there is something to commit
$changes = git status --porcelain
if (-not [string]::IsNullOrWhiteSpace($changes)) {
  git commit -m $Message
  git push origin main
} else {
  Write-Host "No changes to commit."
}