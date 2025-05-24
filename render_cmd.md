# VARS AT BUILD TIME

If you use hosts like `Render` or `Railway`, they usually pass environment variables automatically at build time to the client (if needed).
`Fly.io` does NOT do this automatically.

So when you run fly deploy, you must explicitly pass each build-time variable using the `--build-arg` flag.
