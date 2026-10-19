# Lusion

Local copy of [Lusion](https://lusion.co/) — an award-winning 3D and interactive studio site.

The page shell, styles, and WebGL bundle come from the HTTrack mirror. 3D models, textures, video, and audio stay on Lusion’s asset host (`https://lusion.dev`), which sends `Access-Control-Allow-Origin: *`. The bundle only pointed at that host when the hostname was `lusion.co`. This copy always uses it, so the canvas can load on localhost.

## Run

```bash
node server.cjs
```

Open http://127.0.0.1:3020/

## Pages

- `/` — home
- `/about/` — about
- `/projects/` — project index
- `/projects/<slug>/` — project pages mirrored from the live site
