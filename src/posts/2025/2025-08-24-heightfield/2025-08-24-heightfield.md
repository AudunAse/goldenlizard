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

## Heightfield Distort

![Heightfield Distort with iteration step](/assets/images/blog/distort_03.jpg)

One of my favorite nodes are the *Heightfield Distort* node, it distorts the field using noise and helps add some more naturalism to the terrain.
If you increase the substeps to something higher, say 16. You can really squeeze out a lot of detail that looks great.
It creates a really nice contrast between sharper and softer areas, similar to how soil and rock are blended together.

*Note
If you're looking to use tiles, one thing to watch out for is that the distort node will only destort data that exists on the grid. Which you can see if you turn the amplitude up quite a bit, it will move detail away from the edges.*

![Heightfield Distort with iteration step](/assets/images/blog/distort_04.jpg)

No distortion applied 
![Heightfield Distort witout iteration step](/assets/images/blog/distort_01.jpg)

Distortion with 16 substeps
![Heightfield Distort with iteration step](/assets/images/blog/distort_02.jpg)

---

## Erosion

Erosion is the step which I would argue adds the most realism to your terrain. Personally not a huge fan of the erosion node in Houdini as I feel it's quite hard to tune to look good. 

*I am not saying it can't look good, but you will have to make some setting tweaks to get to results comparable to something like say ([Quadspinner - Gaea](https://quadspinner.com/Gaea/))*

Though it's very hard to compare houdini terrains with Gaea which is specifically designed to do terrains. Gaea is a lot more capable, and creates very realistic results relatively easily.

Best case is using them together, since houdini labs has some tools that allow them to operate together. *Money though.*

I also feel Houdini Erosion is quite slow if when working at high resolutions.

Naturally, it's hard to achieve the type of details that you get from erosion in other ways so I would recommend erosion being the final step of your heighfield node tree so you only have to cook it once. *Unless your goals prevents this.*

One little trick I like to use is something I call "fake erosion". It's pretty simple: I use the *Heighfield Flowfield* node which creates a mask that looks a little like how water would flow on your surface.

![Heightfield Distort with iteration step](/assets/images/blog/flowfield_01.jpg)

![Heightfield Distort with iteration step](/assets/images/blog/flowfield_02.jpg)

Then I subtract from height using this new mask
![Heightfield Distort with iteration step](/assets/images/blog/flowfield_03.jpg)

With this eroded looking terrain I blend it back in with the original ground, and you can tune how much of it you want.

![Heightfield Distort with iteration step](/assets/images/blog/flowfield_05.jpg)

*The "eroded" surface blended back into the original*
![Heightfield Distort with iteration step](/assets/images/blog/flowfield_04.jpg)

I've come to really like this approach as I can get *erosion like* detail without running long cooks. Also great for larger detail which can be hard to get from erosion. Alternatively you can erode a low res field to composit on top.

*I highly recommend working as if you're compositing when working with heightfields. By treating each separate "step" as layers that you combine, you'll have great control over what each section of your node tree is doing to the final output.*

![Heightfield Distort with iteration step](/assets/images/blog/flowfield_06.jpg)

---

## Slump Node

![Heightfield Distort with iteration step](/assets/images/blog/slump_03.jpg)

Another personal favorite the `Slump` node. It does what the name describes so fittingly. It "slumps" material downwards with gravity.

I like to create a mask from slope
![Heightfield Distort with iteration step](/assets/images/blog/slump_01.jpg)

With `Slump`
![Heightfield Distort with iteration step](/assets/images/blog/slump_02.jpg)

I use this for most terrains I make. It does such a great job at not only to smoothing out surfaces around sharp slopes, but also creates fantastic masks that help target the heavier dirt that flowed down for years.

---

## The Blur Trick

![Heightfield Distort with iteration step](/assets/images/blog/blur_01.jpg)

Another trick I use, especially when creating a layer of "light" material around a surface is the old Blur and layer.
By first applying a strong blur, and using a `Heightfield Layer` set to `Max`, you can create sandy or snowy looking terrain.

![Heightfield Distort with iteration step](/assets/images/blog/blur_02.jpg)

![Heightfield Distort with iteration step](/assets/images/blog/blur_03.jpg)

---

#### Adding more as i go...
