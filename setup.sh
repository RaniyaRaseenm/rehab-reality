#!/usr/bin/env bash
# One-time setup: installs Capacitor, generates the android/ project,
# adds camera permissions (for the selfie scan), syncs the web app, opens Android Studio.
set -e
npm install @capacitor/core @capacitor/cli @capacitor/android
[ -d android ] || npx cap add android
M=android/app/src/main/AndroidManifest.xml
if ! grep -q "android.permission.CAMERA" "$M"; then
  sed -i.bak 's#<uses-permission android:name="android.permission.INTERNET" />#<uses-permission android:name="android.permission.INTERNET" />\n    <uses-permission android:name="android.permission.CAMERA" />\n    <uses-feature android:name="android.hardware.camera" android:required="false" />#' "$M" && rm -f "$M.bak"
fi
npx cap sync android
npx cap open android
