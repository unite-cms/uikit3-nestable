
import sortable from 'uikit/src/js/components/sortable';
import {getPos, includes, each, append, toNodes, within} from 'uikit-util';

let originalMove = sortable.methods.move;
let originalConnected = sortable.methods.connected;

let nestable = {
    nestableMargin: 50,
    props: {
        nestable: Boolean
    },
    data: {
        nestable: false
    },
    connected() {
        if(this.nestable) {

            // Create nestable sortable group with the same props as this sortable.
            let propsArray = Object.keys(this.$props).map((key) => { return key + ':' + this.$props[key]; });
            each(this.$el.children, (child) => {
                if(typeof child == 'object') {
                    child.querySelector('[uk-sortable]') || append(child, '<div uk-sortable="' + propsArray.join(';') + '"></div>');
                }
            });
        }

        // Call original connected method.
        originalConnected ? originalConnected.call(this) : null;
    },
    methods: {

        // Move the item inside the nestable tree (called by move()).
        nestedMove(source, destination) {
            if(!destination) {
                return false;
            }

            destination = this.getSortable(destination);
            if(destination) {
                if(source != destination) {
                    destination.insert(this.placeholder);
                    if (!includes(this.touched, destination)) {
                        this.touched.push(destination);
                    }
                    return true;
                }
            }

            return false;
        },

        move(e) {

            const target = e.type === 'mousemove' ? e.target : document.elementFromPoint(this.pos.x - document.body.scrollLeft, this.pos.y - document.body.scrollTop);
            const sortable = this.getSortable(target);

            if(this.drag && sortable) {

                if(this.drag.getBoundingClientRect().left - target.getBoundingClientRect().left > this.$options.nestableMargin) {

                    // We are dragging inside the current element
                    if(target.previousElementSibling) {
                        if(this.nestedMove(sortable, target.previousElementSibling.querySelector('[uk-sortable]'))) {
                            return;
                        }
                    }
                    
                    // We are dragging into another item's child group
                    else if(target.parentElement && (this.getSortable(this.placeholder) !== this.getSortable(target.parentElement))) {
                        if(this.nestedMove(sortable, target.parentElement.querySelector('[uk-sortable]'))) {
                            return;
                        }
                    }
                }

                // We are dragging the element to another branch of the tree
                else if(target !== this.placeholder) {
                    if(this.nestedMove(this.getSortable(this.placeholder), target)) {
                        return;
                    }
                }
            }

            // Handle original move
            originalMove ? originalMove.call(this, e) : null;
        }
    }
};

// If global UIkit instance is available, add mixin.
if(typeof UIkit !== 'undefined') {
    UIkit.mixin(nestable, 'sortable');
}

// For ES6 module compatibility export nestable
export default nestable;
