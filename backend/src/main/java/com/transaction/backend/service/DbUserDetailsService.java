package com.transaction.backend.service;

import com.transaction.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DbUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public DbUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .map(user -> {
                    return new User(
                            user.getUsername(),
                            user.getPasswordHash(),
                            true,
                            true,
                            true,
                            true,
                            List.of(new SimpleGrantedAuthority(user.getRole().name()))
                    );
                }).orElseThrow(() -> new UsernameNotFoundException("User with username " + username + " not found"));
    }
}
