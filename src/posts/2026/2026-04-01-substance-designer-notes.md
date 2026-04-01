---
draft: false
title: 'Substance Designer Notes'
description: 'A cheat sheet for things I pick up learning Substance Designer'
tags: ['substance', 'designer']
date: 2026-04-01
tips:
  - title: 'Exporting Normal Maps to Unity'
    anchor: 'exporting-normal-maps-to-unity'
  - title: 'Convert a Grayscale image to Color using Gradient Map'
    anchor: 'convert-a-grayscale-image-to-color-using-gradient-map'
  - title: 'Channels'
    anchor: 'channels'
---

Adding things I learn using Substance Designer here for future reference and ease of access. A diary for things I want to remember. Feel free to have a look! This is a young document currently.

---

### Exporting Normal Maps to Unity
Use the `Normal` node to create a Normal map from Height. Set it to `OpenGL` for Unity. Bump Intensity as needed. 

Awesome Nodes:
`Ambient Occlusion` - Name is obvious, but results are beautiful.
`Normal` - Creates normal from height. Not to be confused with `height to normal world units`.
`Curvature Smooth` - Again obvious, stunning results, output for concave, convex and curvature.
`Slope Blur Grayscale` - blurs the texture based on input. Increase samples for best results. 
`Directional Warp` and `Warp` - Both great, choose your own warp direction, or have it warp in all directions
`Quantize Grayscale` - Awesome for color, creates a stepped feel. Great for painterly effects.

---

### Convert a Grayscale image to Color using Gradient Map
Substance Designer differs from Houdini here considerably. It still works in channels, but it's framed differently. 


### Channels
Shuffle channels using `Channels shuffle` node.
`RGBA Split` and `RGBA Merge` functions as your `Vector to float` and `Float to vector`.