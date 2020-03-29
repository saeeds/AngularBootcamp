import { Component, OnInit } from "@angular/core";
import { NewsApiService, Article } from "../news-api.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-na-article-list",
  templateUrl: "./na-article-list.component.html",
  styleUrls: ["./na-article-list.component.css"]
})
export class NaArticleListComponent implements OnInit {
  articles: Article[];
  numberOfPages$: Subject<number>;
  constructor(private newsApiService: NewsApiService) {}

  ngOnInit(): void {
    this.newsApiService.pagesOutput.subscribe(articles => {
      this.articles = articles;
    });
    this.numberOfPages$ = this.newsApiService.numberOfPages;
    this.newsApiService.getPage(1);
  }

  onPageChange(page: number) {
    this.newsApiService.getPage(page + 1);
  }
}
