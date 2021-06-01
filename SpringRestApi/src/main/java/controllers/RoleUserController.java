/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controllers;

import com.restapi.entities.TbMasterUserRole;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import repository.RoleRepository;

/**
 *
 * @author macbookpro
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/role")
public class RoleUserController {
   
   @Autowired()
   RoleRepository roleRepository;

//    @GetMapping("/")
//    public String index() {
//        return "Hello World";
//    }
    
    @GetMapping()
    public List<TbMasterUserRole> list() {
        return roleRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Object get(@PathVariable Integer id) {
        return roleRepository.findByRoleId(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TbMasterUserRole> put(@PathVariable Integer id, @RequestBody TbMasterUserRole tbMasterUserRole) {
        // List<TbMasterUserRole> _tbMasterUserRoleData = roleRepository.findByRoleId(id);
        // input.setRoleName(input.getRoleName());
        // List<TbMasterUserRole> _tbMasterUserRole = _tbMasterUserRoleData;
        // _tbMasterUserRole.add(0, tbMasterUserRole);
        // _tbMasterUserRole.setRoleName(tbMasterUserRole.getRoleName());
        // return new ResponseEntity<>(roleRepository.save(tbMasterUserRole), HttpStatus.OK);
        
        tbMasterUserRole.setRoleId(id);
        return new ResponseEntity<>(roleRepository.save(tbMasterUserRole), HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<TbMasterUserRole> post(@RequestBody TbMasterUserRole tbMasterUserRole) {
        // try {
            TbMasterUserRole _tbMasterUserRole = roleRepository.save(tbMasterUserRole);
            return new ResponseEntity<>(_tbMasterUserRole, HttpStatus.CREATED);
        // } catch (Exception e) {
            // return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        // }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<TbMasterUserRole> delete(@PathVariable Integer id) {
        // try {
            roleRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        // } catch (Exception e) {
            // return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        //}
    }
    
    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Error message")
    public void handleError() {
    }
    
}