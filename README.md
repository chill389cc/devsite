# Dev Site
This is a simple site with a stupid name that I'll use to host various things

# Development:
1. Make your changes on a new branch.
2. Run `npm run lint:fix` in the `/app` directory.
3. Make a PR to main.
4. Wait for CI checks to pass. If checks don't pass, fix until they pass.
5. After PR is merged, check that docker hub deploy works.
6. Wait for [Watchtower](https://containrrr.dev/watchtower) to pull down the new docker version, which happens every 60 seconds

# TODO
- Implement HTMX and use HTMX as a wrapper for base site stuff
- Show users their IP for fun
- Move route and redirect code into separate files for separation of concerns
- Add unit tests for things that need to work or else other integrations will stop working
- Lock wishlist access behind password
- Add a sticky bar to the prequel site that shows you which movie you're in and maybe how far into the movie you are
