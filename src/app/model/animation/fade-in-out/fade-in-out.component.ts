import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fade-in-out',
  templateUrl: './fade-in-out.component.html',
  styleUrl: './fade-in-out.component.css',
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity:1})),
      state('out', style({opacity:0})),
      transition('in => out', [
        animate('2000ms ease-in')
      ]),
      transition('out => in', [
        animate('2000ms ease-out')
      ])
    ])
  ]
})
export class FadeInOutComponent {
  isOpen:boolean = false;

  html: string[] = [
    '<h1>Basel III: A Global Regulatory Framework</h1>',
    "<p>Basel III is a set of international regulatory standards for banks. It aims to strengthen the banking sector's capital requirements, leverage ratio, and liquidity. These measures are designed to make banks more resilient to financial crises and protect the global economy.</p>",
    '<h2>Key Components of Basel III:</h2>',
    '<ul>',
    '<li>**Capital Requirements:** Banks must maintain a higher level of capital to absorb losses. This includes common equity tier 1 (CET1) capital, tier 1 capital, and tier 2 capital.</li>',
    '<li>**Leverage Ratio:** Banks are required to have a minimum leverage ratio, which is the ratio of their total assets to their total equity capital.</li>',
    '<li>**Liquidity Standards:** Banks must maintain sufficient liquid assets to meet their short-term funding needs. This includes the liquidity coverage ratio (LCR) and the net stable funding ratio (NSFR).</li>',
    '</ul>',
    '<p>Basel III has been implemented gradually by various countries. Its goal is to create a safer and more stable financial system worldwide.</p>'
  ]


  currentLine: number = -1;
  fadeInOut() {
    let intervalId = setInterval(() => {
      this.currentLine = (this.currentLine + 1);
      console.log(intervalId);
      if(this.currentLine > this.html.length) {
        clearInterval(intervalId);
      }
    }, 300);
  }

  clickFadeInLineByLine() {
    this.fadeInOut();
  }
}
