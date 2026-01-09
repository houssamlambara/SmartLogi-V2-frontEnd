import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard {
  stats = [
    { label: 'Total Colis', value: '1,284', change: '+12%', icon: 'package' },
    { label: 'En Livraison', value: '43', change: '+5%', icon: 'truck' },
    { label: 'Livreurs Actifs', value: '12', change: '0%', icon: 'users' },
    { label: 'Revenu Mensuel', value: '15,400 MAD', change: '+18%', icon: 'trending-up' }
  ];

  recentActivities = [
    { id: '#PK-8842', client: 'Ahmed Amine', status: 'En préparation', date: 'Il y a 10 min', amount: '120 MAD' },
    { id: '#PK-8841', client: 'Sara Benani', status: 'Livré', date: 'Il y a 45 min', amount: '85 MAD' },
    { id: '#PK-8840', client: 'Karim Tazi', status: 'En livraison', date: 'Il y a 1h', amount: '210 MAD' },
    { id: '#PK-8839', client: 'Laila Mansouri', status: 'Livré', date: 'Il y a 3h', amount: '150 MAD' }
  ];

  getStatusClass(status: string) {
    switch (status) {
      case 'Livré': return 'bg-emerald-100 text-emerald-700';
      case 'En livraison': return 'bg-blue-100 text-blue-700';
      case 'En préparation': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
