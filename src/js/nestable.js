
import sortable from 'uikit/src/js/components/sortable';
import {getPos, includes, each, append, toNodes, within} from 'uikit-util';

UIkit.mixin({
    nestableMargin: 40,
    props: {
        nestable: Boolean
    },
    data: {
        nestable: false
    },
    ready() {
        if(this.nestable) {
            each(this.$el.children, (child) => {
                if(typeof child == 'object') {
                    child.ukSortableNestableGroup = append(child, '<div style="margin-left:' + this.$options.nestableMargin + 'px;" uk-sortable="handle: .uk-sortable-handle; nestable: true"></div>');
                }
            });
        }
    },
    methods: {
        move(e) {

            if (!this.drag) {

                if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
                    this.start(e);
                }

                return;
            }

            this.$emit();

            let target = e.type === 'mousemove' ? e.target : document.elementFromPoint(this.pos.x - document.body.scrollLeft, this.pos.y - document.body.scrollTop);

            //console.log(e.target);


            const sortable = this.getSortable(target);
            const previous = this.getSortable(this.placeholder);
            const move = sortable !== previous;

            let move_to_group = false;
            let move_to_child = false;
            let move_to_parent = false;

            // If sortable is not defined, be cannot drop item here.
            if(!sortable) {
                return;
            }

            // If target was moved, we need a previous sortable object
            if(move && !previous) {
                return;
            }            

            // If we move the item to another sortable, this is only allowed 
            // if they have the same group or sortable is a child of previous
            // and previous is nestable
            if(move) {

                if(sortable.group && sortable.group === previous.group) {
                    move_to_group  = true;
                }

                if(sortable.nestable && !within(sortable.$el, this.placeholder)) {
                    if(within(sortable.$el, previous.$el)) {
                        move_to_child = true;
                    }
    
                    if(within(previous.$el, sortable.$el)) {
                        if(this.drag.getBoundingClientRect().left - sortable.$el.getBoundingClientRect().left < this.$options.nestableMargin) {
                            move_to_parent = true;
                        }
                    }
                }

                if(!move_to_group && !move_to_child && !move_to_parent) {
                    return;
                }
            }

            target = sortable.$el === target.parentNode && target || toNodes(sortable.$el.children).filter(element => within(target, element))[0];            

            if (move) {
                previous.remove(this.placeholder);
            } else if (!target) {
                return;
            }

            if(move_to_child) {
                console.log("move_to_child", target);
            }

            if(move_to_parent) {
                console.log("move_to_parent", target);
            }

            sortable.insert(this.placeholder, target);

            if (!includes(this.touched, sortable)) {
                this.touched.push(sortable);
            }
        }
    }
}, 'sortable');