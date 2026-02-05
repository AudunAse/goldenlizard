---
draft: false
title: 'Store selected nodes using Python'
description: 'A Python script that stores selected nodes into handy .uti files in Houdini.'
tags: ['houdini', 'scripts']
date: 2021-01-08
---
 
*Migrated from Affex.no.* PS: This post was written in 2021.

Houdini has a lot of moving parts. Sometimes it's hard to keep control over the stuff you've done. I've had the need again and again to re-use parts of a setup that I liked in older hip files. I would then have to dig around to find the correct file that had a certain workflow I'd like to use again. So I created a script that can grab any nodes you select and store them somewhere for later use. Then whenever you need it again, you click a button and grab it. I've come to use this script every single day—it keeps me from having to recreate essential setups.

**Download the shelf tool:**

<a href="https://drive.google.com/uc?export=download&id=1GvtiY87RdbyGRGaKgWLcMBGam7vPADq9" class="button" data-button-variant="primary" target="_blank" rel="noopener noreferrer">Download Store Nodes shelf</a>

## The idea

Two parts:

1. Select the nodes you want to store, and save them to disk.
2. Read them back in.

We use a shelf tool to store the script. The files use a **.uti** extension (utility). You can change this—it doesn't really matter what it's called.

![Store selected nodes on the shelf](/assets/images/blog/storeselected/5fff78f841d13d5a6affbdbb_storeselctedonshelf.jpg)

## Quick walkthrough

1. Select the nodes you want to export.

![Select nodes for storage](/assets/images/blog/storeselected/5fff79d11eb6741387476faa_selectforstorage.gif)

2. Click the "Write .uti" icon. A window appears asking for a name. Type a name and click OK. Your file is saved in the location you specified in the script.

![Write .uti](/assets/images/blog/storeselected/5fff7a740c4a280dc1aedb49_writeuti.gif)

3. To import: click the "Read .uti" icon. Select the file and hit accept. The nodes appear the same way they were stored, and they remember how they were connected. It's basically a ctrl+c operation.

![Read .uti](/assets/images/blog/storeselected/5fff7bae9a637495e6773f2c_readuti.gif)

![Read .uti result](/assets/images/blog/storeselected/5fff7c1d0e72e2d73abcc83c_readutifinal.gif)

**Please note:** If you included any HDAs in your export, make sure the same HDAs are installed in the Houdini session you're importing into. If an asset doesn't exist, the import will likely fail. Also, the .uti file won't remember what context the file was written into, and will likely fail if the context is wrong. You could specify this in the name or remember where it belongs.

## Code snippets

**Write selected nodes to a .uti file** (writepydump.py). Change `core` to your desired folder.

```py
# -----------------------------------------------
# Write a part of a Houdini scene to a .uti file.
# -----------------------------------------------
import os

def _write_uti():
    core = ('/tmp/hdump/')  # Change this depending on where you want to store your files.
    ext = ('.uti')

    if not os.path.exists(core):
        os.makedirs(core)

    if len(hou.selectedNodes()) < 1:
        hou.ui.displayMessage("Nothing selected!")
    else:
        name_dump = hou.ui.readInput('Name file!', title="Name input here.")
        name = name_dump[1]
        nodes = hou.selectedNodes()
        path = core + name + ext

        # Write files.
        parent = nodes[0].parent()
        if not all(node.parent() == parent for node in nodes):
            raise Exception("Nodes must have the same parent.")

        parent.saveItemsToFile(nodes, path)

_write_uti()
```

**Example path on Windows** (filepath_example.py)—swap this into `_write_uti()` if you want a user Documents folder:

```py
def _write_uti():
    user = os.getenv('username')
    folder = ('pydump')
    core = ('C:\\Users\\') + user + ('\\Documents\\') + folder + ('\\')
    ext = ('.uti')
```

**Read .uti file** (readpydump.py). Uses the same `core` path as the write script.

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

Also on GitHub: [writepydump.py](https://gist.github.com/Affexno/b9530a0d478af80cca33d782c525929f) · [filepath_example.py](https://gist.github.com/Affexno/168fde736448c377c65d40d6d566aa7b) · [readpydump.py](https://gist.github.com/Affexno/a0ddaed92766bf580038aee74d30543f)

