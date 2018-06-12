import {AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
    selector: '[appInButtonLoader]'
})
export class InButtonLoaderDirective implements OnChanges, OnInit {

    @Input('appInButtonLoader') waiting: boolean;

    loader;

    constructor(private renderer: Renderer2, private el: ElementRef) {
        this.loader = this.renderer.createElement('div');
        this.renderer.addClass(this.loader, 'loader-container');
        this.renderer.addClass(this.loader, 'is-in-button');
        this.renderer.addClass(this.loader, 'loader-in-button');

        let circle = this.renderer.createElement('div');
        this.renderer.addClass(circle, 'loading-spinner');

        this.renderer.appendChild(this.loader, circle);
    }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['waiting'] && !changes['waiting'].firstChange) {
            if (this.waiting) {
                this.el.nativeElement.disabled = true;
                this.renderer.setStyle(this.el.nativeElement.children[0], 'opacity', '0');
                this.renderer.appendChild(this.el.nativeElement, this.loader);
            } else {
                this.el.nativeElement.disabled = false;
                this.renderer.setStyle(this.el.nativeElement.children[0], 'opacity', '1');
                this.renderer.removeChild(this.el.nativeElement, this.loader);
            }
        }
    }

}
