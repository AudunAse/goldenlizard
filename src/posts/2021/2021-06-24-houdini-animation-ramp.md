---
draft: false
title: 'Houdini Animation Ramp'
description: 'With this Houdini asset, you can automatically animate a ramp over any 0-1 range.'
tags: ['houdini']
date: 2021-06-24
---

*Migrated from Affex.no.* PS: This post was written in 2021.

Many FX artists hate to do custom animation. I know I do! I'm always interested in finding ways to let Houdini animate for me—it's procedural for a reason, right? It also makes it way cleaner and easier to apply to other shots, or in the case that someone else has to un-web your Houdini setup. This is one of the ways I tend to animate gradients across a pre-defined distance. This gives the freedom of applying procedural animation to anything you like—without placing a single keyframe.

**Download the asset:**

<a href="https://drive.google.com/uc?export=download&id=1pgvyQsbrft1zm36PylA7lUSYVGXI3RYP" class="button" data-button-variant="primary" target="_blank" rel="noopener noreferrer">Download Auto Ramp asset</a>

![Auto Ramp showcase](/assets/images/blog/automation/5ffe65739be53b46670f3835_autoshowcase.gif)

## Scenario

Let's say you're creating a shock-wave, and you need to animate an emission ring from the center of an explosion. You could create a circle and create a custom animation for the scale, but that wouldn't be very procedural. Every time you need a new explosion you'd have to manually go in and re-animate or re-time your shock-wave. Instead, I'd much rather input a start frame and let Houdini animate by itself.

<video controls width="100%" muted loop playsinline preload="metadata">
  <source src="https://audunase.com/assets/mp4/autoramp_explosion.mp4" type="video/mp4">
</video>

## Automation is great!

This setup may seem underwhelming at first, as it's basically just **one attribute VOP**. But the power and simplicity makes up for the lack of tech. These kinds of techniques are by far my most favourite aspects of any FX setup. The idea here is to create what I call a "map" attribute, which is simply a value from 0–1. As you know, anything can be fitted into that range. Then you feed your data over this range, over time.

The settings for the "autoramp" attribute VOP take the attribute "map", and fit it into a 0–1 animation controlled by "Animation Curve" (your timing). Then it runs the values from "Animated Value" through that curve based on your input "Start Frame" / "End Frame". Simple! I've used this type of setup on a ton of real feature film productions.

![Autoramp attribute VOP settings](/assets/images/blog/animationramp/60cfde36771e48063c6897c8_autoramp_settings.png)

<iframe src="https://player.vimeo.com/video/565834663" width="640" height="360" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Houdini Animation Ramp - Test"></iframe>

<video controls width="100%" muted loop playsinline preload="metadata">
  <source src="https://audunase.com/assets/mp4/anim_ramp.1.mp4" type="video/mp4">
</video>

<video controls width="100%" muted loop playsinline preload="metadata">
  <source src="https://audunase.com/assets/mp4/rampExamples.mp4" type="video/mp4">
</video>

<video controls width="100%" muted loop playsinline preload="metadata">
  <source src="https://audunase.com/assets/mp4/cubeGrow.mp4" type="video/mp4">
</video>

<iframe width="640" height="360" src="https://www.youtube.com/embed/hXy9hnsbEsc" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**TIP:** If your map attribute is a frame range as well—for example `@map = fit($F, 1, 100, 0, 1);`—you can animate values over time too. The "compass" element in my little UI experiment has its size animated by the "autoramp" node as well, which is great for more motion-graphics-looking animations.

If you put this in a for loop you can use it to drive ripples through a surface. No need for that ripple solver—unless your ripples are a hero element. Even though I'm distorting an actual piece of geometry in one example, you could do this in the shader, or render a pass to distort your surface with. Pretty handy!

## Summed up

I feel like CHOPs could somehow be fed into this to control the animation as well, and with CHOPs we could allow for more detailed animations or animation presets. After Effects people use animation curves to create fresh flops and swoops that could be done in Houdini as well. Relatively simple!

What I did find from my UI compass animation test is that once you have several nodes creating various animations it gets a little messy in your scene. Using a subnet could clean some of this up. Or even better, find a way to re-use the same node but with different timings stored as attributes. This way animating becomes more a process of inputting your frames and watching it unfold. I like it!

For more on getting those saucy UI-style animations on mobile and web, see [Getting those saucy UI animations for mobile & web](https://uxdesign.cc/getting-those-saucy-ui-animations-for-mobile-web-40ceff492e60) on UX Design.
