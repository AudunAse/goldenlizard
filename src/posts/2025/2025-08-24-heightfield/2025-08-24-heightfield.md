---
draft: true
title: 'Houdini Heightfield Notes'
description: "Sharing things I like to do with Houdini Heighfields, for future reference."
tags: 
- houdini
- heightfield
date: 2025-08-24
---

Always been a fan of heightfields and terrain generation. There's something so satisfying seeing the vast variety of environments you can achieve with this type of technology. 

I've learned a few things while tinkering with heightfields over the years, so this is where I'll share some of those "tricks", or let's call them methods that I like to use for my heightfields.

#### Heightfield Distort

One of my favorite nodes are the Heightfield Distort node, it distorts the field using noise and helps add some more naturalism to the terrain.
If you increase the iteration step to something higher, say 20. Which seems high, but I find is totally fast enough you can really squeeze out a lot of detail that looks great.

If you're looking to use tiles, one thing to watch out for is that the distort node will only destort data that exists on the grid. Which you can see if you turn the amplitude up quite a bit, it will move detail away from the edges.


![The duality of kittens. By JJ Audun](/assets/images/blog/distort_01.jpg)