---
draft: false
title: 'Houdini Notes'
description: 'This is where I''ll chuck any notes I''d like to keep, created as my space to re-visit when needed. '
tags: ['houdini', 'tips']
date: 2026-02-06
showToc: true
tips:
  - title: 'Parameter spreadsheet filter order'
    anchor: 'parameter-spreadsheet'
  - title: 'Probability based attribute'
    anchor: 'probability-based-attribute'
  - title: 'Use a button to randomise attributes'
    anchor: 'use-a-button-to-randomise-attributes'
---

This is a post gathering small notes I write down to remember in the future. Stuff I find handy, maybe you will too. I dunno. Have a browse if you like!

## Parameter spreadsheet

The Parameter spreadsheet is not a panel I use a ton in Houdini, but there's one trick I learned along the way for using it to control a large number of settings for many nodes. 

What I primarily use it for is to turn on or off the "ogl_enablelight" checkbox. 

`It's the checkbox that enables or disables lights in the viewport.`

I like to have one light that acts as the viewport light, leaving render lights off in the viewport.

![ogl_enablelight_setting_houdini](/assets/images/blog/quicktips/ogl_enablelightsetting.png)

> Protip, if you start from the right and filter by "param mask", then the "object type" before using a wildcard for the "Op Mask" you avoid waiting for ages for the list to populate.


---

## Probability based attribute

Sometimes it's helpful to have a probability slider based on traditional percentage. 

At least I like to use it. 

The following snippet will randomly assign a 1 or 0 based on a probability slider. 
`It's normalized from 0 to 1 - 0.5 being 50% likely to be true.`

```
float prob = chf("probability");
float seed = chf("seed");

// rand() returns a value between 0.0 and 1.0
float random_val = rand(@ptnum + seed);

// Assign 1 if the random value is below the threshold, 0 otherwise
i@trigger = (random_val < prob) ? 1 : 0;
```

---


## Use a button to randomise attributes

This is a small python snippet I use a lot when creating digital assets in Houdini to get a button to randomise a seed value.

It's simple, but adds a touch of convenience to the digital assets.

![Random seed button in Houdini](/assets/images/blog/houdininotes/randomseedbutton.png)

Use the following script in the buttons "Callback Script" set to Python.

`Note that this button will specifically target the integer parameter I created called "seed", I do this since I like to see the result from the button press`
```py
import random; kwargs['node'].parm('seed').set(random.randint(0, 99999))
```

---

Adding more over time...

