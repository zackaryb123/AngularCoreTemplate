import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-case-article',
  templateUrl: './case-article.component.html',
  styleUrls: ['./case-article.component.scss']
})
export class CaseArticleComponent implements OnInit {
  @Input() case;
  @Input() index;

  currentSlide = 1;
  maxSlides = 3;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goCase(id) {
    return this.router.navigateByUrl(`/case:${id}`);
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 1    ? this.currentSlide : this.currentSlide - 1;
    console.log(this.currentSlide);
  }

  nextSlide() {
    this.currentSlide =  this.currentSlide === this.maxSlides ? this.currentSlide : this.currentSlide + 1;
    console.log(this.currentSlide);
  }
  solve() {
    console.log('Solve');
  }
}
