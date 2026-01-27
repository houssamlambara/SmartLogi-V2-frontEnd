import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Login } from './login.page';
import { AuthService } from '../../../../core/services/auth.service';
import { toast } from 'ngx-sonner';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'isLoggedIn',
      'getUserRole',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    spyOn(toast, 'success');
    spyOn(toast, 'error');

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty email and password', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });

  describe('ngOnInit', () => {
    it('should redirect to home if user is already logged in', () => {
      authService.isLoggedIn.and.returnValue(true);

      component.ngOnInit();

      expect(authService.isLoggedIn).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should not redirect if user is not logged in', () => {
      authService.isLoggedIn.and.returnValue(false);

      component.ngOnInit();

      expect(authService.isLoggedIn).toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    beforeEach(() => {
      component.email = 'test@example.com';
      component.password = 'password123';
    });

    it('should call authService.login with correct credentials', () => {
      const mockResponse = { data: { token: 'mock-token' }, roleName: 'CLIENT' };
      authService.login.and.returnValue(of(mockResponse));
      authService.getUserRole.and.returnValue('CLIENT');

      component.login();

      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should navigate to admin dashboard for GESTIONNAIRE role', () => {
      const mockResponse = { data: { token: 'mock-token' }, roleName: 'GESTIONNAIRE' };
      authService.login.and.returnValue(of(mockResponse));
      authService.getUserRole.and.returnValue('GESTIONNAIRE');

      component.login();

      expect(toast.success).toHaveBeenCalledWith('Login successful');
      expect(router.navigate).toHaveBeenCalledWith(['/admin/dashboard']);

    });

    it('should navigate to home for CLIENT role', () => {
      const mockResponse = { data: { token: 'mock-token' }, roleName: 'CLIENT' };
      authService.login.and.returnValue(of(mockResponse));
      authService.getUserRole.and.returnValue('CLIENT');

      component.login();

      expect(toast.success).toHaveBeenCalledWith('Login successful');
      expect(router.navigate).toHaveBeenCalledWith(['/']);

    });

    it('should navigate to colis page for LIVREUR role', () => {
      const mockResponse = { data: { token: 'mock-token' }, roleName: 'LIVREUR' };
      authService.login.and.returnValue(of(mockResponse));
      authService.getUserRole.and.returnValue('LIVREUR');

      component.login();

      expect(toast.success).toHaveBeenCalledWith('Login successful');
      expect(router.navigate).toHaveBeenCalledWith(['/colis']);

    });

    it('should navigate to home for unknown role', () => {
      const mockResponse = { data: { token: 'mock-token' }, roleName: 'UNKNOWN_ROLE' };
      authService.login.and.returnValue(of(mockResponse));
      authService.getUserRole.and.returnValue('UNKNOWN_ROLE');

      component.login();

      expect(toast.success).toHaveBeenCalledWith('Login successful');
      expect(router.navigate).toHaveBeenCalledWith(['/']);

    });

    it('should show error toast when login fails', () => {
      const mockError = {
        error: { message: 'Invalid credentials' },
      };
      authService.login.and.returnValue(throwError(() => mockError));

      component.login();

      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');

    });

    it('should show default error message when error has no message', () => {
      const mockError = { error: {} };
      authService.login.and.returnValue(throwError(() => mockError));

      component.login();

      expect(toast.error).toHaveBeenCalledWith('Something went wrong!');

    });
  });

  describe('OAuth login methods', () => {
    it('should redirect to Google OAuth URL', () => {
      const originalLocation = window.location.href;
      delete (window as any).location;
      window.location = { href: '' } as any;

      component.loginWithGoogle();

      expect(window.location.href).toBe('http://localhost:8080/oauth2/authorization/google');

      window.location.href = originalLocation;
    });

    it('should redirect to Facebook OAuth URL', () => {
      const originalLocation = window.location.href;
      delete (window as any).location;
      window.location = { href: '' } as any;

      component.loginWithFacebook();

      expect(window.location.href).toBe('http://localhost:8080/oauth2/authorization/facebook');

      window.location.href = originalLocation;
    });
  });
});
