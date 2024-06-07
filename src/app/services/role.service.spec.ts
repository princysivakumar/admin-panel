import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let service: RoleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoleService]
    });
    service = TestBed.inject(RoleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch roles', () => {
    const dummyRoles = [
      { id: '1', name: 'Admin', description: 'Administrator role' },
      { id: '2', name: 'User', description: 'Regular user role' }
    ];

    service.getRoles().subscribe(roles => {
      expect(roles.length).toBe(2);
      expect(roles).toEqual(dummyRoles);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRoles);
  });
});
