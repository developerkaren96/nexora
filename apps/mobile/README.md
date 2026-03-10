# Nexora Mobile

Single Flutter codebase that becomes any tenant's branded app by passing `TENANT_SLUG` at build time.

## Build

```bash
flutter pub get
flutter build apk --release \
  --dart-define=TENANT_SLUG=acme \
  --dart-define=API_BASE=https://api.nexora.app
```

The shell fetches `BrandingConfig` (theme, name, feature flags) at launch from
`$API_BASE/v1/site/mobile-config` with the slug as `X-Tenant-Slug`.

## CI build matrix (NEXORA: TODO)
Add a workflow that, per active tenant, runs `flutter build {apk,ipa}` with the
right slug, signs, and uploads to Play/App Store via Fastlane.
