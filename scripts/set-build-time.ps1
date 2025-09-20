# PowerShell script to set build time
$buildTime = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
$env:VITE_BUILD_TIME = $buildTime
Write-Host "Build time set to: $buildTime"
