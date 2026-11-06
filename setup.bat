@echo off
call npm install @capacitor/core @capacitor/cli @capacitor/android || exit /b 1
if not exist android call npx cap add android || exit /b 1
findstr /c:"android.permission.CAMERA" android\app\src\main\AndroidManifest.xml >nul || powershell -Command "(Get-Content android\app\src\main\AndroidManifest.xml) -replace '<uses-permission android:name=\"android.permission.INTERNET\" />','<uses-permission android:name=\"android.permission.INTERNET\" />`n    <uses-permission android:name=\"android.permission.CAMERA\" />`n    <uses-feature android:name=\"android.hardware.camera\" android:required=\"false\" />' | Set-Content android\app\src\main\AndroidManifest.xml"
call npx cap sync android
call npx cap open android
