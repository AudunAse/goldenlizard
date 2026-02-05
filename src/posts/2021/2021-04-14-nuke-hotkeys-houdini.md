---
draft: false
title: 'Nuke hotkeys for Houdini'
description: 'Nuke hotkeys are pretty great. With a bit of Python, we can add them to Houdini as well.'
tags: ['houdini', 'scripts']
date: 2021-04-14
---

*Migrated from Affex.no.* PS: This post was written in 2021.

When I started to learn Nuke, the first thing I picked up was the intuitive hotkeys. You could select nodes, hit a key and instantly get useful nodes already wired up. We can do this in Houdini too. I picked up this trick during my time at The Mill, when I noticed people were using Nuke-like hotkeys in Houdini.

**Download the shelf tool:**

<a href="https://drive.google.com/uc?export=download&id=10HErYD-GMqiqB7BSlaFTChJmFL2bG-u0" class="button" data-button-variant="primary" target="_blank" rel="noopener noreferrer">Download Nuke Hotkeys shelf</a>

## Merge and context-aware nodes

In Nuke, if you select a bunch of nodes and press **M**, it automatically adds a merge node and connects them. Houdini does support something similar by default: select nodes and hold **ALT** and click the output of one of them to connect. But I’d rather have a hotkey. Not only do we avoid clicking that little dot, but we can have Python do a bit extra—and change behaviour based on context.

![Merge on Alt in Houdini](/assets/images/blog/nukehotkeys/5f30abfeeefbca24510dbe3a_mergeonalt.gif)

You set up a shelf tool with the script, then assign a hotkey (e.g. **M** for merge). If you’re in an Attribute VOP instead of SOP context, the same hotkey can create a **Multiply** VOP instead of a merge. The script tries merge first, then multiply. That way one hotkey gives you the right node for the context.

![Adding a hotkey to the shelf](/assets/images/blog/nukehotkeys/5f30b781e0a2e4205929c7ed_addhotkey.gif)

![Using the hotkey](/assets/images/blog/nukehotkeys/5f30b7e04e2694cb18d9162b_usehotkey.gif)

## Code snippets

Full merge script (shelf tool): creates a merge node at the cursor, or a multiply in VOP context, and wires up selected nodes.

```py
# -------------------------------------------------
# Merge selected nodes
# -------------------------------------------------

# Find the current network pane under cursor.
currNetworkPane = hou.ui.paneTabUnderCursor()
currNode = currNetworkPane.pwd()

# If merge fails, add multiply (e.g. in VOP context)
try:
    createdNode = currNode.createNode("merge")
except:
    createdNode = currNode.createNode("multiply")

# Get current position, create node.
cursorPos = currNetworkPane.cursorPosition()
createdNodePos = createdNode.position()
deltaPos = hou.Vector2((cursorPos[0] - createdNodePos[0]) - 0.5, (cursorPos[1] - createdNodePos[1]) - 0.5)

# Move to mouse position.
createdNode.move(deltaPos)

# Check if anything is selected.
if len(hou.selectedNodes()) > 0:
    # Connect all nodes to merge node.
    for idx, node in enumerate(hou.selectedNodes()):
        createdNode.setInput(idx, node)
```

The context-aware bit in isolation (merge vs multiply):

```py
# If merge fails, add multiply
try:
    createdNode = currNode.createNode("merge")
except:
    createdNode = currNode.createNode("multiply")
```

Also on GitHub: [addMerge.py](https://gist.github.com/Affexno/826581807860b2528b14b8b2c7aff8f6) · [snippet](https://gist.github.com/Affexno/4316a1e1a61fb4866721fddf8ac66722)

## Moving forward

I hope you enjoyed this little nugget. I really enjoy writing these smaller workflow-related tips—they’re much faster to do, which means I can do more of them. If you want to expand, you can copy the script, rename it and create as many hotkey operations as you wish. The original post had merge, null, and transform node hotkeys available for download.
