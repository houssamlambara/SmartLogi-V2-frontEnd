import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
  hasUnsavedChanges?: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    if (component.canDeactivate) {
      return component.canDeactivate();
    }

    if (component.hasUnsavedChanges && component.hasUnsavedChanges()) {
      return confirm(
        'Vous avez des modifications non sauvegardées. Voulez-vous vraiment quitter cette page ?'
      );
    }

    return true;
  }
}
