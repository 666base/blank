$ErrorActionPreference = 'Stop'

$sdkRoot = Join-Path $env:LOCALAPPDATA 'Android\Sdk'
$cmdlineRoot = Join-Path $sdkRoot 'cmdline-tools\latest'
$zipPath = Join-Path $env:TEMP 'android-cmdline-tools.zip'
$extractRoot = Join-Path $env:TEMP 'android-cmdline-tools-extract'
$downloadUrl = 'https://dl.google.com/android/repository/commandlinetools-win-13114758_latest.zip'

Write-Host "Android SDK root: $sdkRoot"

New-Item -ItemType Directory -Force -Path $sdkRoot | Out-Null

if (-not (Test-Path (Join-Path $cmdlineRoot 'bin\sdkmanager.bat'))) {
  Write-Host 'Downloading Android command-line tools...'
  Invoke-WebRequest -Uri $downloadUrl -OutFile $zipPath

  if (Test-Path $extractRoot) {
    Remove-Item -Recurse -Force $extractRoot
  }
  New-Item -ItemType Directory -Force -Path $extractRoot | Out-Null
  Expand-Archive -Path $zipPath -DestinationPath $extractRoot -Force

  New-Item -ItemType Directory -Force -Path (Split-Path $cmdlineRoot) | Out-Null
  if (Test-Path $cmdlineRoot) {
    Remove-Item -Recurse -Force $cmdlineRoot
  }
  Move-Item (Join-Path $extractRoot 'cmdline-tools') $cmdlineRoot
}

$sdkmanager = Join-Path $cmdlineRoot 'bin\sdkmanager.bat'
if (-not (Test-Path $sdkmanager)) {
  throw "sdkmanager not found at $sdkmanager"
}

$env:ANDROID_HOME = $sdkRoot
$env:ANDROID_SDK_ROOT = $sdkRoot
$env:JAVA_HOME = (
  Get-ChildItem 'C:\Program Files\Eclipse Adoptium' -Directory |
    Where-Object { $_.Name -like 'jdk-21*' } |
    Sort-Object Name -Descending |
    Select-Object -First 1
).FullName
if (-not $env:JAVA_HOME) {
  $env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot'
}
$env:Path = "$env:JAVA_HOME\bin;$sdkRoot\platform-tools;$cmdlineRoot\bin;" + $env:Path

Write-Host 'Accepting Android SDK licenses...'
$yes = ("y`n" * 200)
$yes | & $sdkmanager --licenses | Out-Host

Write-Host 'Installing SDK packages (platform-tools, build-tools, platform)...'
& $sdkmanager 'platform-tools' 'platforms;android-35' 'build-tools;35.0.0'

Write-Host ''
Write-Host 'Android SDK setup complete.'
Write-Host "ANDROID_HOME=$sdkRoot"
Write-Host "JAVA_HOME=$env:JAVA_HOME"
