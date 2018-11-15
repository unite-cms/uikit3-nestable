# Nestable option for uikit3 sortable

![Screenshot](https://api.monosnap.com/rpc/file/download?id=f4aFvH2Ghh1SVWpzy8fcU0DqLUo8t4)

Uses UIkit.mixin to add a **nestable** option to the uikit3 sortable component.

## Installation 

    yarn add uikit3-nestable

    # or 

    npm install uikit3-nestable

## Usage

After including **node_moduels/uikit3-nestable/dist/js/nestable.js**, you have a new sortable option: 

```html
    <div uk-sortable="handle: .uk-sortable-handle; nestable: true"></div>
````

In order to make nestable work, you must add at least the following css code: 

```css
    /* nested sortable groups indention */            
    .uk-sortable .uk-sortable,
    .uk-sortable-drag .uk-sortable {
        margin-left: 50px;
    }

    /* nested sortable groups inner padding to the parent element */
    .uk-sortable .uk-sortable:not(.uk-sortable-empty),
    .uk-sortable .uk-sortable-drag:not(.uk-sortable-empty) {
        padding-top: 20px;
    }

    /* remove uk-sortable-empty min-height sort nested sortables */
    .uk-sortable .uk-sortable.uk-sortable-empty,
    .uk-sortable-drag .uk-sortable.uk-sortable-empty {
        min-height: 0;
    }
```

To make it easier to sort, you should make the placeholder visible. Something like this (taken from uikit2): 

```css
    /* Custom placeholder styles, makes it easier to see the current position */
    .uk-sortable-placeholder {
        position: relative;
        opacity: 1;
    }

    .uk-sortable-placeholder > * {
        opacity: 0;
    }

    .uk-sortable-placeholder:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px dashed #E5E5E5;
        opacity: 1;
    }
```

A working example can be found in tests/index.html
Please see tests/index.html