---
draft: false
title: 'Houdini Geo To Cops'
description: "Mini tutorial on passing geometry to Houdini 21's Copernicus workflow + seamless tilable texture"
tags: ['houdini', 'tips', 'tutorial']
date: 2026-02-12
tips:
  - title: 'Resolve Intersections'
    anchor: 'resolve-intersections'
  - title: 'Rasterize Geo to Cops Size'
    anchor: 'rasterize-geo-to-cops-size'
---

Something I've found quite useful is being able to get geometry information into cops. After a bit of reading and experimenting, here's what I've learned. As a bonus, we'll make a pile of bricks tilable for game textures.

In this example, I'll show you how to create a seamless texture of a pile of bricks in SideFX Houdini 21. This could be a good starting point if you're looking to create procedural textures for games.

To show the concept let's say we have a brick!
![Beautiful polygon brick](/assets/images/blog/copsrasterize/brick.png)

Using a cube, and pointsfromvolume I scatter some points that I attach these bricks to:
![Pile of brick prepped for sim](/assets/images/blog/copsrasterize/brickPrep.png)

## Resolve Intersections
**Tip**: To resolve intersections, you can add an `attribute create` SOP, name the attribute `found_overlap`, and set it to integer = 1. This will make the RBD solver try to resolve them for you!

![found overlap attribute creation](/assets/images/blog/copsrasterize/foundOverlap.png)
Add this **AFTER** your RBD configure node

This is the setup overall
![RBD overview screenshot](/assets/images/blog/copsrasterize/rbdSetup.png)

I just let the bricks drop by gravity
![Simulation output screenshot](/assets/images/blog/copsrasterize/simPile.png)

### Making it seamless using Mesh Tiler from SideFX Labs

To make this tilable I use a node from the SideFX Labs package. It's called `mesh tiler`.
![mesh tile setup screenshot](/assets/images/blog/copsrasterize/meshTiler.png)

## Rasterize Geo to Cops Size
**Tip**: Since we're moving to cops, the space we're rasterizing is a 1x1m grid. You can reference a camera in the rasterize geo node. *But I'm keeping it simple by sticking to this 1x1m grid.*

Here's the tiled result
![tiled brick geometry screenshot](/assets/images/blog/copsrasterize/tiledPile.png)

Before moving it into cops, though, we can make our own height map by just doing a gradient from the ground up. There's a useful node for this
![creating the height values](/assets/images/blog/copsrasterize/colorbyheightNode.png)

Which looks like this. Simply store this in `@Cd`
![color attribute preview](/assets/images/blog/copsrasterize/colorbyheight.png)

### Rasterize the geometry to Copernicus

Now let's move this into cops. These are the nodes I use
![The rasterize geo setup](/assets/images/blog/copsrasterize/rasterizecopImport.png)

Rasterize setup settings.
![Rasterize setup settings screenshot](/assets/images/blog/copsrasterize/rasterizeSetupSettings.png)

Rasterize geo settings.
![rasterize geo settings screenshot](/assets/images/blog/copsrasterize/rasterizeGeoSettings.png)

You will need `N`, `Cd`, and `uv` attributes for this.

If you want to preview how tilable the texture is use a `tile pattern` node. 

![tile pattern node output screenshot](/assets/images/blog/copsrasterize/tilePatternNode.png)

Settings for reference
![tile pattern node settings](/assets/images/blog/copsrasterize/tilePatternSettings.png)

Output
![final tiled bricks preview](/assets/images/blog/copsrasterize/tiledBricks.png)

---

### Blending a ground map into the height map

What I did then is create a generic noise map that functions as dirty ground.
![Generic noise map used as soil](/assets/images/blog/copsrasterize/genericNoiseMap.png)

Then, if you use a `layer merge` node with the `Cd` attribute from the geo and the noise map, set it to `Max` keeping the brightest pixels available. This functions like moving the dirt higher or lower, embedding the bricks into "soil". 

This is exactly how you would create a material in Substance Designer for example.

![bricks height image with soil](/assets/images/blog/copsrasterize/bricksHeight.png)

Use the mask you created by the `layer merge` to blend the `Color maps` and the `Normal` texture

![color map after compare](/assets/images/blog/copsrasterize/colorMap.png)

![normal map after compare](/assets/images/blog/copsrasterize/bricksNormal.png)

Another great way to test your textures is using the `material preview` node. Plug in your maps to visualise the result.

![material preview node screenshot](/assets/images/blog/copsrasterize/preveiwMaterialNode.png)

![output of material preview node](/assets/images/blog/copsrasterize/materialPreview.png)

Now this doesn't look very interesting, so we'd probably want to use a texture. This is what the `uv` attribute we imported earlier is for.

![Sample texture node setup preview](/assets/images/blog/copsrasterize/sampleTexture.png)

Now that we have cool textures, we can move to export it. 
Also before I forget, cops has a neat node called `ao from height` and it does exactly that. I love the look of this!

![Ambient occlusion from height](/assets/images/blog/copsrasterize/ao.png)

To wrap up, I'll share another picture of my output nodes

![Output nodes setup](/assets/images/blog/copsrasterize/outputs.png)

### Further notes:
I find when you rasterize, you can sometimes get really hard edges, or very non-aliased edges I guess I could call it. I tried making an anti-aliasing setup using OpenCL, but I didn't like the results. 

![Jagged edges from rasterization](/assets/images/blog/copsrasterize/jaggededges.png)

So my fix for this was to set the resolution to 8k for the copnet and simply resample it lower after. This got me way better results, at the obvious cost of machine power. So I just swap to 8k when I'm ready to export, and the results are very clean!