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
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goCase(id) {
    return this.router.navigateByUrl(`/case:${id}`);
  }

}
