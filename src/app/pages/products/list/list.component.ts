import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';

export interface prod {
  idProduct: number;
  nombre: string;
  descripcion: string;
  precioUnidad: number;
  stock: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {


  displayedColumns: string[] = ['Id',
    'Producto',
    //'Imagen', 
    'Descripcion',
    'precioUnidad',
    'Stock',
    'Editar',
    'Eliminar'];


  dataSource = new MatTableDataSource<prod>();

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private router: Router,
    private productService: ProductService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProd()
  }

  getProd() {
    this.productService.productlistAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  getImg(idPost: number) {
    //this.productService.imageListByProduct(idPost).subscribe(data=>{
    //return data.imagen;
    //});
  }

  updateButton(id:any){
    const dialogRef = this.dialog.open(EditComponent, {
      width: '80%',
      data: {id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed '+result);

    });
  }

  verProdducto(idPost: number) {
    //console.log(idPost);
    this.router.navigateByUrl(`/see/${idPost}`)
  }
  getRow(element: any) {
    
  }

  deleteButton(id: any) {
    /*window.alert("esta es una ventana de alerta.... solo muestar un mensaje")
    var resultado = window.confirm('ventana de confirmacion');
    if (resultado === true) {
      window.alert('Okay, si estas seguro.');
    } else {
      window.alert('Pareces indeciso');
    }
    var age = prompt('How old are you?', '100');*/
    let resultado = window.confirm('¿Esta seguro que desea eliminar este producto?');
    if (resultado == true) {
      this.productService.imageDeleteByPost(id).subscribe(data=>{
        
        if (data==null) {
          //console.log('paso');
          this.productService.productDeleteById(id).subscribe(d=>{
            if (d==null) {
              //console.log('paso');
              window.alert('prosucto eliminado con exito')
              this.getProd();
            }
          });
        }
        
      });
    }
  }
  

}
