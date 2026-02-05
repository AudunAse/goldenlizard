---
draft: false
title: 'Kickblast'
description: '"Kickblast" – a handy collection of ways to delete stuff in Houdini.'
tags: ['houdini']
date: 2021-06-24
---

*Migrated from Affex.no.* PS: This post was written in 2021.

While working in the wicked world of Houdini, there are certain tasks we do over and over again. Many of those methods are covered by SideFX, but it is always useful to make your day easier by automating certain things. Here I'll share one of my favourite assets from my toolbox. So what does it do? It deletes stuff…

**Download the asset (HDA):**

<a href="https://drive.google.com/uc?export=download&id=1ryz0KHuopnGCelpLUbg15Xc7ChfkzRKL" class="button" data-button-variant="primary" target="_blank" rel="noopener noreferrer">Download Kickblast HDA</a>

![Kickblast HDA preview](/assets/images/blog/kickblast/600f7b98db6e3aa5b7b1b161_kickblast_preview.jpg)

## Kickblast – Delete Presets

Kickblast is a digital asset I created to avoid having to manually delete stuff over and over again. It's essentially a collection of different methods for deleting points primarily. It functions purely as a time saver. I've done a bit of work on it lately to be slightly more useful and more compact. I still use it a ton.

### 1. Delete by Color / Cd

Hopefully very self-explanatory: delete based on Cd attribute. Drag the Threshold slider to tune your selection.

![Kickblast delete by color](/assets/images/blog/kickblast/_kickblast_bycolor.gif)

### 2. Delete by position / P

This will delete points based on position. The bounding box checkbox will clip based on the bbox of the input. Turn this off to get absolute position value. This method is directional, so you need to select your axis and delete from there.

![Kickblast delete by position](/assets/images/blog/kickblast/_kickblast_byP.gif)

### 3. Delete by velocity / v

This will delete points based on velocity. I very often have the need to delete or group based on a point's velocity. Kickblast takes the length of v and fits it to 0–1, which then is added to the Threshold slider.

![Kickblast delete by velocity](/assets/images/blog/kickblast/kickblast_byv.gif)

### 4. Delete by percentage / %

Another classic. Delete a percentage of the points—very handy for quickly down-sampling a heavy particle sim. I recommend using the id option on simulations to retain the selection over time.

![Kickblast delete by percentage](/assets/images/blog/kickblast/6984f1351acfdc404095cbf6_600fa4231bf8cc6e7555ee0e_kickblast_percent.gif)

### 5. The Point Stamper

Slightly more advanced, but still very useful. This preset will reveal a point once, **and never again**. Nice for disintegration-type effects, where you have a point cloud and you're progressively revealing or introducing points to a simulation.

Two modes: **Pre-placed** (all points we want to emit from already exist) and **Continuous** (from points that are simulated or introduced over time). The latter requires unique id attributes for the solver to keep track.

![Kickblast Point Stamper](/assets/images/blog/kickblast/6984f1351acfdc404095cbfc_600fcd1e8dba21466c879ee4_kickblast_stamper.gif)

### 6. Attribute Density

Delete based on a "density" attribute. Kickblast will gradually delete points based on this attribute—think of it as a value from 0–1, the likelihood of a point being deleted. 1 = 100% likely to get deleted, 0 = 0% likely.

![Kickblast attribute density](/assets/images/blog/kickblast/6984f1351acfdc404095cc05_600fcf637bca5463e2ecfb4a_kickblast_attribdensity.gif)

## Summed up

Time and time again I've had the need for Kickblast. It has replaced a lot of the manual labour that comes from having to re-create different types of filters. Writing this post made me realise how useful this asset could be for creating UI interfaces with variation and glitchy effects. Kickblast works well in combination with other presets—for example when creating dissolve-like effects.
