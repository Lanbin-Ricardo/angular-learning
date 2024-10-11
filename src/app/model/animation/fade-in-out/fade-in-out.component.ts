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
  constructor(
  ){}

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

  currentMarkDownLine: number = -1;
  markdownLines: string[] = [];
  clickMarkDownFadeInLineByLine() {
    let mdData = this.textData.map((x) => x.value).join("\n");
    this.markdownLines = this.disassembleMarkdown(mdData);
    this.markDownFadeInOut();
  }

  markDownFadeInOut() {
    let intervalId = setInterval(() => {
      this.currentMarkDownLine = (this.currentMarkDownLine + 1);
      console.log(intervalId);
      if(this.currentMarkDownLine > this.html.length) {
        clearInterval(intervalId);
      }
    }, 300);
  }

  readonly tableRegex = /(^\|.*\|.*\|)|(^\|.*---.*\|)/;
  disassembleMarkdown(mdData: string) {
    const lines = mdData.split('\n');
    const result = [];
    let buffer = '';
    let inCodeBlock = false;
    let inTableBlock = false;
    for(let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      // if line is in code block
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        // in case it's the last line of code block
        if(!inCodeBlock) {
          buffer += line + '\n';
          result.push(buffer);
          buffer = '';
          continue;
        }
      }
      if (inCodeBlock) {
        buffer += line + '\n';
        continue;
      }


      // if line is in table block
      let match = line.match(this.tableRegex);
      if(match != undefined && match[0] == line) {
        inTableBlock = true;
        if(i == lines.length - 1) {
          buffer += line + '\n';
          result.push(buffer);
          break;
        } else {
          let nextLine = lines[i+1].trim();
          let nextLineMatch = nextLine.match(this.tableRegex);
          if(nextLineMatch != undefined && nextLineMatch[0] == nextLine) {
            buffer += line + '\n';
            continue;
          } else {
            buffer += line + '\n';
            result.push(buffer);
            buffer = '';
            continue;
          }
        }
      }

      // if line is normal code
      result.push(line);
    }

    // in case code block is not ended with ```
    if (buffer) {
      result.push(buffer);
    }

    return result;
  }



  textData: any[] = [
    {name: 'java', value:"This a java code block.\n ```java\n System.out.println(\"Hello World\")\n```\n It's very simple, isn't?"},
    {name: 'mermaid1', value: "<h1>This is a sequence diagram \n ```mermaid\nsequenceDiagram\nparticipant Alice\nparticipant Bob\nAlice->>Bob: Hello Bob!\nBob-->>Alice: Hi Alice!\nAlice->>Bob: How are you?\nBob-->>Alice: I'm fine, thanks.\n```"},
    {name: 'table1', value: "A Markdown Table with Rational Data\n | Fraction | Decimal |\n|---|---|\n| 1/2 | 0.5 |\n| 2/3 | 0.66666667 |\n| 3/4 | 0.75 |\n| 4/5 | 0.8 |\n| 5/6 | 0.83333333 |\n"}
  
  ]
}
