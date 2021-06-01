/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controllers;

import com.restapi.entities.TbMasterUser;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import repository.UserRepository;

/**
 *
 * @author macbookpro
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
// @Transactional
@RequestMapping("/user")
public class UserController {
    
    @Autowired()
    UserRepository userRepository;
    
    @GetMapping()
    public List<TbMasterUser> list(@RequestParam(required = false) String userName) {
        if(userName == null){
            return userRepository.findAll();
        }else{
            // return userRepository.findLikeByUserName(userName); // custome query tidak dengan JPA
            // return userRepository.findByUserNameContaining(userName); // like tapi case sensitive dengan JPA
            // return userRepository.findByUserNameLike(userName); // like tapi kaya where dengan JPA
            return userRepository.findByUserNameIgnoreCaseContaining(userName); // like tidak case sensitive dengan JPA
        }
        
    }
    
    @GetMapping("/{id}")
    public Object get(@PathVariable Integer id) {
        return userRepository.findByUserId(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TbMasterUser> put(@Valid @PathVariable Integer id, @RequestBody TbMasterUser tbMasterUser) {
        
        tbMasterUser.setUserId(id);
        // tbMasterUser.setUserName(tbMasterUser.getUserName());
        // tbMasterUser.setUserGenre(tbMasterUser.getUserGenre());
        // tbMasterUser.setUserBirthday(tbMasterUser.getUserBirthday());
        // tbMasterUser.setUserAddress(tbMasterUser.getUserAddress());
        // tbMasterUser.setUserEmail(tbMasterUser.getUserEmail());
        // tbMasterUser.setUserRoleId(tbMasterUser.getUserRoleId());
        return new ResponseEntity<>(userRepository.save(tbMasterUser), HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<TbMasterUser> post(@Valid @NotEmpty @RequestBody TbMasterUser tbMasterUser) {
        //try {
            TbMasterUser _tbMasterUser = userRepository.save(tbMasterUser);
            return new ResponseEntity<>(_tbMasterUser, HttpStatus.CREATED);
        //} catch (Exception e) {
        //    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        //}
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<TbMasterUser> delete(@PathVariable Integer id) {
        // try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        // } catch (Exception e) {
            // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        // }
    }
    
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Error message")
    public void handleError() {
    }
    
}
