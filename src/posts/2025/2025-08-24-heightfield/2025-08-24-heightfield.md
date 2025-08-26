---
draft: false
title: 'Houdini Heightfield Notes'
description: "Sharing things I like to do with Houdini Heighfields, for future reference."
tags: 
- houdini
- heightfield
date: 2025-08-26
---

Always been a fan of heightfields and terrain generation. There's something so satisfying seeing the vast variety of environments you can achieve with this type of technology. 

I've learned a few things while tinkering with heightfields over the years, so this is where I'll share some of my methods for heightfields.

#### Heightfield Distort

![Heightfield Distort with iteration step](/assets/images/blog/distort_03.jpg)

One of my favorite nodes are the *Heightfield Distort* node, it distorts the field using noise and helps add some more naturalism to the terrain.
If you increase the substeps to something higher, say 16. Which seems high, but I find totally fast enough. You can really squeeze out a lot of detail that looks great.
It creates a really nice contrast between sharper and softer areas, similar to how soil and rock are blended together.

*Note
If you're looking to use tiles, one thing to watch out for is that the distort node will only destort data that exists on the grid. Which you can see if you turn the amplitude up quite a bit, it will move detail away from the edges.*

![Heightfield Distort with iteration step](/assets/images/blog/distort_04.jpg)

![Heightfield Distort witout iteration step](/assets/images/blog/distort_01.jpg)
No distortion applied 
![Heightfield Distort with iteration step](/assets/images/blog/distort_02.jpg)
Distortion with 16 substeps

#### Erosion

Erosion is the step which I would argue adds the most realism to your terrain. Personally not a huge fan of the erosion node in Houdini as I feel it's quite hard to tune to look good. I also feel it's quite slow if you're working at higher resolutions.
It's hard to achieve the type of details that you get from erosion so I would recommend erosion being the final step of your heighfield node tree so you only have to cook it once.

One little trick I like to use is something I call "fake erosion". It's pretty simple: I use the *Heighfield Flowfield* node which creates a mask that looks a little like how water would flow on your surface.

![Heightfield Distort with iteration step](/assets/images/blog/flowfield_01.jpg)

Then I subtract from height using this new mask

![Heightfield Distort with iteration step](/assets/images/blog/flowfield_02.jpg)
![Heightfield Distort with iteration step](/assets/images/blog/flowfield_03.jpg)

With this eroded looking terrain I blend it back in with the original ground, and you can tune how much of it you want.

![Heightfield Distort with iteration step](/assets/images/blog/flowfield_05.jpg)
![Heightfield Distort with iteration step](/assets/images/blog/flowfield_04.jpg)

I highly recommend working as if you're compositing when working with heightfields. By treating each separate "step" as layers that you combine, you'll have great control over what each section of your node tree is doing to the final output.

![Heightfield Distort with iteration step](/assets/images/blog/flowfield_06.jpg)


#### Adding more as i go...