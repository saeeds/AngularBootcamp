import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PaginatorComponent implements OnInit {
  @Input() numberOfPages: number;
  @Output() pageChanged = new EventEmitter();

  currentPage = 0;

  constructor() {}

  ngOnInit(): void {}

  checkWindowIndex(index: number) {
    return Math.abs(this.currentPage - index) < 5;
  }

  onPageChangedClick(page) {
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }
}
