import {inject, TestBed} from '@angular/core/testing';
import {OauthAuthenticationProviderService} from "./oauth-token-storage.service";


describe('OauthAuthenticationProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OauthAuthenticationProviderService]
    });
  });

  it('should be created', inject([OauthAuthenticationProviderService], (service: OauthAuthenticationProviderService) => {
    expect(service).toBeTruthy();
  }));
});
