import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour *ngFor, *ngIf
import { FormsModule } from '@angular/forms';   // Pour [(ngModel)]
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // <--- Importi hethom bch l Formulaire yemchi
  templateUrl: './app.html',  // <--- Kima 9olt inti
  styleUrl: './app.scss'      // <--- Kima fil screenshot
})
export class App implements OnInit {
  
  title = 'milsa-admin';
  
  // Liste des produits
  products: any[] = [];

  // Objet Formulaire
  newProduct: any = {
    code_parfum: '',
    nom_parfum: '',
    categorie: 'Homme',
    genre: 'Homme',
    image_url: '',
    dispo_15ml: false, prix_15ml: 0,
    dispo_30ml: false, prix_30ml: 0,
    dispo_70ml: false, prix_70ml: 0
  };

  // Lien Backend (Port 3000)
apiUrl = 'https://milsa-backend.onrender.com/api/products';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllProducts();
  }

  // --- GET ---
  getAllProducts() {
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.products = data;
    });
  }

  // --- POST ---
  onSubmit() {
    this.http.post(this.apiUrl, this.newProduct).subscribe({
      next: (res) => {
        alert('✅ Produit Ajouté !');
        this.getAllProducts(); // Refresh liste
        // Faragh el formulaire
        this.newProduct = { code_parfum: '', nom_parfum: '', categorie: 'Homme', genre: 'Homme', image_url: '', dispo_15ml: false, prix_15ml: 0, dispo_30ml: false, prix_30ml: 0, dispo_70ml: false, prix_70ml: 0 };
      },
      error: (err) => {
        alert('❌ Erreur! Thabet fil Code Parfum (balekchi deja mawjoud).');
        console.error(err);
      }
    });
  }

  // --- DELETE ---
  deleteProduct(code: string) {
    if(confirm('Met2aked t7eb tfassa5 ' + code + ' ?')) {
      this.http.delete(`${this.apiUrl}/${code}`).subscribe(() => {
        this.getAllProducts();
      });
    }
  }
}