import { trigger, state, style, animate, transition, keyframes } from "@angular/animations";

export const slideDown = trigger('slide-down',[

  transition(':enter',[ //void => *
    style({ opacity: 0, transform: "scaleY(0)" }),
    animate(80, style({ opacity: 1, transform: "scaleY(1)" }))
  ]),

  transition(':leave',[ //* => void
    animate(80, style({ opacity: 0, transform: "scaleY(0)" }))
  ])

])
