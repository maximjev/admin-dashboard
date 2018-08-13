import {inject, TestBed} from '@angular/core/testing';
import {OauthTokenStorageService} from "./oauth-authentication-provider.service";


describe('OauthTokenStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OauthTokenStorageService]
    });
  });

  it('should be created', inject([OauthTokenStorageService], (service: OauthTokenStorageService) => {
    expect(service).toBeTruthy();
  }));
});
