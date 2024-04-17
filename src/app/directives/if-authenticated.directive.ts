import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {
  protected destroyed$ = new Subject<void>();
  private hasContent = false;

  constructor(
    protected authSrv: AuthService,
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.authSrv.currentUser$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.updateView();
      })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  protected updateView() {
    if (this.authSrv.isLoggedIn()) {
      if (!this.hasContent) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasContent = true;
      }
    } else {
      this.viewContainer.clear();
      this.hasContent = false;
    }
  }
}
