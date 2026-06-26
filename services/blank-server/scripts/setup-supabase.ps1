#Requires -Version 5.1
<#
.SYNOPSIS
  Push Blank schema to Supabase cloud (free tier).

.STEPS
  1. Create project at https://supabase.com/dashboard (free)
  2. Install CLI: npm i -g supabase   OR   scoop install supabase
  3. supabase login
  4. cd services/blank-server
  5. supabase link --project-ref YOUR_PROJECT_REF
  6. supabase db push
  7. Copy URL + anon key to .env (see .env.example)
#>
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
  Write-Host "Install Supabase CLI: npm install -g supabase" -ForegroundColor Yellow
  Write-Host "Docs: https://supabase.com/docs/guides/cli" -ForegroundColor Cyan
  exit 1
}

Write-Host "Blank Supabase setup" -ForegroundColor Green
Write-Host "  1. Create free project: https://supabase.com/dashboard"
Write-Host "  2. supabase login"
Write-Host "  3. supabase link --project-ref <ref from Project Settings > General"
Write-Host "  4. Run: supabase db push"
Write-Host ""
Write-Host "Migrations folder: supabase/migrations/"
Write-Host "After push, set SUPABASE_URL and SUPABASE_ANON_KEY in .env"

if (Test-Path ".env") {
  Write-Host "Found .env — OK" -ForegroundColor Green
} else {
  Copy-Item ".env.example" ".env"
  Write-Host "Created .env from .env.example — edit with your keys" -ForegroundColor Yellow
}
