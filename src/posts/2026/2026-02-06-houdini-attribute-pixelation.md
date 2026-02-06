---
draft: false
title: 'Houdini Attribute Pixelation'
description: 'One useful method of adding stylization or coloration where quantized colours are wanted.'
tags: ['houdini', 'tips']
date: 2026-02-06
---

I've recently explored a way of "pixelating" or "quantizing" values in Houdini. It's useful for creating value steps based on an input attribute. In this example I'll be using position on a heightfield to colorize it in interesting ways.

A brief overview of what it looks like:

`6 Steps`
![6 steps color quantization](/assets/images/blog/quantize/quantize_6_steps.png)
`12 Steps`
![12 steps color quantization](/assets/images/blog/quantize/quantize_12_steps.png)
`32 Steps`
![32 steps color quantization](/assets/images/blog/quantize/quantize_32_steps.png)

Quite useful when you're looking for a more stylized approach to coloring terrains, for example. Quantization is a popular technique to get that retro vibe.

To expand on this, you could even quantize attributes. So let's say you create some noise—you could break those values into steps as well for more detail. A couple of examples below; I don't have much time to dig into it.

![Quantized slump-style terrain](/assets/images/blog/quantize/quantizeSlump.png)

![Quantized green terrain](/assets/images/blog/quantize/quantizeGreen.png)

If you want to give this a shot, import the following code.

<a href="http://goldenlizard.io/assets/uti/AttributePixelation.uti" class="button" data-button-variant="primary" target="_blank" rel="noopener noreferrer">Download</a>

NB: This is a .UTI file created by the script as seen here: [Store selected nodes](https://goldenlizard.io/blog/store-selected-nodes-using-python/)
If you just want to import it, use this code from a python shelf

```py
# -----------------------------------------------
# Read .uti file created by writepydump.py
# -----------------------------------------------
import os

core = ('/tmp/hdump/')  # Change this depending on where you want to store your files.

def getCurrentNetworkTab():
    network_tabs = [t for t in hou.ui.paneTabs() if t.type() == hou.paneTabType.NetworkEditor]
    if network_tabs:
        for tab in network_tabs:
            if tab.isCurrentTab():
                return tab
    return None

exec_network = getCurrentNetworkTab()

if not exec_network:
    hou.ui.displayMessage("No network tabs found to load into.", severity=hou.severityType.Error)

file = hou.ui.selectFile(start_directory=core, title="Pick dump to import", collapse_sequences=False)
path = os.path.expandvars(file)
parent = exec_network.pwd()

# Load from selected file.
parent.loadItemsFromFile(path)
```
