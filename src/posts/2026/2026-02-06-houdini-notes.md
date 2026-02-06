---
draft: false
title: 'Houdini Notes'
description: 'This is where I''ll chuck any notes I''d like to keep, created as my space to re-visit when needed. '
tags: ['houdini', 'tips']
date: 2026-02-06
---

Small notes I write down to remember in the future. Stuff I find handy, maybe you will too. I dunno. Have a browse if you like!

#### Overview:

**INTERFACE:** 
[Parameter spreadsheet](#parameter-spreadsheet)


## Parameter spreadsheet

The Parameter spreadsheet is not a panel I use a ton in Houdini, but there's one trick I learned along the way for using it to control a large number of settings for many nodes. 

What I primarily use it for is to turn on or off the "ogl_enablelight" checkbox. 

`It's the checkbox that enables or disables lights in the viewport.`

I like to have one light that acts as the viewport light, leaving render lights off in the viewport.

![ogl_enablelight_setting_houdini](/assets/images/blog/quicktips/ogl_enablelightsetting.png)

> Protip, if you start from the right and filter by "param mask", then the "object type" before using a wildcard for the "Op Mask" you avoid waiting for ages for the list to populate.

---

In progress...

