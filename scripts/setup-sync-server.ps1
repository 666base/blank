#Requires -Version 5.1
$ErrorActionPreference = 'Stop'

function Get-DockerExe {
  $cmd = Get-Command docker -ErrorAction SilentlyContinue
  if ($cmd) {
    return $cmd.Source
  }
  $candidates = @(
    "$env:ProgramFiles\Docker\Docker\resources\bin\docker.exe",
    "${env:ProgramFiles(x86)}\Docker\Docker\resources\bin\docker.exe",
    "$env:LOCALAPPDATA\Docker\wsl\docker.exe"
  )
  foreach ($path in $candidates) {
    if (Test-Path $path) {
      return $path
    }
  }
  return $null
}

function Test-DockerDaemon([string]$dockerExe) {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = 'SilentlyContinue'
  try {
    $null = & $dockerExe version --format '{{.Server.Version}}' 2>&1
    return $LASTEXITCODE -eq 0
  } finally {
    $ErrorActionPreference = $prev
  }
}

function Start-DockerDesktopIfNeeded([string]$dockerExe) {
  $desktop = "$env:ProgramFiles\Docker\Docker\Docker Desktop.exe"
  if (Test-DockerDaemon $dockerExe) {
    return
  }
  if (-not (Test-Path $desktop)) {
    return
  }
  Write-Host 'Docker daemon is not running. Starting Docker Desktop...'
  Start-Process $desktop | Out-Null
  for ($i = 0; $i -lt 24; $i++) {
    Start-Sleep -Seconds 5
    if (Test-DockerDaemon $dockerExe) {
      Write-Host 'Docker Desktop is ready.'
      return
    }
    Write-Host "Waiting for Docker Desktop... ($($i + 1)/24)"
  }
}

$docker = Get-DockerExe
if (-not $docker) {
  Write-Error @'
Docker is not installed. Install Docker Desktop, start it (whale icon = Running), then open a NEW PowerShell and rerun:

  npm run sync:server
'@
}

$selfhost = Join-Path $PSScriptRoot 'selfhost'
$envExample = Join-Path $selfhost '.env.example'
$envFile = Join-Path $selfhost '.env'

if (-not (Test-Path $envFile)) {
  Copy-Item $envExample $envFile
  Write-Host "Created $envFile - edit BLANK_SERVER_HOST and POSTGRES_PASSWORD, then rerun."
  exit 0
}

Start-DockerDesktopIfNeeded $docker
if (-not (Test-DockerDaemon $docker)) {
  Write-Error @'
Docker engine is not running.

Do this in order:
1. Quit Docker Desktop (tray icon -> Quit), then open Docker Desktop again
2. Wait 1-2 minutes until it says "Engine running" (not "Starting...")
3. In Docker Desktop: Settings -> Resources -> WSL Integration -> enable Ubuntu
4. PowerShell: wsl --shutdown
5. Start Docker Desktop again, wait until running
6. Test: docker version   (must show Server: line, not only Client)
7. Rerun: npm run sync:server

If Docker still fails: reboot Windows once after wsl --install.
'@
}

Push-Location $selfhost
try {
  $prev = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  & $docker compose up -d 2>&1 | Write-Host
  $composeExit = $LASTEXITCODE
  $ErrorActionPreference = $prev
  if ($composeExit -ne 0) {
    Write-Error "docker compose failed (exit $LASTEXITCODE). Fix Docker Desktop first, then rerun npm run sync:server"
  }

  $portLine = Get-Content $envFile | Where-Object { $_ -match '^BLANK_PORT=' }
  $port = if ($portLine) { ($portLine -replace '^BLANK_PORT=', '').Trim() } else { '3010' }
  Write-Host ''
  Write-Host "Sync server is up on port $port"
  Write-Host 'Desktop Blank: Settings -> Sync -> http://localhost:3010 -> Save and restart'
  Write-Host 'Phone Blank: same Wi-Fi, use http://YOUR_PC_LAN_IP:3010 (not localhost)'
  Write-Host 'Find LAN IP: ipconfig -> IPv4 under Wi-Fi/Ethernet'
  Write-Host 'Then sign in with the SAME account on both devices and use a cloud workspace.'
  Write-Host 'Build with baked URL (PowerShell):'
  Write-Host '  $env:BLANK_SYNC_SERVER_URL="https://sync.example.com"; npm run app:build'
}
finally {
  Pop-Location
}
