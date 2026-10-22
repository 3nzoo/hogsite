# Deploy to the existing Cloudflare Worker

This Next.js project uses `output: "export"`. `npm run build` generates the
complete website in `out/`, including its HTML, JavaScript, images, sitemap,
robots file, and sharing image. Cloudflare Workers Static Assets serves that
export without a Next.js server or an OpenNext adapter.

The root `wrangler.jsonc` targets the owner's existing Worker,
`house-of-gyoza`. Its asset directory is `./out`. Unknown URLs return the
exported `404.html` with a 404 response. HTML directory routes use trailing
slashes, matching `next.config.ts`.

## Worker dashboard settings

Open **Workers & Pages > house-of-gyoza > Settings > Build** and use:

| Setting | Value |
| --- | --- |
| Repository | `3nzoo/hogsite` |
| Production branch | `v1` |
| Root directory | Repository root; leave blank, or `/` if required |
| Build command | `npm run build` |
| Deploy command | `npx wrangler@4 deploy` |

Replace any OpenNext build or deploy command with the commands above.
The output directory is configured in `wrangler.jsonc`, so Workers does not
need a separate Pages-style build output directory field. Commit and push
this configuration to the branch selected in Cloudflare before retrying.

Under **Build variables and secrets**, add these as build variables:

| Variable | Value |
| --- | --- |
| `NODE_VERSION` | `22.23.2` |
| `SITE_URL` | `https://www.houseofgyoza.com` |

To add the optional Facebook `fb:app_id` tag, also set `FACEBOOK_APP_ID` to
your numeric Meta developer App ID. This is a public identifier, not the App
Secret, Facebook Page ID, or Pixel ID. Add it under **Build variables and
secrets**, then rebuild and deploy: this static website reads the value during
the build, not at runtime. If the variable is empty or unset, the tag is omitted.
For local development, copy `.env.example` to the ignored `.env.local` file
and enter the value there. After publishing, use Facebook Sharing Debugger's
**Scrape Again** action to refresh the metadata.

Keep the existing Cloudflare-generated deployment API token selected.
The Worker name in the dashboard must match `house-of-gyoza` in the config.
Saving settings affects the next build; retry the failed build to use them.

## Verify after deployment

Open the Worker's assigned `workers.dev` URL and check the homepage, images,
menu, mobile animation, `/robots.txt`, and `/sitemap.xml`. Visit a made-up path
to confirm the not-found page appears.

After the test deployment works, connect `www.houseofgyoza.com` under the
Worker's **Settings > Domains & Routes > Add > Custom Domain**. Domain DNS
must be active in Cloudflare. Keep the separate distributor site's DNS and
hosting configuration in place. Configure the root-domain redirect to the
canonical `www` address separately.

Future pushes to the Worker's configured production branch trigger builds
and publish the resulting static site.

## Local verification without publishing

With Node.js 22 selected, run:

```sh
npm run build
npx wrangler@4 deploy --dry-run
```

The dry run checks the deployment configuration locally without uploading
or deploying the website. Building and running a dry run do not require a
Cloudflare API token in this repository.

## References

- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Workers build settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Asset configuration](https://developers.cloudflare.com/workers/static-assets/binding/)
