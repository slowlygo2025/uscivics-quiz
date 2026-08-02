# Run AFTER closing Cursor (folder lock).
# Renames Desktop\goalwire -> Desktop\uscivics-quiz

$src = Join-Path $env:USERPROFILE "Desktop\goalwire"
$dst = Join-Path $env:USERPROFILE "Desktop\uscivics-quiz"

if (-not (Test-Path $src)) {
  Write-Host "Source not found: $src"
  if (Test-Path $dst) { Write-Host "Already renamed to uscivics-quiz." }
  exit 1
}

if (Test-Path $dst) {
  Write-Host "Target already exists: $dst"
  exit 1
}

Rename-Item -Path $src -NewName "uscivics-quiz"
Write-Host "Renamed OK. Open Cursor on: $dst"
