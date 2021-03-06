import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
})
export class ShoppingItemComponent implements OnInit {
  shoppingItemList: Item[] = [];
  selectedItem: Item;
  toggleForm = false;
  constructor(private dataService: DataService) {}

  getItems() {
    this.dataService.getShoppingItems().subscribe((data) => {
      this.shoppingItemList = data;
    });
  }

  ngOnInit(): void {
    this.getItems();
  }

  addItem(form) {
    let newItem: Item = {
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: false,
    };

    this.dataService.addShoppingItem(newItem).subscribe((item) => {
      console.log('item', item);
      this.getItems();
    });
  }

  deleteItem(id) {
    this.dataService.deleteShoppingItem(id).subscribe((item) => {
      if (item['n'] === 1) {
        for (var i = 0; i < this.shoppingItemList.length; i++) {
          if (id === this.shoppingItemList[i]._id) {
            this.shoppingItemList.splice(i, 1);
          }
        }
      }
    });
  }
  editForm(editForm) {
    let newItem: Item = {
      _id: this.selectedItem._id,
      itemName: editForm.value.itemName,
      itemQuantity: editForm.value.itemQuantity,
      itemBought: editForm.value.itemBought,
    };

    this.dataService.updateShoppingItem(newItem).subscribe((item) => {
      this.getItems();
      this.toggleForm = !this.toggleForm;
    });
  }

  showEditForm(item) {
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }

  updateItem(item) {
    item.itemBought = !item.itemBought;
    this.dataService.updateShoppingItem(item).subscribe((item) => {
      this.getItems();
      // this.toggleForm = !this.toggleForm;
    });
  }
}
