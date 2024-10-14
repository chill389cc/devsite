# Dev Site
This is a simple site with a stupid name that I'll use to host various things

# Development:
1. Make your changes on a new branch named 'vX.X.X' for the new version you're creating
2. Edit the release_version env var in the publish.yml file with that same version
3. Make a PR to main
4. After PR is merged, check that docker hub deploy works
5. Update homelab to point at new dockerfile tag
