#Requires -Version 5.1
$ErrorActionPreference = 'Stop'

$selfhost = Join-Path $PSScriptRoot 'selfhost'
$envExample = Join-Path $selfhost '.env.example'
$envFile = Join-Path $selfhost '.env'

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Error 'Docker is not installed. Install Docker Desktop, then rerun this script.'
}

if (-not (Test-Path $envFile)) {
  Copy-Item $envExample $envFile
  Write-Host "Created $envFile — edit AFFINE_SERVER_HOST and POSTGRES_PASSWORD, then rerun."
  exit 0
}

Push-Location $selfhost
try {
  docker compose up -d
  $port = (Get-Content $envFile | Where-Object { $_ -match '^AFFINE_PORT=' }) -replace '^AFFINE_PORT=', ''
  if (-not $port) { $port = '3010' }
  Write-Host ""
  Write-Host "Sync server starting on port $port"
  Write-Host "In Blank: Settings -> Sync -> enter your public HTTPS URL"
  Write-Host "Then sign in with the same account on desktop and phone."
  Write-Host "Build with baked URL:"
  Write-Host "  `$env:BLANK_SYNC_SERVER_URL='https://sync.example.com'; npm run app:build"
}
finally {
  Pop-Location
}
