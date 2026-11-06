# Rehab Reality - Android (Capacitor)

The app is `www/index.html`. Capacitor wraps it in a native Android shell.

## Requirements
- Node.js 20+ and npm
- Android Studio (it installs the Android SDK)

## Build the APK
1. Open a terminal in this folder.
2. Run `bash setup.sh` (Windows: `setup.bat`). It installs Capacitor, creates the `android/` project, adds camera permission, and opens Android Studio.
3. Wait for Gradle sync to finish in Android Studio.
4. **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
5. APK is at `android/app/build/outputs/apk/debug/app-debug.apk`. Copy it to your phone and install (allow "install unknown apps").

Or run directly on a connected phone (USB debugging on): press the green Run button.

## After editing the app
Edit `www/index.html`, then run `npx cap sync android` and rebuild.

## Notes
- Fonts load from Google Fonts, so the first launch needs internet. Bundle the font files in `www/` for fully offline use.
- App id: `com.rehabreality.app` (change in `capacitor.config.json` before running setup, if you want another).
- For a Play Store release you need a signed release build (Build > Generate Signed Bundle / APK).
