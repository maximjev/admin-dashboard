package com.transaction.backend.restapi;


import com.transaction.backend.repo.UserRepository;
import com.transaction.backend.restapi.dto.PasswordResetDTO;
import com.transaction.backend.service.PasswordResetHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.notFound;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetHandler resetHandler;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("request")
    public ResponseEntity<?> resetRequest(@RequestBody PasswordResetDTO resetDTO) {
        return userRepository.findByUsername(resetDTO.getName()).map(user -> {

            if(!user.getEmail().equals(resetDTO.getEmail())) {
                return new ResponseEntity<>("NAME_AND_EMAIL_MISMATCH", HttpStatus.BAD_REQUEST);
            }

            resetHandler.sendResetMail(user);

            return ok(resetDTO);
        })
                .orElseGet(() -> notFound().build());
    }

    @PostMapping("token")
    public ResponseEntity<?> token(@RequestBody PasswordResetDTO resetDTO) {
        return userRepository.findByUsername(resetDTO.getName()).map(user -> {
            if(user.getResetCode().equals(resetDTO.getCode())) {
                return ok(resetDTO);
            } else {
                return new ResponseEntity<>("INVALID_TOKEN", HttpStatus.BAD_REQUEST);
            }
        }).orElseGet(() -> notFound().build());
    }


    @PostMapping("reset")
    public ResponseEntity<?> reset(@RequestBody PasswordResetDTO resetDTO) {
        return this.userRepository.findByUsername(resetDTO.getName()).map(user -> {
            user.setPassword(passwordEncoder.encode(resetDTO.getPassword()));

            user.setResetCode(null);
            userRepository.save(user);
            return ok().build();
        }).orElseGet(() -> notFound().build());
    }
}
