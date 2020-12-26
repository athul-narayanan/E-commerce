import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories : any = [];
  @Input() category;
  constructor(private categoryService :CategoryService) { 
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit(): void {
  }

}
