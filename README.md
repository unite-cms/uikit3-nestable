# Nestable option for uikit3 sortable

![Screenshot](https://api.monosnap.com/rpc/file/download?id=f4aFvH2Ghh1SVWpzy8fcU0DqLUo8t4)

Uses UIkit.mixin to add a **nestable** option to the uikit3 sortable component.

**NOT FULLY PRODUCTION READY!** There are some animation problemes at the moment, that makes it sometimes hard to drop an item as a child.

## Installation 

    yarn add uikit3-nestable

    # or 

    npm install uikit3-nestable

## Usage

After including node_moduels/uikit3-nestable/dist/js/nestable.js, you have a new sortable option: 

    <div uk-sortable="handle: .uk-sortable-handle; nestable: true"></div>